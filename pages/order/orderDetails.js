// pages/order/orderDetails.js
var cisdom = require('../../utils/cisdom.js');
var dataUtils = require('../../utils/data.js');
var utils = require('../../utils/util.js');
var payUtils = require('../../utils/pay.js');

var isShowModal = false;
var order_code = '';

function getDetail(that) {

  cisdom.request("orderDetail", {
    order_code: order_code
  }, {
    success: function(e) {
      // 1.待接单 8.待致电 2待装货 10 待司机确认订单完成 3待货主确认收货 11.待司机确认结清 4待评价 5司机已评价 6货主已评价 7货主, 司机都以评价   9.已取消
      var name = ["订单详情", "待装货", "待结清", "待评价", "已评价", "待评价", "已评价", "待装货", "已取消", "运送中", "待结清", "待支付信息费", "订单详情"];
      wx.setNavigationBarTitle({
        title: name[e.data.status - 1],
      })
      e.data["carTypeName"] = dataUtils.getCarNameById(e.data.car_type);
      e.data['order_code'] = order_code;
      var payStatus = '';
      if (e.data.money == 0) {
        payStatus = '线下议价';
      } else {
        e.data.money = (parseFloat(e.data.money) + parseFloat(e.data.tip)).toFixed(2);
        if (e.data.category == '2') {
          payStatus = '已支付'
        } else {
          if (e.data.pay_type = '4' && e.data.is_pay == '0') {
            payStatus = '现金支付'
          } else {
            payStatus = '已支付'
          }
        }

      }

      e.data["payStatus"] = payStatus;

      var feeName = e.data.fee;
      if (e.data.status == 1) {
        feeName = "该订单需要司机缴纳部分信息费";
      } else if (e.data.status == 8 || e.data.fee == 0) {
        feeName = '未支付';
      } else {
        feeName = "￥" + e.data.fee;
      }
      e.data['feeName'] = feeName;


      var returnStatus = '';

      if (e.data.fee_apply == 0) { ////未申请0  司机申请1
        //能够申请
        returnStatus = '申请退费';
      } else {
        if (e.data.return_fee == 0) {
          returnStatus = '已申退';
        } else {
          returnStatus = '已退费';
        }
      }
      e.data['returnStatus'] = returnStatus;

      var bottomTitle = '';
      var bottomDesc = '';

      if (e.data.status == 8) {
        bottomTitle = '致电客户';
        bottomDesc = '请马上致电客户,确认服务'
      } else if (e.data.status == 2) {
        bottomTitle = '确认装货';
        bottomDesc = '装好货，出发前请按确认避免客户取消订单';
      } else if (e.data.status == 10) {

        bottomTitle = '确认订单完成';
        bottomDesc = '完成任务，请确认完成，好让客户放心';
      } else if (e.data.status == 3) {

        bottomTitle = '确认结清货款';
        bottomDesc = '货主已确认付款，如收到，请确认结清';
      } else if (e.data.status == 4) {

        bottomTitle = '评价';
        bottomDesc = '';
      } else if (e.data.status == 12) {

        bottomTitle = '支付信息费';
        bottomDesc = '支付前请与货主确定支付信息';
      } else if (e.data.status == 11) {

        bottomTitle = '确认结清货款';
        bottomDesc = '货主已确认付款,如收到,请确认结清';
      }

      e.data['bottomTitle'] = bottomTitle;
      e.data['bottomDesc'] = bottomDesc;



      that.setData({
        orderDetail: e.data
      });
    },
    fail: function(e) {

      if (e.code == '602') {
        wx.showToast({
          title: e.message,
          icon:'none'
        })
        setTimeout(function(){
          wx.navigateBack({
            delta: 1,
          })
        },1000)
        
      }

    }
  });
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetail: {},
    x: 10,
    showInfoFees: false,
    value: '',
    showPayMethod: false
  },

  onChange: function(e) {
    var that = this;
    if (e.detail.x < 180) {
      that.setData({
        x: 10
      })
    } else {
      that.setData({
        x: 180,

      })
      if (isShowModal) {
        return;
      }
      var orderDetail = that.data.orderDetail;
      isShowModal = true;
      wx.showModal({
        title: '提示',
        content: orderDetail.identity == 1 ? '该订单为一手货源,免收信息费' : '该订单为代理订单，需缴信息费',

        success: function(e) {
          console.log(e);
          console.log(isShowModal);
          if (e.confirm) {
            cisdom.request("orderTake", {
              order_code: order_code
            }, {
              success: function(e) {

                getDetail(that);
              },
              fail: function(e) {

              }
            });

          } else {
            that.setData({
              x: 10
            })
          }
          isShowModal = false;

        }
      })
    }

  },

  bottomClick: function(e) {
    var that = this;
    var status = this.data.orderDetail.status;
    if (status == 8) { //待致电

      cisdom.request("orderPhone", {
        order_code: order_code,
        identity: that.data.orderDetail.identity
      }, {
        success: function(e) {
          getDetail(that); //重新获取订单状态
          cisdom.request("getPhone", {
            order_code: order_code,
          }, {
            success(e) {
              wx.makePhoneCall({
                phoneNumber: e.data.con_mobile,
              });
            },
            fail(e) {}
          })

        },
        fail(e) {

        }
      })
    }
    if (status == 2) { //确认装货
      var category = this.data.orderDetail.category;
      cisdom.request("makeShip", {
        cargo_type: "0",
        order_code: order_code,
        category: category
      }, {
        success(e) {
          getDetail(that);
        },
        fail(e) {}
      })

    }
    if (status == 10) {
      var shipper_id = this.data.orderDetail.shipper_id;

      wx.showModal({
        title: '确定完成',
        content: '是否确认订单已完成',
        confirmText: "确认完成",
        cancelText: "返回",
        confirmColor: "#e67300",
        success(e) {

          if (e.confirm) {
            cisdom.request("orderComplete", {
              shipper_id: shipper_id,
              order_code: order_code,
            }, {
              success(e) {
                getDetail(that);
              },
              fail(e) {}
            });
          }
        }
      })
    }
    if (status == 3 || status == 11) {
      var orderDetail = this.data.orderDetail;
      var title = "是否确定已和用户结清所有费用";
      if (orderDetail.identity == 2 && orderDetail.fee_apply == 1) {
        if (orderDetail.return_fee != 1) {
          title = "您的信息费还未结清，是否确认结清货款？";
        }
      }
      wx.showModal({
        title: "提示",
        content: title,
        confirmColor: "#e67300",

        confirmText: "确认结清",
        cancelText: "返回",
        success(e) {
          if (e.confirm) {
            cisdom.request("moneyFinish", {
              order_code: order_code,
            }, {
              success(e) {
                getDetail(that);
              },
              fail(e) {}
            })

          }
        }
      })

    }
    if (status == 12) { //支付信息费
      this.setData({
        showInfoFees: true
      })
    }

  },
  //小费支付
  payfee_input: function(e) {
    console.log(e);
    var value = e.detail.value;
    this.setData({
      value: value
    })
  },
  //小费确认
  payfee_confirm: function(e) {
    // var value = this.data.value;


    this.setData({
      showPayMethod: true,
      showInfoFees: false

    })

  },
  //小费取消
  payfee_cancel: function(e) {
    this.setData({
      showInfoFees: false
    })
  },
  //关闭支付窗口
  closePayMethod: function(e) {
    this.setData({
      showPayMethod: false,
    })
  },
  //余额支付小费
  banlancePay: function(e) {
    var that = this;
    console.log(e);
    // money, orderCode, pwd, 

    var value = this.data.value;
    payUtils.payFeeByBalance(value, order_code, e.detail, {
      success: function(e) {
        that.setData({
          showPayMethod: false,
        });
        getDetail(that);
      },
      fail(e) {}
    });


  },
  //微信小费支付
  WxPay: function(e) {

  },

  //申请退费
  applyReturn: function(e) {
    var that = this;
    wx.showModal({
      title: '申请退费',
      content: '申请退信息费，请确认已和货主商议信息费退款事宜',

      success(e) {
        if (e.confirm) {
          cisdom.request("feeApply", {
            orderCode: order_code,
          }, {
            success(e) {
              getDetail(that);
            },
            fail(e) {}
          })

        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this;
    order_code = options.order_code;
    getDetail(that);

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
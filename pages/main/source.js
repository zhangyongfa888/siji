// pages/main/source.js
var cisdom = require('../../utils/cisdom.js');
var utils = require('../../utils/util.js');
var data = require('../../utils/data.js');
// params.put("send_code", send_code);
// params.put("take_code", take_code);
// params.put("category", category);
// params.put("car_type", car_type);
// params.put("bus_size", bus_size);
// params.put("cargo_type", cargo_type);
// params.put("pageSize", 10);
// params.put("page", index);
// params.put("type", 1);
var param = {
  send_code: "100",
  take_code: '100',
  category: "100",
  car_type: "100",
  bus_size: "100",
  cargo_type: "100",
}

function getData(that, type, page) {
  if (type == 0) { //标准货源
    param.type = 1;
    param.page = page;
    param.pageSize = 15;
    cisdom.request("orderShow", param, {
      success(e) {
        if (e.data.length == 0 && page != 1) {
          wx.showToast({
            title: '没有更多数据了',
            icon: 'none'
          })
          that.setData({
            page: page - 1
          })

        }
        var data1 = that.data.data_1;
        if (page == 1) {
          data1 = [];
        }

        for (var i = 0; i < e.data.length; i++) {
          var item = e.data[i];
          e.data[i]['toFixMoney'] = utils.toFix(item.money, item.tip);
          if (item.category == 2) {

            e.data[i]['content'] = data.getCarTitlesNameById(item.car_type) + " " + data.getLengthById(item.bus_size) + " " + data.getCarNameById(item.car_type) + "/" + item.cargo_weight + " " + item.cargo_type;
          } else {
            e.data[i]['content'] = data.getCarNameById(item.car_type)
          }
          e.data[i]['create_time_str'] = utils.getCreateTimeStr(item.create_time);
          data1.push(item);
        }

        that.setData({
          data_1: data1
        })

      },
      fail(e) {

      }
    });
  } else {
    cisdom.request("shortcutOrder", {
      start: "",
      end: "",
      page: page,
      pageSize: 15,
    }, {
      success: function(e) {

        if (e.data.length == 0 && page != 1) {
          wx.showToast({
            title: '没有更多数据了',
            icon: 'none'
          })
          that.setData({
            page: page - 1
          })
        }

        var data2 = that.data.data_2;
        if (page == 1) {
          data2 = [];
        }
        for (var i = 0; i < e.data.length; i++) {
          var item = e.data[i];
          e.data[i]['toFixMoney'] = "议价";
          e.data[i]['content'] = item.remark;
          e.data[i]['create_time_str'] = utils.getCreateTimeStr(utils.Date2mm(item.create_time));
          e.data[i]['send_city'] = item.start;
          e.data[i]['take_city'] = item.end;
          data2.push(item);
        }

        that.setData({
          data_2: data2
        })
      },
      fail: function(e) {}
    })

  }


}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: ["标准货源", "快捷货源"],
    data_1: [],
    data_2: [],
    height: 1000,
    checked: 0,
    page: 1
  },
  onItemChecked: function(e) {
    console.log(e)
    var that = this;
    var index = e.currentTarget.dataset.index;
    setTimeout(function() {
      that.setData({
        checked: index,
        page: 1,
      })
    }, 100);
    getData(that, index, 1);

  },
  onItemSelected: function(e) {
    var that = this;
    var index = e.detail.current

    console.log(e)
    setTimeout(function() {
      that.setData({
        checked: index,
        page: 1,
      })
    }, 100);

    getData(that, index, 1);
  },

  viewOrderDetail: function(e) {
    wx.navigateTo({
      url: '../order/orderDetails?order_code=' + e.detail,
    })
  },
  callphone: function(e) {
    var ordercode = e.detail;

    cisdom.request("getPhone", {
      order_code: ordercode
    }, {
      success: function(e) {
        wx.makePhoneCall({
          phoneNumber: e.data.con_mobile,
        })
      },
      fail: function(e) {
        //信息审核失败?606?
      }
    })
  },
  //搜索
  search: function(e) {
    var that = this;
    param = e.detail;
    that.setData({
      page: 1,
    })
    getData(that, that.data.checked, 1);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          page: 1,
          height: res.windowHeight
        });
      },
    })
    getData(that, 0, 1);
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
  onbottom: function(e) {
    console.log("加载更多", e);
    var index = this.data.checked;
    var page = this.data.page + 1;
    this.setData({
      page: page
    })

    getData(this, index, page);
  },
  ontop: function(e) {
    var index = this.data.checked;
    var page = 1;
    this.setData({
      page: page
    })

    getData(this, index, page);
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

    console.log("刷新");
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
// pages/main/order.js
var cisdom = require('../../utils/cisdom.js');
var dataUtils = require('../../utils/data.js');

function getData(that, type, page) {
  cisdom.request("orderList", {
    type: type + 1,
    pageSize: 15,
    page: page
  }, {
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
      var data2 = that.data.data_2;
      var data3 = that.data.data_3;
      if (page == 1) {
        data1 = [];
        data2 = [];
        data3 = [];
      }


      var name = ["订单详情", "待装货", "待结清", "待评价", "已评价", "待评价", "已评价", "待装货", "已取消", "运送中", "待结清", "待支付信息费","订单详情"];
      var data = e.data;
      for (var i = 0; i < data.length; i++) {
        var citys = data[i].city;

        var path = [];

        for (var j = 0; j < citys.length; j++) {
          var city = citys[j];
          path.push({
            lat: 0,
            lng: 0,
            city: city,
            address: ""
          })
        }
        data[i]["path"] = path;
        data[i]["carTypeName"] = dataUtils.getCarNameById(data[i].car_type);
        data[i]["statusName"] = name[data[i].status - 1];
        var money = (parseFloat(data[i].money) + parseFloat(data[i].tip));
        if (data[i].money == 0) {
          money = "议价";
          data[i].money = money
        } else {
          data[i].money = "￥" + money.toFixed(2);

        }
        if (type == 0) {
          data1.push(data[i])
        }
        if (type == 1) {
          data2.push(data[i])
        }
        if (type == 2) {
          data3.push(data[i])
        }

      }



      if (type == 0) {

        that.setData({
          data_1: data1
        })
      }
      if (type == 1) {
        that.setData({
          data_2: data2
        })
      }
      if (type == 2) {
        that.setData({
          data_3: data3
        })
      }

    },
    fail(e) {

    }
  });

}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: ["进行中", "已完成", "已取消"],
    data_1: [],
    data_2: [],
    data_3: [],
    height: 1000,
    checked: 0,
    page: 1,

  },
  onItemChecked: function(e) {
    console.log(e)
    var that = this;
    var index = e.currentTarget.dataset.index;
    setTimeout(function() {
      that.setData({
        checked: index
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
        checked: index
      })
    }, 100);

    getData(that, index, 1);
  },
  onbottom: function(e) {
    var that = this;
    var index = this.data.checked;
    var page = that.data.page + 1;
    this.setData({
      page: page
    })

    getData(that, index, page);


  },
  ontop: function(e) {
    var that = this;
    var index = this.data.checked;
    this.setData({
      page: 1
    })
    getData(that, index, 1);


  },
  toDetails: function(e) {
    var orderCode = e.currentTarget.dataset.order_code;
    wx.navigateTo({
      url: '../order/orderDetails?order_code=' + orderCode,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    wx.getSystemInfo({
      success: function(res) {
        that.setData({
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
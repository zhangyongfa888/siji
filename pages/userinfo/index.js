// pages/userinfo/index.js
var util = require("../../utils/util.js");
var cisdom = require("../../utils/cisdom.js");
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {},
    list: [{
      "pic": util.getResource("ic_userinfo_info.png"),
      "name": "个人信息"
    }, {
      "pic": util.getResource("ic_userinfo_car.png"),
      "name": "车辆信息"
    }, {
      "pic": util.getResource("ic_userinfo_pic.png"),
      "name": "照片信息"
    }]
  },
  chooseImg: function(e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function(res) {
        console.log(res);
        var tempFilePaths = res.tempFilePaths;
        cisdom.uploadFile(tempFilePaths[0], {
          type: "1"

        }, {
          success: function(e) {

            var userinfo = that.data.userinfo;
            userinfo.pic = tempFilePaths[0];
            that.setData({
              userinfo: userinfo

            });

          },
          fail: function(e) {}
        });




      },
    })


  },
  onItemClick: function(e) {
    console.log(e);
    var index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: index == 0 ? 'userinfo' : index == 1 ? 'carinfo' : 'authinfo',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this;
    var pic = app.globalData.userInfo.avatarUrl;
    wx.getStorage({
      key: 'info',
      success: function(res) {
        console.log(res);
        res.data['pic'] = res.data.pic == '' ? pic : res.data.pic;
        that.setData({
          userinfo: res.data
        });
      },
    })
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
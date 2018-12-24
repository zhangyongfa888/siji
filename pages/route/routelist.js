// pages/route/routelist.js
var cisdom = require("../../utils/cisdom.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    routeList: [],
    height: 1200
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
    cisdom.request("pathList", {}, {
      success(e) {
        that.setData({
          routeList: e.data
        });
      },
      fail(e) {

      }
    })



  },
  addroute(e) {
    wx.navigateTo({
      url: 'addroute',
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
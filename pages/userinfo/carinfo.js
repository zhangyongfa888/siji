// pages/userinfo/carinfo.js
var data=require("../../utils/data.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getStorage({
      key: 'info',
      success: function(res) {
        console.log(res);
        var userinfo = that.data.userinfo;
        //  // 车牌颜色;// 1.蓝牌 2.黄牌 3.绿牌 4.黄绿牌
        var color = data.getCarColor(res.data.color);
       
        var type = data.getCarNameById(res.data.type);
        var num = res.data.plate_number;

        userinfo.color = color;
        userinfo.type = type;
        userinfo.plate_number = num;
        that.setData({
          userinfo: userinfo
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
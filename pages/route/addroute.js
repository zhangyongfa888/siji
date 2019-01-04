// pages/route/addroute.js
var inputName = '';
var cisdom = require("../../utils/cisdom.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    send_name: "",
    take_name: "",

    send_adcode: "",
    take_adcode: "",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  chooseAddress: function(e) {
    console.log(e);
    wx.navigateTo({
      url: 'chooseAddress?type=' + e.detail,
    })

  },
  pathname(e) {
    console.log(e);
    inputName = e.detail.value;
  },
  addroute(e) {
    var send_name = this.data.send_name;
    var take_name = this.data.take_name;
    var send_adcode = this.data.send_adcode;
    var take_adcode = this.data.take_adcode;
    var name = inputName;
    cisdom.request("pathAdd", {
      "send_name": send_name,
      "take_name": take_name,
      "send_adcode": send_adcode,
      "take_adcode": take_adcode,
      "name": name,
    }, {
      success(e) {

        wx.showToast({
          title: '添加成功',
          icon: 'none'
        })

        setTimeout(function() {
          wx.navigateBack({
            
          })
        }, 1500)
      },
      fail(e) {}

    });



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
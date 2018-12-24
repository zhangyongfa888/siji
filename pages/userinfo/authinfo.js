// pages/userinfo/authinfo.js
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      "pic": utils.getResource('ic_register_jiashizheng.png'),
      "name": "驾驶证照片"
    }, {
      "pic": utils.getResource('ic_register_xingshizheng.png'),
      "name": "行驶证照片"
    }, {
      "pic": utils.getResource('ic_register_person_car.png'),
      "name": "人车合照照片"
    }]
  },
  onItemClick: function(e) {
    console.log(e);
    var index = e.currentTarget.dataset.index;
    var list = [];
    list.push(this.data.list[0].pic);

    list.push(this.data.list[1].pic);

    list.push(this.data.list[2].pic);
    wx.previewImage({
      urls: list,
      current: this.data.list[index].pic
    })
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

        var list = that.data.list;
        list[0].pic = res.data.image.driving_image;

        list[1].pic = res.data.image.identify_image;

        list[2].pic = res.data.image.person_car_image;


        that.setData({
          list: list
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
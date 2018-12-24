// pages/tools/actspread.js
var cisdom = require("../../utils/cisdom.js");
var name = '';
var phone = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHasInfo: false,
    isChecked: false,
    isShowAgreement: false,
    phone: ""
  },
  inputName(e) {
    console.log(e);
    name = e.detail.value;
  },
  inputPhone(e) {
    phone = e.detail.value;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this;
    cisdom.request("check", {}, {
      success(e) {
        phone = e.data.mobile
        that.setData({
          isHasInfo: e.data.is_agree == 1,
          isShowAgreement: e.data.is_agree != 1,
          phone: e.data.mobile
        })

      },
      fail(e) {},
    })

  },
  agree(e) {

    var checked = !this.data.isChecked;
    this.setData({
      isChecked: checked
    });

  },
  agreement(e) {

    this.setData({
      isShowAgreement: true
    });



  },
  cancel(e) {
    this.setData({
      isChecked: false,
      isShowAgreement: false

    });
  },
  bindconfirm(e) {
    this.setData({
      isChecked: true,
      isShowAgreement: false

    });


  },
  submitInfo(e) {
    var that = this;
    var checked = this.data.isChecked;
    if (!checked) {
      wx.showToast({
        icon: 'none',
        title: '请同意《货运宝车身贴合作协议》',
      })
      return;
    }
    if (name.length == 0) {
      wx.showToast({
        icon: 'none',
        title: '请输入姓名',
      })
      return;
    }

    if (phone.length == 0) {
      wx.showToast({
        icon: 'none',
        title: '请输入手机号',
      })
      return;
    }
    cisdom.request("exitName", {
      name: name
    }, {
      success(e) {
        that.setData({
          isHasInfo: true,
        })
      },
      fail(e) {}
    });


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
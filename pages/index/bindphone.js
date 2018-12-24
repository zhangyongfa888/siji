// pages/index/bindphone.js
var cisdom = require("../../utils/cisdom.js")
var util = require("../../utils/util.js")

var Interval;

function startCountDown(_this) {
  var time = 10;
  Interval = setInterval(function() {
    time--;
    if (time == 0) {
      var timeshow = "获取验证码"
      clearInterval(Interval)

    } else {
      var timeshow = time + "S"
    }
    _this.setData({
      count: timeshow
    });



  }, 1000)

}
Page({

  /**
   * 页面的初始数据
   */
  data: {

    count: '获取验证码',
    inputPhone: "",
    inputCode: "",
  },

  inputphone: function(e) {
    console.log(e);

    this.setData({
      inputPhone: e.detail.value
    });

  },
  inputcode: function(e) {
    this.setData({
      inputCode: e.detail.value
    });
  },
  getcode: function(e) {

    var that = this;
    if (!util.isMobile(this.data.inputPhone)) {
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none'
      })



      return;
    }
    if (this.data.count == '获取验证码') {
      this.setData({
        count: '30S', //A立即设置 防止连点
      })

      cisdom.request("vcode", {
        mobile: that.data.inputPhone,

      }, {
        success: function(e) {
          startCountDown(that);

        },
        fail: function(e) {
          this.setData({
            count: '获取验证码',
          })
        }

      })


    }






  },
  bind: function(e) {

    var openId = wx.getStorageSync("openid");
    var vode = this.data.inputCode;
    var mobile = this.data.inputPhone;

    cisdom.request("bandMobile", {
      openId: openId,
      registration_id: "",
      device: "3",
      vcode: vode,
      mobile: mobile,
    }, {
      success: function(e) {
        setTimeout(function(){
          wx.navigateBack({

          })
        },2000);
      
      },
      fail: function(e) {}


    });


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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    clearInterval(Interval)

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
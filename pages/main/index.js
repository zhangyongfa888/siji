// pages/main/index.js
var cisdom = require('../../utils/cisdom.js');
var app = getApp();

function getUserData(that, from) {


  if (!app.globalData.isAuth) {
    wx.navigateTo({
      url: '../index/authorize',
    })
  } else {
    var userinfo = app.globalData.userInfo;
    console.log(userinfo);
    var openId = wx.getStorageSync("openid") || "";
    //获取用户信息 然后登录货运宝
    var driver = wx.getStorageSync("driver") || false;
    if (driver == false) { //没有登录过
      cisdom.request("WeChatLogin", {
        openId: openId,
        registration_id: "",
        device: "3"

      }, {
        success: function(e) {
          console.log("bindlogin", e.data);

          wx.setStorage({
            key: 'driver',
            data: {
              "phone": e.data.mobile,
              'token': e.data.token,
              'id': e.data.user_id,
              'userid': e.data.user_id,
              'is_work': e.data.is_work,
              'is_password': e.data.is_password

            },
          })

        },
        fail: function(e) {
          console.log("fail", e);

          if (e.code == 606) { //绑定手机号
            wx.navigateTo({
              url: '../index/bindphone',
            })

          }



        }

      });



    }



  }




}
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {



  },
  route: function(e) {
    wx.navigateTo({
      url: '../route/routelist',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  shareToCircle: function(e) {

  },
  shareToWx: function(e) {},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

    // wx.setTabBarBadge({
    //   index: 2,
    //   text: '12',
    // })

    wx.showLoading({
      title: '加载中..',
      mask: true
    })

    setTimeout(function() {
      wx.hideLoading();
      var pages = getCurrentPages();

      getUserData(this, "");
    }, 1000);


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
    console.log("分享")

    let that = this;
    return {
      title: '来自货运宝司机端的邀请', // 转发后 所显示的title
      path: '/pages/main/main', // 相对的路径
      success: function(e) { // 成功后要做的事情
        console.log(e);

      },
      fail: function(e) {
        // 分享失败
        console.log(res)
      },
      complete: function(e) {
        console.log(e);
      }
    }
  }
})
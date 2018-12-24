//app.js
var cisdom = require("utils/cisdom.js");
App({
  onLaunch: function(ops) {
    console.log(ops);

    // 登录
    wx.login({
      success: res => {
        //{errMsg: "login:ok", code: "0714Qyqz0zg2he1xqPrz0BpJqz04Qyqw"}
        console.log("login", res);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // wx.request({
        //   url: 'http://118.31.74.225/phphyb2018/public/index.php/driverapi/wx/',
        // })
        cisdom.request("getOpenId", {
          code: res.code
        }, {
          success: function(e) {
            console.log(e);
            var openid = e.data.openid;
            wx.setStorageSync('openid', openid); //存储openid  

          }
        });

      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log("getSetting", res);
        if (res.authSetting['scope.userInfo']) {
          this.globalData.isAuth = true,
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo

                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
        }
      }
    })

    // setTimeout(function() {
    //   wx.hideLoading()
    // }, 3000)
  },
  globalData: {
    userInfo: null,
    isAuth: false
  }
})
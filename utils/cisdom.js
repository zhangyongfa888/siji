var CryptoJS = require('CryptoJS/rollups/aes.js');

function getAppkey() {
  var s = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  var random = "";
  for (var i = 0; i < 6; i++) {
    var num = Math.ceil(Math.random() * 62);
    random += s[num];

  }
  var deviceId = '000000000000';
  var sing = "cisdom2018@" + new Date().getTime() + "@" + random + "@" + deviceId + "@4.1.2";
  return Encrypt(sing);

}

//解密方法
function Decrypt(pwd) {
  console.log("解密前:" + pwd);
  var key = 'cisdom2018cisdom';
  var iv = 'cisdom2018cisdom';
  var original = CryptoJS.decrypt(pwd, key, iv);
  console.log("解密后:" + original);
  return original;
}
//加密方法
function Encrypt(word) {
  console.log("加密前:" + word);
  var key = 'cisdom2018cisdom';
  var iv = 'cisdom2018cisdom';
  var pwd = CryptoJS.encrypt(word, key, iv);
  return pwd;

}

function urlencode(str) {
  str = (str + '').toString();
  return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
  replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
}

function request(method, data, callback) {

  wx.showNavigationBarLoading();
  var driver = wx.getStorageSync('driver') || null;
  if (driver != null) {
    data.token = driver.token
    data.user_id = driver.userid
  }
  //data 加密
  data.sign = getAppkey();
  console.log('urlencode before',Encrypt(JSON.stringify(data)));
  var endata = urlencode(Encrypt(JSON.stringify(data)));
  console.log(getUrl(method) + ",加密前参数:", data, ",加密后:" + endata);
  wx.request({
    url: getUrl(method),
    method: 'post',
    data: 'data=' + (endata),
    header: {
      "Content-Type": "application/x-www-form-urlencoded"

    },
    success: function(e) {
      if (e.data.code == 200) {
       
        //data 解密;
        var success = {
          code: e.data.code,
          data: JSON.parse(Decrypt(e.data.data)),
          message: e.data.msg
        }
        console.log(method + ":success:", success);
        callback.success(success)


      } else {
        var error = {
          code: e.data.code,
          data: Decrypt(e.data.data),
          message: e.data.msg
        }
        console.log(method + ":error:", error);
        if (e.data.code == 602 || e.data.code == 608 || e.data.code == 606) {
          wx.showToast({
            title: e.data.msg,
            icon: 'none',

          })

        }
        callback.fail(error)
      }

    },
    fail: function(e) {
      var error = {
        code: e.data.code,
        message: e.data.msg
      }
      callback.fail(e)
    },
    complete: function(e) {
      console.log(method + ":complete:", e);
      wx.hideNavigationBarLoading();

      // callback.complete(e)
    }
  })


}



function getUrl(method) {
  return "http://118.31.74.225/phphyb2018/public/index.php/driverapi/" + method

}
module.exports = {
  request: request,
  getUrl: getUrl,
}
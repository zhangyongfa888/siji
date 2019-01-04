var cisdom = require('cisdom.js');
var CryptoJS = require('CryptoJS/rollups/aes.js');


function payByWx() {

}
//1 下单支付3 小费 4 累计支付 5小车）有价格，由现金转为微信支付
function payByBalance(money, orderCode, pwd, res) {
  pwd = CryptoJS.MD5(pwd).toString();
  var param = {
    "type": 4,
    "money": money,
    "orderCode": orderCode,
    "orderPwd": pwd
  }
  cisdom.request("pay", param, res);


}

function payFeeByBalance(money, orderCode, pwd, res) {
  pwd = CryptoJS.MD5(pwd).toString();
  var param = {
    "fee": money,
    "orderCode": orderCode,
    "deal_password": pwd
  }
  cisdom.request("payFee", param, res);

}

function payByRecharge() {

}

function whthdraw(money, orderpassword, res) {
  var pwd = CryptoJS.MD5(orderpassword).toString();

  cisdom.request("putForward", {
    money: money,
    orderpassword: pwd,
    deal_password:pwd
  }, res)
}

function payByAddTips(money, orderCode, pwd, res) {
  pwd = CryptoJS.MD5(pwd).toString();
  var param = {
    "type": 3,
    "money": money,
    "orderCode": orderCode,
    "orderPwd": pwd
  }
  cisdom.request("pay", param, res);


}

function payByAddOrder(money, orderCode, pwd, res) {
  pwd = CryptoJS.MD5(pwd).toString();

  var param = {
    "type": "1",
    "money": money,
    "orderCode": orderCode,
    "orderPwd": pwd
  }
  cisdom.request("pay", param, res);


}


function getBalance(res) {
  var param = {}
  cisdom.request("myWallet", param, {
    success: function(e) {
      res.getBalance(e.data.money);
      res.isSetPwd(e.data.is_password == 1 ? true : false);


    },
    fail: function(e) {
      res.getBalance(0);
      res.isSetPwd(false);
    }
  })

}

function getMoney(res) {
  var param = {}
  cisdom.request("myWallet", param, res)

}

function resetPwd(pwd, mobile, vcard, res) {
  var pwd = CryptoJS.MD5(pwd).toString();
  cisdom.request("resertPassword", {
    deal_password: pwd,
    mobile: mobile,
    vcard: vcard
  }, res)

}

function setPwd(pwd, res) {
  var pwd = CryptoJS.MD5(pwd).toString();
  cisdom.request("setPassword", {
    deal_password: pwd
  }, res)

}
module.exports = {
  payByWx: payByWx,
  payByBalance: payByBalance,
  payByAddTips: payByAddTips,
  payByAddOrder: payByAddOrder,
  getBalance: getBalance,
  getMoney: getMoney,
  payByRecharge: payByRecharge,
  whthdraw: whthdraw,
  setPwd: setPwd,
  resetPwd: resetPwd,
  payFeeByBalance: payFeeByBalance
}
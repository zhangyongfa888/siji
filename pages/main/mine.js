// pages/main/mine.js
var util = require("../../utils/util.js");
var cisdom = require("../../utils/cisdom.js");
var app = getApp();

function getData(that, from) {


  if (!app.globalData.isAuth) {
    wx.navigateTo({
      url: '../index/authorize',
    })
  } else {
    var userinfo = app.globalData.userInfo;
    console.log(userinfo);
    that.setData({
      head: userinfo.avatarUrl,
      name: userinfo.nickName,

    });

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
          that.setData({
            phone: e.data.mobile,
            head: e.data.pic,
            name: e.data.name,
          });
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
            }),
            getData(that, from);

        },
        fail: function(e) {
          console.log("fail", e);

          if (from == 'click') { //点击提示
            if (e.code == 606) { //绑定手机号

              wx.showModal({
                title: '提示',
                content: e.message,
                confirmText: "绑定",
                showCancel: false,
                success: function(res) {

                  wx.navigateTo({
                    url: '../index/bindphone',
                  })
                }
              })
            }

          }


        }

      });

    } else {

      cisdom.request("info", {}, {
        success: function(e) {
          wx.setStorageSync("info", e.data);
          var menu;
          that.data.menuData[0].num = e.data.path_count;
          that.data.menuData[2].num = e.data.money;
          menu = that.data.menuData;
          var head;
          head = e.data.pic == "" ? that.data.head : e.data.pic;
          // 0未认证 1审核中 2重新认证
          var status = e.data.status;
          if (status == 0) {
            status = '未认证'

          } else if (status == 1) {
            status = '审核中'

          } else if (status == 2) {
            status = '审核失败'

          } else if (status == 3) {
            status = '已认证'

          }
          that.setData({
            phone: e.data.mobile,
            menuData: menu,
            head: head,
            name: e.data.name,
            status: status

          });
        },
        fail: function(e) {}
      })


    }



  }




}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    head: util.defaultPic,
    name: "货运宝",
    phone: "未绑定手机号",
    status: "未认证",
    menuData: [{
        "num": "0",
        "name": "常用路线",
      },
      {
        "num": "0",
        "name": "收藏货主",
      }, {
        "num": "0.00",
        "name": "账户余额",
      }

    ],
    toolsData: [{
        "pic": util.getResource('ic_me_stander.png'),
        "name": "收费标准"

      },
      {
        "pic": util.getResource('ic_spread.png'),
        "name": "车贴推广"

      }, {
        "pic": util.getResource('ic_me_share.png'),
        "name": "我的分享"

      }, {
        "pic": util.getResource('ic_me_contact.png'),
        "name": "客服中心"

      },
      {
        "pic": util.getResource('ic_message.png'),
        "name": "我的消息"

      },
      {
        "pic": util.getResource('ic_me_setting.png'),
        "name": "更多设置"

      }
    ]

  },

  onItemClickMenu: function(e) {
    var index = e.currentTarget.dataset.index;
    if (index == 0) { //常用路线

      wx.navigateTo({
        url: '../route/routelist',
      })
    }
    if (index == 2) { //账户余额
      wx.navigateTo({
        url: '../wallet/wallet',
      })
    }

  },
  onItemClickTool: function(e) {
    var index = e.currentTarget.dataset.index;
    if (index == 0) {
      wx.navigateTo({
        url: '../tools/standar',
      })
    }
    if (index == 1) {
      wx.navigateTo({
        url: '../tools/actspread',
      })
    }
    if (index == 2) {


    }
    if (index == 3) {
      wx.navigateTo({
        url: '../tools/contact',
      })
    }
    if (index == 4) {
      wx.navigateTo({
        url: '../tools/message',
      })
    }
    if (index == 5) {
      wx.navigateTo({
        url: '../tools/setting',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {



  },
  //点击banner获取信息 0未认证 1审核中 2重新认证
  userinfo: function(e) {

    var info = wx.getStorageSync("info") || false;
    if (info.status == 0 || info.status == 2) {
      wx.navigateTo({
        url: '../index/register', //去认证信息

      })
    } else {
      wx.navigateTo({
        url: '../userinfo/index', //认证后的信息详情页

      })
    }


  },
  //点击昵称/电话 获取信息
  getInfo: function(e) {
    getData(this, 'click');
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
    getData(this, 'onshow');

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
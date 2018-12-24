// pages/index/register.js
var data = require("../../utils/data.js")

var utils = require("../../utils/util.js")
var cisdom = require("../../utils/cisdom.js")

function createParam(that) {

  var submitParam = {};
  var info = that.data.userinfo;
  submitParam.driving_image = info.image.driving_image;
  submitParam.identify_image = info.image.identify_image;
  submitParam.person_car_image = info.image.person_car_image;
  submitParam.name = info.name;
  submitParam.identify = info.identify;
  submitParam.plate_number = info.plate_number;
  submitParam.emergency = info.emergency;
  submitParam.emergency_mobile = info.emergency_mobile;
  submitParam.color = info.color;
  submitParam.type = info.type;
  submitParam.category = info.category;
  submitParam.length = info.length;
  submitParam.city = "";
  console.log(submitParam);

  cisdom.request("register", submitParam, {
    success(e) {
      wx.showToast({
        icon: "success",
        title: '提交成功！',
        duration: 2500,
        success() {
          setTimeout(function() {
            wx.navigateBack({})
          }, 2500);

        }
      })

    },
    fail(e) {

    }
  })

}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {},
    list: [{
      "pic": utils.getResource('ic_register_jiashizheng.png'),
      "name": "驾驶证照片"
    }, {
      "pic": utils.getResource('ic_register_xingshizheng.png'),
      "name": "行驶证照片"
    }, {
      "pic": utils.getResource('ic_register_person_car.png'),
      "name": "人车合照照片"
    }],
    step: 1,
    showColor: false,
  },

  //输入
  input(e) {
    console.log(e);
    var id = e.currentTarget.id;
    var value = e.detail.value;
    var userInfo = this.data.userinfo;
    userInfo[id] = value;

  },
  choose(e) {
    console.log(e);
    //显示选择车牌弹窗
    if (e.currentTarget.id == 'type') {
      wx.navigateTo({
        url: 'chooseType',
      })
    }
    if (e.currentTarget.id == 'color') {
      this.setData({
        showColor: true
      });
    }


  },

  //选择车牌颜色
  chooseColor: function(e) {
    console.log(e);
    var color = e.currentTarget.dataset.color;
    var colorName = data.getCarColor(color);
    var userInfo = this.data.userinfo;
    userInfo.colorName = colorName;
    this.setData({
      showColor: false,
      userinfo: userInfo
    });
  },

  next() {
    var step = this.data.step;
    if (step == 1) { //检查第一步数据

      if (!utils.isMobile(this.data.userinfo.emergency_mobile)) {
        wx.showToast({
          title: '紧急联系人手机号格式不正确',
          icon: 'none'
        })
        return;
      }

      step = 2; //到第二步
    } else if (step == 2) { //检查第2步数据
      step = 3; //到第3步
    } else if (step == 3) { //检查第3步数据
      createParam(this);
    }

    this.setData({
      step: step
    });
  },
  toStep(e) {
    console.log(e);

    var step = this.data.step;
    if (step == 1) { //检查第一步数据
      if (!utils.isMobile(this.data.userinfo.emergency_mobile)) {
        wx.showToast({
          title: '紧急联系人手机号格式不正确',
          icon: 'none'
        })
        return;
      }
    }
    if (step == 2) { //检查第2步数据

    }
    if (step == 3) { //检查第3步数据


    }

    var step = e.currentTarget.dataset.step;
    this.setData({
      step: step
    });

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var info = wx.getStorageSync("info") || {};

    var color = data.getCarColor(info.color);
    var type = data.getCarNameById(info.type);
    info.colorName = color;
    info.typeName = type;
    var list = this.data.list;
    list[0].pic = info.image.driving_image;

    list[1].pic = info.image.identify_image;

    list[2].pic = info.image.person_car_image;


    this.setData({
      userinfo: info,
      list: list
    });

  },
  onItemClick: function(e) {
    console.log(e);
    var index = e.currentTarget.dataset.index;
    wx.chooseImage({
      success: function(e) {
        console.log(e);

        return;

        wx.uploadFile({
          url: '',
          filePath: '',
          name: 'index',
        })
      }
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
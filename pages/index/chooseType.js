// pages/index/chooseType.js
var util = require('../../utils/util.js')
var data = require("../../utils/data.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    carlist: [

      {
        name: "小面包",
        length: "长*宽*高 1.8*1.3*1.1m",
        pic: util.getResource('ic_car_type_1.png'),
        id: 1
      },
      {
        name: "中面包",
        length: "长*宽*高 2.7*1.4*1.2m",
        pic: util.getResource('ic_car_type_2.png'),
        id: 2
      },
      {
        name: "小货车厢式",
        length: "长*宽*高 2.7*1.5*1.7m",
        pic: util.getResource('ic_car_type_16.png'),
        id: 16
      },
      {
        name: "中货车厢式",
        length: "长*宽*高 4.2*1.8*1.8m",
        pic: util.getResource('ic_car_type_17.png'),
        id: 17
      },
      {
        name: "小型货车",
        length: "长*宽*高 2.7*1.5*1.7m",
        pic: util.getResource('ic_car_type_3.png'),
        id: 3
      },
      {
        name: "中型货车",
        length: "长*宽*高 3.6*1.8*1.8m",
        pic: util.getResource('ic_car_type_4.png'),
        id: 4
      },
      {
        name: "大型货车",
        length: "长4.2米以上",
        pic: util.getResource('ic_car_type_5.png'),
        id: 5
      },

    ],
    carlength: data.getCarLengthData,
    cartype: data.getCarTypeData,
    showType: false,


  },
  cancel() {
    this.setData({
      showType: false
    })


  },
  chooseType: function(e) {
    console.log(e);
    var index = e.currentTarget.dataset.index;

    var data = this.data.cartype;
    for (var i = 0; i < data.length; i++) {
      data[i].isChecked = false;

    }
    data[index].isChecked = true;

    this.setData({
      cartype: data
    })

  },
  chooseLength: function(e) {
    console.log(e);
    var index = e.currentTarget.dataset.index;
    var data = this.data.carlength;
    for (var i = 0; i < data.length; i++) {
      data[i].isChecked = false;

    }
    data[index].isChecked = true;

    this.setData({
      carlength: data
    })
  },
  confirm: function(e) {

    var that = this;

    var checkedLengthId = '';
    for (var i = 0; i < that.data.carlength.length; i++) {
      if (that.data.carlength[i].isChecked) {
        checkedLengthId = that.data.carlength[i].id;
      }
    }

    if (checkedLengthId == '') {
      wx.showToast({
        title: '请选择车长',
        icon: 'none'
      })
      return;
    }



    var checkedTypeId = '';
    for (var i = 0; i < that.data.cartype.length; i++) {
      if (that.data.cartype[i].isChecked) {
        checkedTypeId = that.data.cartype[i].id;
      }
    }

    if (checkedTypeId == '') {
      wx.showToast({
        title: '请选择车型',
        icon: 'none'
      })
      return;
    }



    var pages = getCurrentPages();
    var lastPage = pages[pages.length - 2];
    var userinfo = lastPage.data.userinfo;


    userinfo.type = checkedTypeId;
    userinfo.typeName = data.getCarNameById(checkedTypeId);
    userinfo.length = checkedLengthId;
    userinfo.category = '2';

    console.log(userinfo);
    lastPage.setData({
      userinfo: userinfo
    });
    wx.navigateBack({

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


  },
  chooseListItem: function(e) {
    console.log(e);
    var id = e.currentTarget.dataset.id;
    if (id == 5) {
      //大车 弹出具体车长车型
      this.setData({
        showType: true
      })

    } else {
      // //小车 
      // model.setLength("0");
      // model.setCategory("1");
      // model.setType(String.valueOf(model.getId()));
      var pages = getCurrentPages();
      var lastPage = pages[pages.length - 2];
      var userinfo = lastPage.data.userinfo;
      userinfo.type = id;
      userinfo.typeName = data.getCarNameById(id);
      userinfo.length = 0;
      userinfo.category = '1';

      console.log(userinfo);
      lastPage.setData({
        userinfo: userinfo
      });
      wx.navigateBack({

      })

    }
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
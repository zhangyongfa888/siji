// pages/components/orderDetailPath.js
var utils = require('../../utils/util.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    path: Array
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

    direction: function(e) {
      console.log(e);
      var lng = e.currentTarget.dataset.lng;
      var lat = e.currentTarget.dataset.lat;

      var p = utils.bMapTransQQMap(lng, lat);
      wx.openLocation({
        latitude: parseFloat(p.lat),
        longitude: parseFloat(p.lng),
      })

    }
  }
})
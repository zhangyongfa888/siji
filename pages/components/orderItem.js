// pages/components/orderItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: Array
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

    call: function(e) {
      var orderCode = e.currentTarget.dataset.order_code;
      this.triggerEvent('call', orderCode);
    },
    getOrderDetail: function(e) {
      var orderCode = e.currentTarget.dataset.order_code;
      this.triggerEvent('viewOrderDetail', orderCode);
    }

  }
})
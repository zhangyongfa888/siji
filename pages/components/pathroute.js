// pages/components/pathroute.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    start: String,
    end: String,
    isDeleteModel: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    startAddress: {},
    endAddress: {},
    isDeleteModel: false

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //开始地址
    chooseStart(e) {
      this.triggerEvent('chooseAddress', "start")


    },
    //结束地址
    chooseEnd(e) {
      this.triggerEvent('chooseAddress', "end")

    },
    delete(e) {
      this.triggerEvent('delete')

    }

  }
})
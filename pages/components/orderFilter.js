// pages/components/orderFilter.js
var dataUtils = require("../../utils/data.js");
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: String
  },

  /**
   * 组件的初始数据
   */
  data: {

    send_code: "100",
    take_code: '100',
    category: "100",
    car_type: "100",
    bus_size: "100",
    cargo_type: "100",
    showChooseCity: false,
    showType: -1,
    showChooseSize: false,
    showInputCity: false,
    tabPosition: 0,
    citys: dataUtils.allcity,
    height: 1000,
    pindex: -1,
    cindex: -1,
    xindex: -1,
    star_name: "全国",
    end_name: "全国",

    carType: [{
      "car_type": "100",
      "name": "不限"
    }, {
      "car_type": "1",
      "name": "小面包"
    }, {
      "car_type": "2",
      "name": "中面包"
    }, {
      "car_type": "16",
      "name": "小货车厢式"
    }, {
      "car_type": "17",
      "name": "中货车厢式"
    }, {
      "car_type": "3",
      "name": "小型货车"
    }, {
      "car_type": "4",
      "name": "中型货车"
    }, {
      "car_type": "5",
      "name": "大型货车"
    }],
    tindex: 0, //车型大类

    carLength: dataUtils.getCarLengthData,
    carTruckType: dataUtils.getCarTypeData,
    goodType: dataUtils.goodsData

  },
  attached() {
    var that = this;
    var carLength = that.data.carLength;
    var carTruckType = that.data.carTruckType;
    var goodType = that.data.goodType;

    //添加第一个不限
    carLength.unshift({
      "id": "100",
      "length": "不限",
      "isChecked": true
    })
    carTruckType.unshift({
      "id": "100",
      "carTypeName": "不限",
      "isChecked": true
    })
    goodType.unshift({
      "id": 100,
      "cargo_type": "不限",
      "pid": 0,
      "isChecked": true
    })
    wx.getSystemInfo({
      success: function(res) {

        that.setData({
          height: res.windowHeight,
          carLength: carLength,
          carTruckType: carTruckType,
          goodType: goodType
        })

      },
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {

    chooseStartCity(e) {
      var isShow = !this.data.showChooseCity
      this.setData({
        showChooseCity: isShow,
        showChooseSize: false,
        showType: 0,
        pindex: -1,
        cindex: -1,
        xindex: -1,
        tabPosition: 0,

      })
    },
    chooseEndCity(e) {
      var isShow = !this.data.showChooseCity
      this.setData({
        showChooseCity: isShow,
        showChooseSize: false,
        showType: 1,
        pindex: -1,
        cindex: -1,
        xindex: -1,
        tabPosition: 0,
      })
    },
    //选择车长
    chooseSize(e) {
      var isShow = !this.data.showChooseSize

      this.setData({
        showChooseSize: isShow,
        showChooseCity: false,

      })
    },

    //点击省
    onTabProvince() {

      this.setData({
        tabPosition: 0
      });
    },
    //点击市
    onTabCity() {
      if (this.data.pindex == -1) {
        wx.showToast({
          title: '请选择省',
          icon: 'none'
        })
        return;
      }

      this.setData({
        tabPosition: 1
      });
    },
    onTabCounty() {
      if (this.data.pindex == -1) {
        wx.showToast({
          title: '请选择省',
          icon: 'none'
        })
        return;
      }
      if (this.data.cindex == -1) {
        wx.showToast({
          title: '请选择市',
          icon: 'none'
        })
        return;
      }
      this.setData({
        tabPosition: 2
      });
    },

    //选中省数据
    checkedProvince(e) {


      //查看市数据 size==1是直辖市 设置tab==2
      var size = this.data.citys[e.currentTarget.dataset.pindex].children.length;

      if (size == 0) {
        var item = this.data.citys[e.currentTarget.dataset.pindex];
        this.exeSearch(item.adcode, item.name);

      } else {
        this.setData({
          pindex: e.currentTarget.dataset.pindex,
          cindex: size == 1 ? 0 : -1,
          xindex: -1,
          tabPosition: size == 1 ? 2 : 1
        })
      }


    },
    //选中市数据
    checkedCity(e) {
      if (this.data.pindex == -1) {
        wx.showToast({
          title: '请选择省',
          icon: 'none'
        })
        return;
      }

      var size = this.data.citys[this.data.pindex].children[e.currentTarget.dataset.cindex].children.length;

      if (size == 0) { //没有子数据
        var item = this.data.citys[this.data.pindex].children[e.currentTarget.dataset.cindex];
        this.exeSearch(item.adcode, item.name)

      } else {
        this.setData({
          cindex: e.currentTarget.dataset.cindex,
          xindex: -1,
          tabPosition: 2
        })
      }


    },
    //选中县数据
    checkedCounty(e) {
      if (this.data.pindex == -1) {
        wx.showToast({
          title: '请选择省',
          icon: 'none'
        })
        return;
      }
      if (this.data.cindex == -1) {
        wx.showToast({
          title: '请选择市',
          icon: 'none'
        })
        return;
      }
      this.setData({
        xindex: e.currentTarget.dataset.xindex,


      })
      var pindex = this.data.pindex;
      var cindex = this.data.cindex;
      var xindex = this.data.xindex;
      var item = this.data.citys[pindex].children[cindex].children[xindex];
      //
      this.exeSearch(item.adcode, item.name);



    },

    //选择车型大类
    checkedCarType(e) {
      // send_code: "100",
      // take_code: '100',
      // category: "100",
      // car_type: "100",
      // bus_size: "100",
      // cargo_type: "100",
      console.log(e);
      var index = e.currentTarget.dataset.tindex;
      var carType = this.data.carType[index].car_type;
      var category = (carType == 5 ? "2" : carType == '100' ? "100" : "1");

      var bus_size = '100';
      var cargo_type = '100';

      //选择小车 把大车的数据重置、
      if (category != "2") {
        this.reset();
      }

      this.setData({
        tindex: index,
        car_type: carType,
        category: category,
        bus_size: bus_size,
        cargo_type: cargo_type,

      })



    },
    //选中车长
    checkedCarlength(e) {
      var index = e.currentTarget.dataset.lengthindex;
      var carLength = this.data.carLength;

      if (index == 0) { //选中不限
        for (var i in carLength) {
          if (i != 0) {
            carLength[i]['isChecked'] = false
          } else {
            carLength[0]['isChecked'] = true
          }

        }
        this.setData({
          carLength: carLength
        })
        return;

      }
      //不限
      carLength[0]['isChecked'] = false
      //遍历下选中的
      var checkedLength = carLength.filter(function(item) {
        return item.isChecked;
      });


      if (checkedLength.length > 4) {
        wx.showToast({
          title: '最多选择5个',
          icon: 'none'
        })
        return;
      }
      carLength[index]['isChecked'] = !carLength[index].isChecked;
      this.setData({
        carLength: carLength
      })
    },


    checkedCarTruckType(e) {
      var index = e.currentTarget.dataset.truckindex;
      var carTruckType = this.data.carTruckType;

      for (var i in carTruckType) {

        carTruckType[i]['isChecked'] = false

      }
      carTruckType[index]['isChecked'] = true

      this.setData({
        carTruckType: carTruckType
      })


    },
    checkedGoodsType(e) {


      var index = e.currentTarget.dataset.index;

      var goodType = this.data.goodType;

      for (var i in goodType) {

        goodType[i]['isChecked'] = false

      }
      goodType[index]['isChecked'] = true

      this.setData({
        goodType: goodType
      })


    },
    reset() {
      var carlength = this.data.carLength;
      for (var i in carlength) {
        carlength[i]['isChecked'] = false;

      }
      carlength[0]['isChecked'] = true;

      var checkedTruckType = this.data.carTruckType;

      for (var i in checkedTruckType) {
        checkedTruckType[i]['isChecked'] = false;

      }
      checkedTruckType[0]['isChecked'] = true;

      var goodType = this.data.goodType;


      for (var i in goodType) {
        goodType[i]['isChecked'] = false;

      }
      goodType[0]['isChecked'] = true;

      this.setData({
        tindex: 0,
        carLength: carlength,
        carTruckType: checkedTruckType,
        goodType: goodType
      })
    },
    //
    //确定搜索
    search() {


      var that = this;

      // 车长
      var checkedLength = this.data.carLength.filter(function(item) {
        return item.isChecked;
      });

      var ids = "";
      for (var i in checkedLength) {
        ids += checkedLength[i].id + ",";
      }
      ids = ids.substring(0, ids.length - 1);
      console.log('checkedLength', checkedLength);

      if (checkedLength) {

      }
      var bus_size = ids;

      //车型id
      var checkedTruckType = this.data.carTruckType.filter(function(item) {
        return item.isChecked;
      });
      //货物类型id
      var cargo_type = this.data.goodType.filter(function (item) {
        return item.isChecked;
      });
      
      var car_type = '100';
      var cargotype = '100';
      if (this.data.tindex != 7) {
        car_type = this.data.carType[this.data.tindex].car_type;
        cargotype = '100';
      } else {
        car_type = checkedTruckType[0].id;
        cargotype = cargo_type[0].id;
      }

  


      this.setData({
        showChooseSize: false,
        bus_size: bus_size,
        car_type: car_type,
        cargo_type: cargotype
      })

      this.triggerEvent("search", {
        send_code: that.data.send_code,
        take_code: that.data.take_code,
        category: that.data.category,
        car_type: that.data.car_type,
        bus_size: that.data.bus_size,
        cargo_type: that.data.cargo_type
      })
    },
    exeSearch(adcode, name) {

      if (name.length > 4) {
        name = name.substring(0, 4);
      }

      console.log("搜索" + adcode + "," + name);
      if (this.data.showType == 0) { //send

        this.setData({
          star_name:  name,
          send_code:  adcode,
          showChooseCity: false,
          pindex: -1,
          cindex: -1,
          xindex: -1,
          showType: -1,
          tabPosition: 0,
        })

      } else {
        this.setData({
          take_code: adcode,
          end_name:  name,

          showChooseCity: false,
          pindex: -1,
          cindex: -1,
          xindex: -1,
          showType: -1,
          tabPosition: 0,
        })
      }
      var that = this;
      this.triggerEvent("search", {
        send_code: that.data.send_code,
        take_code: that.data.take_code,
        category: that.data.category,
        car_type: that.data.car_type,
        bus_size: that.data.bus_size,
        cargo_type: that.data.cargo_type
      })

    }
  }
})
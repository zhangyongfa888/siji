var bmap = require('bmap-wx.min.js')

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function getCreateTimeStr(value) {

  if (value == 0) {
    return "刚刚";
  }

  var nowDate = new Date();
  var mins = parseInt((nowDate.getTime() - value * 1000) / (60 * 1000));
  var hons = parseInt((nowDate.getTime() - value * 1000) / (60 * 1000 * 60));
  var days = parseInt((nowDate.getTime() - value * 1000) / (60 * 1000 * 60 * 24));
    // Log.i("", mins + "***" + hons + "***" + days);
    if (mins < 60) {
      if (mins == 0) {
        return "刚刚 ";
      }
      return (mins) + "分钟前";
    } else if (mins >= 60 && hons < 24) {
      return hons + "小时前";
    } else if (days >= 1) {
      if (days > 3) {
        var date = new Date(value * 1000);
        const month = date.getMonth() + 1
        const day = date.getDate()
        return month + "-" + day;
      } else {
        return days + "天前";
      }
    }
    return "";


  }
  const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
  }

  function Date2mm(value) {

    var dt = new Date(value);
    return dt.getTime() / 1000;
  }

  function toFix(value1, value2) {

    if (value1 == 0) {
      return "议价";
    }
    var value = parseFloat(value1) + parseFloat(value2)

    return "运费:" + value.toFixed(2) //此处2为保留两位小数
  }



  function isMobile(str) {
    console.log('isMobile', str);
    var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (!myreg.test(str)) {
      return false;
    } else {
      return true;
    }

  }

  function isIdentify(str) {


  }

  function bMapTransQQMap(lng, lat) {
    let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
    let x = lng - 0.0065;
    let y = lat - 0.006;
    let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
    let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
    let lngs = z * Math.cos(theta);
    let lats = z * Math.sin(theta);
    return {
      lng: lngs,
      lat: lats

    }


  }

  function qqMapTransBMap(lng, lat) {
    let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
    let x = lng;
    let y = lat;
    let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
    let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
    let lngs = z * Math.cos(theta) + 0.0065;
    let lats = z * Math.sin(theta) + 0.006;
    return {
      lng: lngs,
      lat: lats
    }
  }

  function getAddress(tlat, tlng, result) {

    var res = qqMapTransBMap(tlng, tlat);


    var BMap = new bmap.BMapWX({
      ak: 'ErtyRVZh9sjNg4zqr1muxgfhsiAiMyb3'
    });

    //获取开始城市的adcode
    BMap.regeocoding(res.lat, res.lng, result);
  }

  var getPicUrl = 'http://res.zhangyongfa888.site/';

  function getResource(name) {
    return getPicUrl + name
  }
  var defaultPic = 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=95bb5fe82d3fb80e0cd166d10eea4813/b8014a90f603738d3d255ffbbf1bb051f919ecf8.jpg';
  module.exports = {
    formatTime: formatTime,
    defaultPic: defaultPic,
    isMobile: isMobile,
    getResource: getResource,
    bMapTransQQMap: bMapTransQQMap,
    qqMapTransBMap: qqMapTransBMap,
    getAddress: getAddress,
    isIdentify: isIdentify,
    toFix: toFix,
    getCreateTimeStr: getCreateTimeStr,
    Date2mm: Date2mm


  }
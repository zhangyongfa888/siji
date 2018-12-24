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

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
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
function isIdentify(str){


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

function getAddress(tlat, tlng,result) {

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
  isIdentify: isIdentify


}
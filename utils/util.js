let md5 = require('md5.js')
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
let app_id = '2111343989'//自己的appid
let app_key = 'siMUule8UF2EOK6E';//自己的appkey
//对参数进行排序MD5计算
let _genRequestSign = (params) => {
  // 1. 对请求参数按字典升序排序
  params = _sortObject(params)
  // 2. 拼接键值对，value部分进行URL编码
  let paramStr = ''
  let keys = Object.keys(params)
  for (let idx in keys) {
    let key = keys[idx]
    paramStr += key + '=' + encodeURIComponent(params[key]) + '&'
  }
  // 3. 拼接key
  paramStr += 'app_key=' + app_key
  // 4. md5
  return md5.hexMD5(paramStr).toUpperCase()
}
//对KEY进行排序
let _sortObject = (obj) => {
  var keys = Object.keys(obj).sort()
  var newObj = {}
  for (var i = 0; i < keys.length; i++) {
    newObj[keys[i]] = obj[keys[i]]
  }
  return newObj
}

const ajax = (type, url, params, callback) => {
  wx.showLoading({
    title: '处理中...',
    mask: true
  })
  wx.request({
    url: url,
    data: params,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: type,
    success: function (res) {
      callback.success(res.data)
    },
    fail: function (res) {
      if (callback.fail)
        callback.fail()
    }
  })
}
const getAjax = (url, params, callback)=> {
  ajax('GET', url, params, callback)
}
const postAjax = (url, params, callback) => {
  ajax('POST', url, params, callback)
}
const filterImgae = ['原图', '岩井', '粉嫩', '错觉', '暖阳', '浪漫', '蔷薇', '睡莲', '糖果玫瑰', '新叶', '尤加利', '墨', '玫瑰初雪', '樱桃布丁', '白茶', '甜薄荷', '樱红', '圣代', '莫斯科', '冲绳', '粉碧', '地中海', '佛罗伦萨', '札幌', '栀子', '东京', '昭和', '自然', '清逸', '染', '甜美',];
const beautyImage = ['原图','芭比粉', '清透', '烟灰', '自然', '樱花粉', '原宿红', '闪亮', '粉紫', '粉嫩', '自然', '清透', '大地色', '自然', '清透', '桃粉', '橘粉', '春夏', '秋冬', '经典复古', '性感混血', '炫彩明眸', '紫色魅惑', ];
const changeImage = ['原图','埃及妆', '巴西土著妆', '灰姑娘妆', '恶魔妆', '武媚娘妆', '星光薰衣草', '花千骨', '僵尸妆', '爱国妆', '小胡子妆', '美羊羊妆', '火影鸣人妆', '刀马旦妆', '泡泡妆', '桃花妆', '女皇妆', '权志龙', '撩妹妆', '印第安妆', '印度妆', '萌兔妆', '大圣妆'];
const purikuraImage = ['原图', 'NewDay', '欢乐球吃球1', 'Bonvoyage', 'Enjoy', 'ChickenSpring', 'ChristmasShow', 'ChristmasSnow', 'CircleCat', 'CircleMouse', 'CirclePig', 'Comicmn', 'CuteBaby', 'Envolope', 'Fairytale', 'GoodNight', 'HalloweenNight', 'LovelyDay', 'Newyear2017', 'PinkSunny', 'KIRAKIRA', '欢乐球吃球2', 'SnowWhite', 'SuperStar', 'WonderfulWork', 'Cold', '狼人杀守卫', '狼人杀猎人', '狼人杀预言家', '狼人杀村民', '狼人杀女巫', '狼人杀狼人'];
module.exports = {
  formatTime: formatTime,
  _genRequestSign: _genRequestSign,
  app_id: app_id,
  getAjax: getAjax,
  postAjax: postAjax,
  filterImgae: filterImgae,
  beautyImage: beautyImage,
  changeImage: changeImage,
  purikuraImage: purikuraImage,
}

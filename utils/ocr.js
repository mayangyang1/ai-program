const utils = require('./util.js');
let identityUrl = 'https://api.ai.qq.com/fcgi-bin/ocr/ocr_idcardocr'; //身份证
let driverUrl = 'https://api.ai.qq.com/fcgi-bin/ocr/ocr_driverlicenseocr'; //驾驶证/行驶证
let bankCardUrl = 'https://api.ai.qq.com/fcgi-bin/ocr/ocr_creditcardocr'; //银行卡
let carCardUrl = 'https://api.ai.qq.com/fcgi-bin/ocr/ocr_plateocr'; //车牌号识别
let personCardUrl = 'https://api.ai.qq.com/fcgi-bin/ocr/ocr_bcocr'; //名片识别
/** ------------------------------------------身份证检测接口 start ------------------------------------------- */
let identityRequest = (base64Img, callback) => {
  //拼接鉴权必须的参数
  let params = {
    app_id: utils.app_id,
    image: base64Img,
    nonce_str: Math.random().toString(36).substr(2),
    time_stamp: parseInt(new Date().getTime() / 1000).toString(),
    card_type: 0
  }
  params['sign'] = utils._genRequestSign(params)
  //发送接口请求
  wx.showLoading({
    title: '处理中...',
    mask:true
  })
  wx.request({
    url: identityUrl,
    data: params,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    success: function (res) {
      callback.success(res.data)
    },
    fail: function (res) {
      if (callback.fail)
        callback.fail()
    }
  })
}
/** ------------------------------------------身份证检测接口 end ------------------------------------------- */
/** ------------------------------------------驾驶证/身份证检测接口 start ------------------------------------------- */
let driverRequest = (base64Img, type, callback) => {//type 0 驾驶证 1 行驶证
  //拼接鉴权必须的参数
  let params = {
    app_id: utils.app_id,
    image: base64Img,
    nonce_str: Math.random().toString(36).substr(2),
    time_stamp: parseInt(new Date().getTime() / 1000).toString(),
    type: type
  }
  params['sign'] = utils._genRequestSign(params)
  //发送接口请求
  wx.showLoading({
    title: '处理中...',
    mask: true
  })
  wx.request({
    url: driverUrl,
    data: params,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    success: function (res) {
      callback.success(res.data)
    },
    fail: function (res) {
      if (callback.fail)
        callback.fail()
    }
  })
}
/** ------------------------------------------驾驶证/身份证检测接口 start ------------------------------------------- */

/** ------------------------------------------银行卡检测接口 start ------------------------------------------------- */
let bankCardRequest = (base64Img, callback) => {
  //拼接鉴权必须的参数
  let params = {
    app_id: utils.app_id,
    image: base64Img,
    nonce_str: Math.random().toString(36).substr(2),
    time_stamp: parseInt(new Date().getTime() / 1000).toString(),
  }
  params['sign'] = utils._genRequestSign(params)
  //发送接口请求
  wx.showLoading({
    title: '处理中...',
    mask: true
  })
  wx.request({
    url: bankCardUrl,
    data: params,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    success: function (res) {
      callback.success(res.data)
    },
    fail: function (res) {
      if (callback.fail)
        callback.fail()
    }
  })
}
/** ------------------------------------------银行卡检测接口 end --------------------------------------------------- */
/** ------------------------------------------车牌号识别接口 start --------------------------------------------------- */
let carCardRequest = (base64Img, callback) => {
  //拼接鉴权必须的参数
  let params = {
    app_id: utils.app_id,
    image: base64Img,
    nonce_str: Math.random().toString(36).substr(2),
    time_stamp: parseInt(new Date().getTime() / 1000).toString(),
  }
  params['sign'] = utils._genRequestSign(params)
  //发送接口请求
  wx.showLoading({
    title: '处理中...',
    mask: true
  })
  wx.request({
    url: carCardUrl,
    data: params,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    success: function (res) {
      callback.success(res.data)
    },
    fail: function (res) {
      if (callback.fail)
        callback.fail()
    }
  })
}
/** ------------------------------------------车牌号识别接口 end ----------------------------------------------------- */
/** ------------------------------------------名片检测接口 start ----------------------------------------------------- */
let personCardRequest = (base64Img, callback) => {
  //拼接鉴权必须的参数
  let params = {
    app_id: utils.app_id,
    image: base64Img,
    nonce_str: Math.random().toString(36).substr(2),
    time_stamp: parseInt(new Date().getTime() / 1000).toString(),
  }
  params['sign'] = utils._genRequestSign(params)
  //发送接口请求
  wx.showLoading({
    title: '处理中...',
    mask: true
  })
  wx.request({
    url: personCardUrl,
    data: params,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    success: function (res) {
      callback.success(res.data)
    },
    fail: function (res) {
      if (callback.fail)
        callback.fail()
    }
  })
}
/** ------------------------------------------名片检测接口 end -------------------------------------------------------- */




//暴露出去的接口
module.exports = {
  identityRequest: identityRequest,
  driverRequest: driverRequest,
  bankCardRequest: bankCardRequest,
  carCardRequest: carCardRequest,
  personCardRequest: personCardRequest,
  
}
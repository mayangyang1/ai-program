const utils = require('./util.js');
let identityUrl = 'https://api.ai.qq.com/fcgi-bin/ocr/ocr_idcardocr'; //身份证
let driverUrl = 'https://api.ai.qq.com/fcgi-bin/ocr/ocr_driverlicenseocr'; //驾驶证/行驶证
let bankCardUrl = 'https://api.ai.qq.com/fcgi-bin/ocr/ocr_creditcardocr'; //银行卡
let carCardUrl = 'https://api.ai.qq.com/fcgi-bin/ocr/ocr_plateocr'; //车牌号识别
let personCardUrl = 'https://api.ai.qq.com/fcgi-bin/ocr/ocr_bcocr'; //名片识别
let writeUrl = 'https://api.ai.qq.com/fcgi-bin/ocr/ocr_handwritingocr'; //手写体识别
let generalUrl = 'https://api.ai.qq.com/fcgi-bin/ocr/ocr_generalocr'; //通用
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
  utils.postAjax(identityUrl, params, callback);
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
  utils.postAjax(driverUrl, params, callback);
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
  utils.postAjax(bankCardUrl, params, callback);
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
  utils.postAjax(carCardUrl, params, callback);
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
   utils.postAjax(personCardUrl, params, callback);
}
/** ------------------------------------------名片检测接口 end -------------------------------------------------------- */
/** ------------------------------------------手写体检测接口 start ----------------------------------------------------- */
let writeRequest = (base64Img, callback) => {
  //拼接鉴权必须的参数
  let params = {
    app_id: utils.app_id,
    image: base64Img,
    nonce_str: Math.random().toString(36).substr(2),
    time_stamp: parseInt(new Date().getTime() / 1000).toString(),
  }
  params['sign'] = utils._genRequestSign(params)
  //发送接口请求
  utils.postAjax(writeUrl, params, callback);
}
/** ------------------------------------------手写体检测接口 end -------------------------------------------------------- */
/** ------------------------------------------通用检测接口 start ----------------------------------------------------- */
let generalRequest = (base64Img, callback) => {
  //拼接鉴权必须的参数
  let params = {
    app_id: utils.app_id,
    image: base64Img,
    nonce_str: Math.random().toString(36).substr(2),
    time_stamp: parseInt(new Date().getTime() / 1000).toString(),
  }
  params['sign'] = utils._genRequestSign(params)
  //发送接口请求
  utils.postAjax(generalUrl, params, callback);
}
/** ------------------------------------------通用检测接口 end -------------------------------------------------------- */




//暴露出去的接口
module.exports = {
  identityRequest: identityRequest,
  driverRequest: driverRequest,
  bankCardRequest: bankCardRequest,
  carCardRequest: carCardRequest,
  personCardRequest: personCardRequest,
  writeRequest: writeRequest,
  generalRequest: generalRequest,
  
}
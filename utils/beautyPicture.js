const utils = require('./util.js');
let filterSetUrl = 'https://api.ai.qq.com/fcgi-bin/ptu/ptu_imgfilter'; //一键人物滤镜
let sceneryFilterSetUrl = 'https://api.ai.qq.com/fcgi-bin/vision/vision_imgfilter'; //一键风景滤镜
let faceSetUrl = 'https://api.ai.qq.com/fcgi-bin/ptu/ptu_facecosmetic'; //一键美妆
let changeSetUrl = 'https://api.ai.qq.com/fcgi-bin/ptu/ptu_facedecoration'; //一键变装
let facesTickerUrl = 'https://api.ai.qq.com/fcgi-bin/ptu/ptu_facesticker'; //大头贴
let faceAgeUrl = 'https://api.ai.qq.com/fcgi-bin/ptu/ptu_faceage'; //颜龄检测
/** ------------------------------------------滤镜接口 start ------------------------------------------------------- */
let filterRequest = (base64Img, filter = 1, type, callback) => {
  //拼接鉴权必须的参数
  let params = {
    app_id: utils.app_id,
    image: base64Img,
    nonce_str: Math.random().toString(36).substr(2),
    time_stamp: parseInt(new Date().getTime() / 1000).toString(),
    filter: filter //美妆编码1-23
  }
  params['sign'] = utils._genRequestSign(params)
  if(type === 0) {
    var url = filterSetUrl;
  }else {
    var url = sceneryFilterSetUrl;
  }
  utils.postAjax(url, params, callback);
}
/** ------------------------------------------滤镜接口 end --------------------------------------------------------- */
/** ------------------------------------------人脸美妆接口 start ------------------------------------------------------- */
let faceSetRequest = (base64Img, cosmetic = 1, callback) => {
  //拼接鉴权必须的参数
  let params = {
    app_id: utils.app_id,
    image: base64Img,
    nonce_str: Math.random().toString(36).substr(2),
    time_stamp: parseInt(new Date().getTime() / 1000).toString(),
    cosmetic: cosmetic //美妆编码1-23
  }
  params['sign'] = utils._genRequestSign(params)

  utils.postAjax(faceSetUrl, params, callback);
}
/** ------------------------------------------人脸美妆接口 end --------------------------------------------------------- */
/** ------------------------------------------人脸变装接口 start ------------------------------------------------------- */
let changeFaceSetRequest = (base64Img, decoration = 1, callback) => {
  //拼接鉴权必须的参数
  let params = {
    app_id: utils.app_id,
    image: base64Img,
    nonce_str: Math.random().toString(36).substr(2),
    time_stamp: parseInt(new Date().getTime() / 1000).toString(),
    decoration: decoration //变装编码1-23
  }
  params['sign'] = utils._genRequestSign(params)

  utils.postAjax(changeSetUrl, params, callback);
}
/** ------------------------------------------人脸变装接口 end --------------------------------------------------------- */
/** ------------------------------------------大头贴接口 start ------------------------------------------------------- */
let facesTickerRequest = (base64Img, sticker = 1, callback) => {
  //拼接鉴权必须的参数
  let params = {
    app_id: utils.app_id,
    image: base64Img,
    nonce_str: Math.random().toString(36).substr(2),
    time_stamp: parseInt(new Date().getTime() / 1000).toString(),
    sticker: sticker //大头贴编码1-23
  }
  params['sign'] = utils._genRequestSign(params)

  utils.postAjax(facesTickerUrl, params, callback);
}
/** ------------------------------------------大头贴接口 end --------------------------------------------------------- */
/** ------------------------------------------颜龄检测 start ------------------------------------------------------- */
let facesAgeRequest = (base64Img, callback) => {
  //拼接鉴权必须的参数
  let params = {
    app_id: utils.app_id,
    image: base64Img,
    nonce_str: Math.random().toString(36).substr(2),
    time_stamp: parseInt(new Date().getTime() / 1000).toString(),
  }
  params['sign'] = utils._genRequestSign(params)

  utils.postAjax(faceAgeUrl, params, callback);
}
/** ------------------------------------------颜龄检测 end --------------------------------------------------------- */
module.exports = {
  faceSetRequest: faceSetRequest,
  filterRequest: filterRequest,
  changeFaceSetRequest: changeFaceSetRequest,
  facesTickerRequest: facesTickerRequest,
  facesAgeRequest: facesAgeRequest,

}
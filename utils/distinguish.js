const utils = require('./util.js');
let seeImageUrl = 'https://api.ai.qq.com/fcgi-bin/vision/vision_imgtotext'; //看图识别
let foodImageUrl = 'https://api.ai.qq.com/fcgi-bin/image/image_food'; //美食识别
let sceneImageUrl = 'https://api.ai.qq.com/fcgi-bin/vision/vision_scener'; //场景识别
let objectImageUrl = 'https://api.ai.qq.com/fcgi-bin/vision/vision_scener'; //物体识别
/** ------------------------------------------图片识别接口 start ------------------------------------------------------- */
let seeImageRequest = (base64Img, callback) => {
    //拼接鉴权必须的参数
    let params = {
        app_id: utils.app_id,
        image: base64Img,
        nonce_str: Math.random().toString(36).substr(2),
        time_stamp: parseInt(new Date().getTime() / 1000).toString(),
        session_id: '1509333186' //请求id
    }
    params['sign'] = utils._genRequestSign(params)
    utils.postAjax(seeImageUrl, params, callback);
}
/** ------------------------------------------图片识别接口 end ------------------------------------------------------- */
/** ------------------------------------------美食识别接口 start ------------------------------------------------------- */
let foodImageRequest = (base64Img, callback) => {
    //拼接鉴权必须的参数
    let params = {
        app_id: utils.app_id,
        image: base64Img,
        nonce_str: Math.random().toString(36).substr(2),
        time_stamp: parseInt(new Date().getTime() / 1000).toString(),
    }
    params['sign'] = utils._genRequestSign(params)
    utils.postAjax(foodImageUrl, params, callback);
}
/** ------------------------------------------美食识别接口 end ------------------------------------------------------- */
/** ------------------------------------------场景识别接口 start ------------------------------------------------------- */
let sceneImageRequest = (base64Img, callback) => {
    //拼接鉴权必须的参数
    let params = {
        app_id: utils.app_id,
        image: base64Img,
        nonce_str: Math.random().toString(36).substr(2),
        time_stamp: parseInt(new Date().getTime() / 1000).toString(),
        format: 1, //请求id
        topk: 1
    }
    params['sign'] = utils._genRequestSign(params)
    utils.postAjax(sceneImageUrl, params, callback);
}
/** ------------------------------------------场景识别接口 end ------------------------------------------------------- */
/** ------------------------------------------物体识别接口 start ------------------------------------------------------- */
let objectImageRequest = (base64Img, callback) => {
    //拼接鉴权必须的参数
    let params = {
        app_id: utils.app_id,
        image: base64Img,
        nonce_str: Math.random().toString(36).substr(2),
        time_stamp: parseInt(new Date().getTime() / 1000).toString(),
        format: 1 ,//请求id
        topk: 1
        
    }
    params['sign'] = utils._genRequestSign(params)
    utils.postAjax(objectImageUrl, params, callback);
}
/** ------------------------------------------物体识别接口 end ------------------------------------------------------- */

module.exports = {
    seeImageRequest: seeImageRequest,
    foodImageRequest: foodImageRequest,
    sceneImageRequest: sceneImageRequest,
    objectImageRequest: objectImageRequest,
}
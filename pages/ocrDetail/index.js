// pages/ocrDetail/index.js
const api = require('../../utils/ocr.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: '/images/default.png',
    type: 0,
    messageList: [],
  },
  bindtaps() {
    const that = this;
    let timeStamp = parseInt((new Date().getTime() / 1000));
    wx.chooseImage({
      count: 1, // 默认9
      //sizeType: ['original', 'compressed'],
      sizeType: ["compressed"],
      sourceType: ["album", "camera"],
      success: function (res) {
        var fs = wx.getFileSystemManager();
        fs.readFile({
          filePath: res.tempFilePaths[0].toString(),
          encoding: 'base64',
          success(response) {
            //获取到图片的base64 进行请求接口
            switch (that.data.type) {
              case 0:
                that.identtityAi(response.data, that);
                break;
              case 1:
                that.dirverAi(response.data, 1, that);
                break;
              case 2:
                that.bankCardAi(response.data, that);
                break;
              case 3:
                that.carCardAi(response.data, that);
                break;
              case 4:
                that.personCardAi(response.data, that);
                break;
              case 5:
                that.dirverAi(response.data, 0, that);
                break;
              case 6:
               
                break;
            }
            
          }
        })
      }
    });
  },
  /***************************************身份证识别 start******************************************** */
  identtityAi(base64Image, that) {//身份证识别
    api.identityRequest(base64Image, {
      success(result) {
        var code = result.ret;
        if (code == 0) {
          wx.hideLoading();
          let messageList = [
            { key: '地址', value: result.data.address },
            { key: '生日', value: result.data.birth },
            { key: '用户名', value: result.data.name },
            { key: '民族', value: result.data.nation },
            { key: '性别', value: result.data.sex }
          ]
          that.setData({
            img: 'data:image/png;base64,' + result.data.frontimage,
            messageList: messageList
          })
        } else {
          wx.hideLoading();
          wx.showModal({
            title: '错误提示',
            content: result.msg,
            showCancel: false
          })
        }
      }
    })
  },
  /***************************************身份证识别 end ******************************************** */
  /***************************************驾驶证/行驶证识别 start **************************************** */
  dirverAi(base64Image, type, that) {
    api.driverRequest(base64Image, type, {
      success(result) {
        var code = result.ret;
        if (code == 0) {
          wx.hideLoading();
          let itemList = result.data.item_list;
          let messageList = [];
          itemList.forEach((_item) => {
            let obj ={};
            obj.key = _item.item;
            obj.value = _item.itemstring;
            messageList.push(obj);
          })

          that.setData({
            img: 'data:image/png;base64,' + base64Image,
            messageList: messageList
          })
        } else {
          wx.hideLoading();
          wx.showModal({
            title: '错误提示',
            content: result.msg,
            showCancel: false
          })
        }
      }
    })
  }, 
  /***************************************驾驶证/行驶证识别 end ******************************************** */
  /***************************************银行卡识别 start ******************************************** */
  bankCardAi(base64Image, that) {
    api.bankCardRequest(base64Image, {
      success(result) {
        var code = result.ret;
        if (code == 0) {
          wx.hideLoading();
          let msgList = result.data.item_list;
          let messageList = []
          msgList.forEach((_item) => {
            let obj = {};
            obj.key = _item.item;
            obj.value = _item.itemstring
            messageList.push(obj);
          })
          that.setData({
            img: 'data:image/png;base64,' + base64Image,
            messageList: messageList
          })
        } else {
          wx.hideLoading();
          wx.showModal({
            title: '错误提示',
            content: result.msg,
            showCancel: false
          })
        }
      }
    })
  }, 
  /***************************************银行卡识别 end ******************************************** */
  /***************************************车牌号识别 start ******************************************** */
  carCardAi(base64Image, that) {
    api.carCardRequest(base64Image, {
      success(result) {
        var code = result.ret;
        if (code == 0) {
          wx.hideLoading();
          let msgList = result.data.item_list;
          let messageList = [
            { key: '车牌号', value: msgList[0].itemstring },
          ]
          that.setData({
            img: 'data:image/png;base64,' + base64Image,
            messageList: messageList
          })
        } else {
          wx.hideLoading();
          wx.showModal({
            title: '错误提示',
            content: result.msg,
            showCancel: false
          })
        }
      }
    })
  }, 
  /***************************************车牌号识别 end ******************************************** */
  /***************************************名片识别 start ******************************************** */
  personCardAi(base64Image, that) {
    api.personCardRequest(base64Image, {
      success(result) {
        var code = result.ret;
        if (code == 0) {
          wx.hideLoading();
          let msgList = result.data.item_list;
          let messageList = []
          msgList.forEach((_item) => {
            let obj = {};
            obj.key = _item.item;
            obj.value = _item.itemstring
            messageList.push(obj);
          })
          that.setData({
            img: 'data:image/png;base64,' + base64Image,
            messageList: messageList
          })
        } else {
          wx.hideLoading();
          wx.showModal({
            title: '错误提示',
            content: result.msg,
            showCancel: false
          })
        }
      }
    })
  },
  /***************************************名片识别 end ********************************************** */
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.type = Number(options.id);
    let title = '身份证识别'
    switch(this.data.type) {
      case 0 :
        title= '身份证识别'
        break;
      case 1:
        title = '驾驶证识别'
        break;
      case 2:
        title = '银行卡识别'
        break;
      case 3:
        title = '车牌号识别'
        break
      case 4:
        title = '名片识别'
        break;
      case 5:
        title = '行驶证识别'
        break;
      case 6:
        title = '行驶证识别'
        break;


    }
    wx.setNavigationBarTitle({
      title: title
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  bindNavigateTo(e) {
    const that = this;
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../ocrDetail/index?id=${id}`,
    })
  },
  bindToDetail(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../pictureDetail/index?id=${id}`,
    })
  },
  onLoad: function () {
   
  },
  onShareAppMessage(res) {
    return {
      title: '智能Ai',
      path: '/pages/index/index',
      imageUrl: '/images/ai.jpg'
    }
  }
  
})

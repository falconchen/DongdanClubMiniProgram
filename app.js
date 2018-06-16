//app.js
const apiHost = 'https://www.cellmean.com';
const Towxml = require('/towxml/main');     //引入towxml库
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)




  },
  towxml: new Towxml(),  
  loading: function (title) {
    var tlt = title || '加载中';
    wx.showLoading({
      title: tlt,
      mask: true
    })
  },
  globalData: {
    api_prefix : 'http://dev.cellmean.com'
  }
  
})
//app.js

const Towxml = require('/towxml/main');     //引入towxml库
App({

  globalData: {
    apiHost: 'https://www.cellmean.com',
    version:'1.5.0'
  },

  onLaunch: function () {
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    var that = this;
    wx.checkSession({
      success: function () {
        //session_key 未过期，并且在本生命周期一直有效
        //console.log('ok');
      },
      fail: function () {        
        // session_key 已经失效，需要重新执行登录流程
        that.wxlogin() //重新登录
  
      }
    });  

    
  },


  wxlogin: function(){
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: that.globalData.apiHost,
            data: {
              osc_api: 'wx_login',
              code: res.code,

            },
            success: function (res) {
              //@todo 保存3rd  session
              console.log('login fine');
            }
          })
        } else {
          console.log('login failed' + res.errMsg)
        }
      }
    });
  },
  
  towxml: new Towxml(),  
  loading: function (title) {
    var tlt = title || '加载中';
    wx.showLoading({
      title: tlt,
      mask: true
    })
  }
  

})
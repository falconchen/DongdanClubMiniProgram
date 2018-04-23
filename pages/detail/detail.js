// pages/detail/detail.js
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tweet:{},
    replies: [],
    replyPage: 0,
    tweetId: '',
    tweetBodyHtml:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.tweetId = options.id;
    var app = getApp();
    //app.loading();

    wx.getStorage({
      key: 'tweet_' + that.tweetId,
      success: function (res) {
        //console.log(res.data)
        //var thumbs = (res.data.thumbs) ? res.data.thumbs :[];
        wx.setNavigationBarTitle({
          title: res.data.author+' 的动弹'
        })
        //var tweetBodyHtml = app.towxml.toJson(res.data.body, 'html');      
        var tweetBodyHtml = res.data.body2;
        that.setData({ tweet: res.data, tweetBodyHtml: tweetBodyHtml})
      }
    })
    console.log(options);
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
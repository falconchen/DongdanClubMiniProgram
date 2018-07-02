// pages/myself/myself.js
var util = require('../../utils/util.js');
var modalImg = require('../template/modal-img.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    author:[],
    tweets: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var authorid = options.id; 

    //个人信息
    util.getAuthorInfo(authorid,function(resData){
      if(resData.background) {
        resData.char = resData.author.substr(0,1);
      }
      that.setData({
        author: resData
      });
      wx.setNavigationBarTitle({
        title: resData.author + ' 的动弹'
      });
    },function(){},function(){})

    //动弹信息
    util.getUserTweetList(authorid, 1, function (resData){
      //console.log(resData);
      that.setData({tweets:resData});
    },function(){},function(){})

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
  
  },

  blockUser: function(e) {
    if(util.blockUser(e)){
      wx.reLaunch({ url: '/pages/home/home' });
    }
  },


  clickTweet: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;

    wx.setStorage({
      key: 'tweet_' + id,
      data: that.data.tweets[index]
    });

  },
  blockFilter: util.blockFilter,

  modalSubmit: modalImg.modalSubmit,
  preTouchMove: modalImg.preTouchMove,
  closeImgModal: modalImg.closeImgModal,
  previewImg: modalImg.previewImg,
  bigImgLoaded: modalImg.bigImgLoaded

})
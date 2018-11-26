// pages/myself/myself.js
var util = require('../../utils/util.js');
var modalImg = require('../template/modal-img.js');
var authorid;
var currentPage ;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    author:[],
    tweets: [],
    finishLoadList:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    authorid = options.id; 
    currentPage = 1;
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
    util.getUserTweetList(authorid, currentPage, function (resData){
      //console.log(resData);
     
      that.setData({ tweets: resData, finishLoadList:(resData.length < 20)});
      currentPage++
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

  onReachBottom: function () {
    //app.loading();

    var that = this;

    if (that.data.finishLoadList) {
      return;
    }
    //动弹信息
    util.getUserTweetList(authorid, currentPage, function (resData) {
      //console.log(resData);
      var tweetsData = that.data.tweets.concat(resData);
      that.setData({ tweets: tweetsData });
      
      if ( resData.length < 20){
        that.setData({ finishLoadList: true });
      }else{
        currentPage++
      }
    }, function () { }, function () { })


  },
  blockFilter: util.blockFilter,

  modalSubmit: modalImg.modalSubmit,
  preTouchMove: modalImg.preTouchMove,
  closeImgModal: modalImg.closeImgModal,
  previewImg: modalImg.previewImg,
  bigImgLoaded: modalImg.bigImgLoaded

})
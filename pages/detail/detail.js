// pages/detail/detail.js
var util = require('../../utils/util.js');
var modalImg = require('../template/modal-img.js');
const commentPerPage = 20;
var currentPage = 1;
var app = getApp();
var finishLoadComments =false;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tweet: {},
    replies: [],
    replyPage: 0,
    tweetId: '',
    commentCount: 0,
    tweetBodyHtml: '',
    comments: [],
    finishLoadComments: finishLoadComments,
    commentPerPage: currentPage
  },
  clickLink: util.clickLink,


  initTweet: function (tweet) {
    var tweetBodyHtml = tweet.body2;
    wx.setNavigationBarTitle({
      title: tweet.author + ' 的动弹'
    });
    
    this.setData({ tweet: tweet, tweetBodyHtml: tweetBodyHtml, commentCount: tweet.commentCount });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.tweetId = options.id;    
    that.key = 'tweet_' + that.tweetId;


    wx.getStorage({
      
      
      key: that.key,
      success: function (res) {
                              
        //var tweetBodyHtml = app.towxml.toJson(res.data.body, 'html');  
        
        that.initTweet(res.data);   
        wx.removeStorage({
          key: that.key,
          success: function (res) {            
          }
        });

      },
      fail:function(){
        

        util.getTweetDetail(that.tweetId, function (data) { 
                                    
          that.initTweet(data)

        }, function () { }, function () { });
      },
      complete:function(){
              

        //显示评论
        currentPage = 1;
        util.getTweetCommentList(that.tweetId, currentPage, commentPerPage,
          function (resdata) {
            finishLoadComments = Boolean(resdata.length < commentPerPage)
            //finishLoadComments = Boolean(resdata.length < commentPerPage)
            that.setData({ comments: resdata, finishLoadComments: finishLoadComments })
            currentPage++
          },
          function () { }
        );
      }

    })
    //console.log(options);
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

    // wx.showToast({
    //   title: '暂时禁止下拉刷新',
    //   icon: "success"

    // })
    // return;//暂时禁止
    
    // var that = this;
    
    
    // wx.reLaunch({
    //   url: 'detail?id='+that.tweetId,
    // });

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
    var that = this;
    //console.log(that.data.finishLoadComments);return;
    
    if (finishLoadComments || that.data.comments.length < commentPerPage) {
      that.setData({  finishLoadComments: true })
      return;
    }

    //console.log(currentPage)
    app.loading('评论加载中');
    util.getTweetCommentList(that.tweetId, currentPage, commentPerPage,
      function (resdata) {
        finishLoadComments = Boolean(resdata.length < commentPerPage)
        //console.log(finishLoadComments)
        wx.hideLoading()
        that.setData({ comments: that.data.comments.concat(resdata), finishLoadComments: finishLoadComments })
        currentPage++
        

      },
      function () {
        //wx.hideLoading()
        //that.setData({ loadingMore: false });
      }
    );
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  modalSubmit: modalImg.modalSubmit,
  preventTouchMove: modalImg.preventTouchMove,
  closeImgModal: modalImg.closeImgModal,
  bigImgLoaded: modalImg.bigImgLoaded

})
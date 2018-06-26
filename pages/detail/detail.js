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
    commentPerPage: currentPage,
    tweetData :'',
    bookmarked : false
  },
  clickLink: util.clickLink,


  initTweet: function (tweet) {
    var tweetBodyHtml = tweet.body2;
    wx.setNavigationBarTitle({
      title: tweet.author + ' 的动弹'
    });
    
    this.setData({ tweet: tweet, tweetBodyHtml: tweetBodyHtml, commentCount: tweet.commentCount, tweetData: JSON.stringify(tweet),bookmarked:this.isBookmarked(tweet.id)});

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
            console.log(resdata)
            finishLoadComments = Boolean(resdata.length < commentPerPage)
            //finishLoadComments = Boolean(resdata.length < commentPerPage)
            resdata = util.blockCommentFilter(resdata);
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

        var commentData = that.data.comments.concat(resdata);
        commentData = util.blockCommentFilter(commentData);
        that.setData({ comments: commentData, finishLoadComments: finishLoadComments })
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

  /**
   * 点击收藏
   */
  bookmark: function(e) {
    var that = this;

    var tweet = JSON.parse(e.currentTarget.dataset.tweet);
    var bookmarklist = wx.getStorageSync('bookmarklist') || [];
    bookmarklist.unshift(tweet);
    wx.setStorageSync('bookmarklist', bookmarklist);
    this.setData({ bookmarked: this.isBookmarked(tweet.id) });

  },

  /**
   * 检查是否被收藏
   */
  isBookmarked: function(tweetid) {
    var bookmarklist = wx.getStorageSync('bookmarklist') || [];
    if (bookmarklist.length == 0) {
      return false;
    }
    for(var i=0;i<bookmarklist.length;i++) {
      if(bookmarklist[i].id == tweetid) {
        return true;
      }
    }
    return false;
  },

  /**
   * 取消收藏
   */
  unbookmark: function(e) {
    var that = this;
    
    var tweet = JSON.parse(e.currentTarget.dataset.tweet);
    var bookmarklist = wx.getStorageSync('bookmarklist') || [];
    if( bookmarklist.length == 0 ) {
      return;
    }    
    for(var i=0;i<bookmarklist.length;i++) {

      if (tweet.id == bookmarklist[i].id) {
        
        bookmarklist.splice(i, 1);
        wx.setStorageSync('bookmarklist', bookmarklist);
        
        that.setData({ bookmarked: that.isBookmarked(tweet.id) });
        return;
      }
    }
    return ;
    

  },
  /**
   * 屏蔽评论中的头像
   */
  blockUserComment: function(e){
    var that = this;

    var author = e.currentTarget.dataset.author;
    var authorid = e.currentTarget.dataset.authorid;
    var avatar = e.currentTarget.dataset.avatar;

    wx.showModal({ //使用模态框提示用户进行操作

      title: '警告',

      content: '你确定要屏蔽 ' + author + ' 吗?',

      success: function (res) {

        if (res.confirm) { //判断用户是否点击了确定

          //wx.clearStorageSync();
          var blocklist = wx.getStorageSync('blocklist') || [];
          var authorData = {
            'author': author,
            'authorid': authorid,
            'avatar': avatar
          };
          blocklist.unshift(authorData);
          wx.setStorageSync('blocklist', blocklist);
          var commentData = that.data.comments;
          commentData = util.blockCommentFilter(commentData);
          that.setData({ comments: commentData, finishLoadComments: finishLoadComments })
          return true;
        }

      }

    })
    return false;
  },

  blockCommentFilter: util.blockCommentFilter,

  blockUser: util.blockUser,
  blockFilter: util.blockFilter,
  modalSubmit: modalImg.modalSubmit,
  preventTouchMove: modalImg.preventTouchMove,
  closeImgModal: modalImg.closeImgModal,
  bigImgLoaded: modalImg.bigImgLoaded

})
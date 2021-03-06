// pages/daily/article.js
var util = require('../../utils/util.js');
var articleId = 0;
var currentCommentPage = 1;
var CommentPerPage = 20;
var app = getApp();
Page({

  clickLink: util.clickLink,
  /**
   * 页面的初始数据
   */
  data: {
    cover:'https://staticosc.cellmean.com/uploads/user/714/1428332_100.jpg?t=1400110163000',
    articleId: articleId,
    bodyHtml: '',
    article:{'author':'小小编辑'},
    comments:[],
    finishLoadComments:false,
    skinStyle:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    util.changeBarTabStyle();
    that.setData({
      skinStyle:app.globalData.skin
    });
    articleId = options.id
    
    //请求文章api
    currentCommentPage = 1;
    
    //app.loading();

    util.getBlogDetail( articleId, function (data) { //成功
      
      if (data.pubDate) {
        var date = new Date(data.pubDate.replace(/-/g, '/'));
        data.pubDate = util.blogDateReplace(data.pubDate)

        data.body = data.body.replace(/&nbsp;/g, ' ');                   
        var bodyHtml = app.towxml.toJson(data.body, 'html');      
        
        wx.setNavigationBarTitle({
          title: data.title
        })

        //var bodyHtml = app.towxml.toJson(data.body, 'html');      
        that.setData({ articleId: articleId, article: data, bodyHtml: bodyHtml, commentCount:data.commentCount})

        that.loadAllComments();

      }
      


    }, function (event) {//完成
      that.setData({ finishLoadList: true })
    }, function (error) {//失败

    });


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
    var that = this;
    util.changeBarTabStyle();
    that.setData({
      skinStyle:app.globalData.skin
    });
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

  /**
   * 加载全部评论
   */
  loadAllComments: function(){
    var that = this;
    var commentsPerPage = 20;
    var maxPages = Math.ceil(that.data.commentCount / commentsPerPage)


    if (that.data.finishLoadComments) {
      return;
    }
    for (var i = 1; i <= maxPages; i++) {
      util.getBlogCommentList(
        articleId, i, commentsPerPage,
        function (resdata) {
          var commentData = that.data.comments.concat(resdata);
          resdata = util.blockCommentFilter(resdata);
          that.setData({ comments: commentData })
          if (i >= maxPages) {
            that.setData({ finishLoadComments: true });
          }

        }, function () { }, function () { }
      );
    }
  }

})
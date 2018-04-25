//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');
const tweetPerPage = 20;
var currentPage = 1;

var config = {
  data: {
    tweets: [],
    loadingMore:false
  },
  onLoad: function (options) {

    //console.log(app.globalData.api_prefix)
    var that = this;
    // var nodeId = options.nodeid;
    app.loading();
    util.getTweetList(0, currentPage, tweetPerPage,
      function(resdata){
        currentPage++        
        that.setData({tweets:resdata})
      },
      function() {
        wx.hideLoading()
        //wx.stopPullDownRefresh()
      }
    );
    
    
  },
  /**
   * 下拉刷新
   */
  onPullDownRefresh: function () {
    //app.loading();
    console.log('上拉');
    wx.reLaunch({
      url: 'home',
    });

  },
  onReachBottom: function () {
    app.loading();
    // setTimeout(function(){
    //   wx.hideLoading()
    // },2000)
    var that = this;
    //that.setData({ loadingMore: true });
    //console.log("onReachBottom");
    util.getTweetList(0, currentPage, tweetPerPage,
      function (resdata) {
        currentPage++       
        that.setData({ tweets: that.data.tweets.concat(resdata) })
        wx.hideLoading()
      },
      function () {
        //wx.hideLoading()
        that.setData({ loadingMore: false });
      }
    );

  },
  clickMe: function(event){
    var that = this;
    var index = event.currentTarget.dataset.index;
    var id = event.currentTarget.dataset.id;
    console.log(event.currentTarget.dataset)
    wx.setStorage({
      key: 'tweet_'+id,
      data: that.data.tweets[index]
    });
    
    //console.log(that.data.tweets);
  }
};
Page(config);
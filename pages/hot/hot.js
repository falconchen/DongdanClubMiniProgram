//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');


var config = {
  data: {
    tweets: [],
    loadingMore: false
  },
  onLoad: function (options) {

    //console.log(app.globalData.api_prefix)
    var that = this;
    // var nodeId = options.nodeid;
    app.loading();
    util.getHotTweetList(
      function (resdata) {
        
        that.setData({ tweets: resdata })
      },
      function () {
        wx.hideLoading()
        //wx.stopPullDownRefresh()
      }
    );


  },
  /**
   * 下拉刷新
   */
  onPullDownRefresh: function () {
    
    //console.log('上拉');
    wx.reLaunch({
      url: 'hot',
    });

  },

  clickMe: function (event) {
    var that = this;
    var index = event.currentTarget.dataset.index;
    var id = event.currentTarget.dataset.id;
    //console.log(event.currentTarget.dataset)
    wx.setStorage({
      key: 'tweet_' + id,
      data: that.data.tweets[index]
    });

    //console.log(that.data.tweets);
  }
};
Page(config);
//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');
var modalImg = require('../template/modal-img.js');

var config = {
  data: {
    tweets: [],
    loadingMore: false,
    skinStyle:''
  },
  onLoad: function (options) {

    //console.log(app.globalData.api_prefix)
    var that = this;
    
    util.changeBarTabStyle();
    that.setData({
      skinStyle:app.globalData.skin
    });
    
    //app.loading();
    util.getHotTweetList(
      function (resdata) {
        resdata = that.blockFilter(resdata);
        that.setData({ tweets: resdata })
      },
      function () {
        //wx.hideLoading()
        that.setData({ finishLoadList: true })
        //wx.stopPullDownRefresh()
      }
    );


  },
  onShow:function(){
    var that = this;
    util.changeBarTabStyle();
    that.setData({
      skinStyle:app.globalData.skin
    });
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

  clickTweet: function (event) {
    var that = this;
    var index = event.currentTarget.dataset.index;
    var id = event.currentTarget.dataset.id;
    //console.log(event.currentTarget.dataset)
    //wx.setStorageSync('tweet_' + id,that.data.tweets[index]);
    wx.setStorage({
      key: 'tweet_' + id,
      data: that.data.tweets[index]
    });

    //console.log(that.data.tweets);
  },

  blockUser: util.blockUser,
  blockFilter: util.blockFilter,

  modalSubmit: modalImg.modalSubmit,
  preventTouchMove: modalImg.preventTouchMove,
  closeImgModal: modalImg.closeImgModal,
  previewImg: modalImg.previewImg,
  bigImgLoaded: modalImg.bigImgLoaded


};
Page(config);
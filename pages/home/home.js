//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');
var modalImg = require('../template/modal-img.js');
const tweetPerPage = 20;
var currentPage = 1;

var config = {
  data: {
    tweets: [],
    bigImg: '../resources/loading293.gif',
    loadingMore: false
  },
  gotoTweet: util.gotoTweet,
  clickLink: util.clickLink,
  onLoad: function(options) {
    currentPage = 1;
    var that = this;
    app.loading();
    util.getTweetList(0, currentPage, tweetPerPage,
      function(resdata) {

        currentPage++

        resdata = that.blockFilter(resdata);

        that.setData({
          tweets: resdata
        })
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
  onPullDownRefresh: function() {

    wx.reLaunch({
      url: 'home',
    });

  },
  onReachBottom: function() {
    app.loading();

    var that = this;

    util.getTweetList(0, currentPage, tweetPerPage,
      function(resdata) {
        currentPage++

        //排除重复id
        var oldMaxIndex = that.data.tweets.length > 0 ? that.data.tweets.length - 1 : 0;

        //看上一个列表的最后一个元素在下一个列表的第几个位置出来，然后排除0～i的元素
        for (let i = 0; i < resdata.length; i++) {
          if (resdata[i].id == that.data.tweets[oldMaxIndex].id) {
            resdata.splice(0, i + 1);
            break;
          }
        }
        resdata = that.blockFilter(resdata);
        that.setData({
          tweets: that.data.tweets.concat(resdata)
        })
        wx.hideLoading()
      },
      function() {
        that.setData({
          loadingMore: false
        });
      }
    );

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

  blockUser: util.blockUser,

  blockFilter: util.blockFilter,

  modalSubmit: modalImg.modalSubmit,
  preTouchMove: modalImg.preTouchMove,
  closeImgModal: modalImg.closeImgModal,
  previewImg: modalImg.previewImg,
  bigImgLoaded: modalImg.bigImgLoaded



};
Page(config);
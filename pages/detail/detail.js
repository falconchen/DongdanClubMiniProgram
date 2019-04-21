// pages/detail/detail.js

var util = require('../../utils/util.js');
var modalImg = require('../template/modal-img.js');
import { ModalView } from '../template/modal-view/modal-view.js';

const commentPerPage = 20;
var currentPage = 1;
var app = getApp();
var finishLoadComments = false;

Page({

  // rawComments:[], //原始评论数据，不包含block

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
    finishLoadComments: false,
    commentPerPage: currentPage,
    tweetData: '',
    bookmarked: false,
    finishLoadList: true, //第一页评论不加载loading icon
    skinStyle: ''    
  },
  clickLink: util.clickLink,


  initTweet: function (tweet) {
    var tweetBodyHtml = tweet.body2;
    wx.setNavigationBarTitle({
      title: tweet.author + ' 的动弹'
    });

    this.setData({
      tweet: tweet,
      tweetBodyHtml: tweetBodyHtml,
      commentCount: tweet.commentCount,
      tweetData: JSON.stringify(tweet),
      bookmarked: this.isBookmarked(tweet.id)
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this;
    util.changeBarTabStyle();
    that.setData({
      skinStyle: app.globalData.skin
    });

    that.tweetId = options.id;
    that.key = 'tweet_' + that.tweetId;


    wx.getStorage({


      key: that.key,
      success: function (res) {

        //var tweetBodyHtml = app.towxml.toJson(res.data.body, 'html');  

        that.initTweet(res.data);
        wx.removeStorage({
          key: that.key,
          success: function (res) {}
        });

      },
      fail: function () {


        util.getTweetDetail(that.tweetId, function (data) {

          that.initTweet(data)

        }, function () {}, function () {});
      },
      complete: function () {


        //显示评论
        currentPage = 1;
        util.getTweetCommentList(that.tweetId, currentPage, commentPerPage,
          function (resdata) {
            finishLoadComments = Boolean(resdata.length < commentPerPage)

            //that.rawComments = resdata;
            //that.rawComments = JSON.parse(JSON.stringify(resdata)); //深层复制
            resdata = util.blockCommentFilter(resdata);

            that.setData({
              comments: resdata,
              finishLoadComments: finishLoadComments,
              finishLoadList: finishLoadComments
            })
            currentPage++
          },
          function () {}
        );
      }

    })
    //console.log(options);
    new ModalView;
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
      skinStyle: app.globalData.skin
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

    if (finishLoadComments) {

      that.setData({
        finishLoadComments: true
      })
      return;
    }

    //console.log(currentPage)
    //app.loading('评论加载中');
    util.getTweetCommentList(that.tweetId, currentPage, commentPerPage,
      function (resdata) {
        finishLoadComments = Boolean(resdata.length < commentPerPage)


        //wx.hideLoading()

        var commentData = that.data.comments.concat(resdata);
        commentData = util.blockCommentFilter(commentData);
        that.setData({
          comments: commentData,
          finishLoadComments: finishLoadComments
        })
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
  bookmark: function (e) {
    var that = this;

    var tweet = JSON.parse(e.currentTarget.dataset.tweet);
    var bookmarklist = wx.getStorageSync('bookmarklist') || [];
    bookmarklist.unshift(tweet);
    wx.setStorageSync('bookmarklist', bookmarklist);
    this.setData({
      bookmarked: this.isBookmarked(tweet.id)
    });

  },

  /**
   * 检查是否被收藏
   */
  isBookmarked: function (tweetid) {
    var bookmarklist = wx.getStorageSync('bookmarklist') || [];
    if (bookmarklist.length == 0) {
      return false;
    }
    for (var i = 0; i < bookmarklist.length; i++) {
      if (bookmarklist[i].id == tweetid) {
        return true;
      }
    }
    return false;
  },

  /**
   * 取消收藏
   */
  unbookmark: function (e) {
    var that = this;

    var tweet = JSON.parse(e.currentTarget.dataset.tweet);
    var bookmarklist = wx.getStorageSync('bookmarklist') || [];
    if (bookmarklist.length == 0) {
      return;
    }
    for (var i = 0; i < bookmarklist.length; i++) {

      if (tweet.id == bookmarklist[i].id) {

        bookmarklist.splice(i, 1);
        wx.setStorageSync('bookmarklist', bookmarklist);

        that.setData({
          bookmarked: that.isBookmarked(tweet.id)
        });
        return;
      }
    }
    return;


  },
  /**
   * 屏蔽评论中的头像
   */
  blockUserComment: function (e) {
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
          that.setData({
            comments: commentData,
            finishLoadComments: finishLoadComments
          })
          return true;
        }

      }

    })
    return false;
  },

  /**
   * 生成海报
   */
  makePoster: function (e) {
    var that = this;
    var tweet = JSON.parse(e.currentTarget.dataset.tweet);
    var path = "pages/detail/detail?id=" + tweet.id;
    var qrcodeImagePath = '';
    var imageInlocalFlag = true;
    var posterImagePath = '';
    var title = tweet.author + '的动弹';
    var excerpt = util.stripTags(tweet.body);
    
    var flag = false;
    var posterImageUrl = tweet.portrait;

    if(excerpt.length > 90) {
      excerpt = excerpt.substr(0,90) + '...';
    }
    if(title.length > 36) {
      title = title.substr(0,36) + '...';
    }

    if (tweet.bigImgs != undefined) {
      posterImageUrl = tweet.bigImgs[0];

    }
    console.log(posterImageUrl);
    if( posterImageUrl.indexOf('oscimg.oschina.net')>0 ){

      var tailPos = posterImageUrl.indexOf('!/');
      if(tailPos > 0) {
        posterImageUrl.substr(0,tailPos) ;
      }
      posterImageUrl += '!/both/400x270';
      //posterImageUrl += '!/sq/400';
    }


    wx.showLoading({
      title: "正在生成海报",
      mask: true,
    });

    imageInlocalFlag = false;


    //请求qrcode
    util.getWechatQRcode(path, function (data) {
      if (data.success) {
        var posterQrcodeUrl = data.data.url;

        const downloadTaskQrcodeImage = wx.downloadFile({
          url: posterQrcodeUrl,
          success: res => {
            if (res.statusCode === 200) {
              qrcodeImagePath = res.tempFilePath;
              console.log("二维码图片本地位置：" + res.tempFilePath);

              
              const downloadTaskForPostImage = wx.downloadFile({
                url: posterImageUrl,
                success: res => {
                  if (res.statusCode === 200) {
                    posterImagePath = res.tempFilePath;
                    console.log("文章图片本地位置：" + res.tempFilePath);
                    flag = true;
                    if (posterImagePath && qrcodeImagePath) {
                      util.createPosterLocal(posterImagePath, qrcodeImagePath, title, excerpt, function (imgPath) {
                        wx.hideLoading();
                        console.log(imgPath);

                        that.modalView.showModal({
                          title: '保存至相册可以分享到朋友圈',
                          confirmation: false,
                          confirmationText: '',
                          inputFields: [{
                              fieldName: 'posterImage',
                              fieldType: 'Image',
                              fieldPlaceHolder: '',
                              fieldDatasource: imgPath,
                              isRequired: false,
                          }],
                          confirm: function (res) {
                              console.log('done');
                              //用户按确定按钮以后会回到这里，并且对输入的表单数据会带回
                          }
                      });

                     

                      }, function (res) {
                        wx.hideLoading();
                        console.log(res);
                      });
                    }
                  } else {
                    console.log(res);
                    wx.hideLoading();
                    wx.showToast({
                      title: "生成海报失败...",
                      mask: true,
                      duration: 2000
                    });
                    return false;


                  }
                }
              });
              downloadTaskForPostImage.onProgressUpdate((res) => {
                console.log('下载图片进度：' + res.progress)

              })
              
            } else {
              console.log(res);
              wx.hideLoading();
              flag = false;
              wx.showToast({
                title: "生成海报失败...",
                mask: true,
                duration: 2000
              });
              return false;
            }
          }
        });
        downloadTaskQrcodeImage.onProgressUpdate((res) => {
          console.log('下载二维码进度', res.progress)
        })



      }else{

      }

    });

  },



  blockCommentFilter: util.blockCommentFilter,

  blockUser: util.blockUser,
  blockFilter: util.blockFilter,
  modalSubmit: modalImg.modalSubmit,
  preventTouchMove: modalImg.preventTouchMove,
  closeImgModal: modalImg.closeImgModal,
  bigImgLoaded: modalImg.bigImgLoaded,
  previewImg: modalImg.previewImg

})
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
    loadingMore:false
  },
  gotoTweet: util.gotoTweet,
  clickLink: util.clickLink,
  onLoad: function (options) {
    currentPage = 1;
    //console.log(app.globalData.api_prefix)
    var that = this;
    // var nodeId = options.nodeid;
    app.loading();
    util.getTweetList(0, currentPage, tweetPerPage,
      function(resdata){
        //console.log(resdata)
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
    //console.log('上拉');
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

        // for (let i=0;i<resdata.length;i++ ) { //排除重复的动弹id
        //   for (let j in that.data.tweets) {
            

        //     if(that.data.tweets[j].id != resdata[i].id){              
        //       console.log(resdata[i]);
        //       //resdata.splice(0,1);
        //       break;
        //     }

        //   }          
        // }      
        //排除重复id
        var oldMaxIndex = that.data.tweets.length > 0 ? that.data.tweets.length-1 :0;

        //看上一个列表的最后一个元素在下一个列表的第几个位置出来，然后排除0～i的元素
        for(let i=0;i<resdata.length;i++) {
          if (resdata[i].id == that.data.tweets[oldMaxIndex].id) {                
              resdata.splice(0, i+1);
              break;
          }
        }
        
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
    //console.log(event.currentTarget.dataset)
    wx.setStorage({
      key: 'tweet_'+id,
      data: that.data.tweets[index]
    });
    
    //console.log(that.data.tweets);
  },
  
  modalSubmit: modalImg.modalSubmit,
  preventTouchMove: modalImg.preventTouchMove,
  closeImgModal: modalImg.closeImgModal,
  bigImgLoaded: modalImg.bigImgLoaded
  /*
  submit: function (event) {
    //console.log(event.currentTarget.dataset.url)

    this.setData({
      showModal: true, bigImg: event.currentTarget.dataset.src
    })
  },

  preventTouchMove: function () {

  },


  closeImgModal: function (event) {
    this.setData({
      showModal: false, imgHeight: 'auto', imgTop: '300rpx',imgLoaded:false
    })
  },

  bigImgLoaded: function(event) {

    var that = this;
    var detail = event.detail

    if( (detail.height/detail.width) > 1.83) {
      that.setData({
        imgHeight: '1100rpx',
        imgTop: 0,
        imgLoaded: true
      })
    }else{
      var imgHeight = (600 * detail.height / detail.width)
      that.setData({
        imgHeight: imgHeight + 'rpx',
        imgTop: (1100 - imgHeight) / 2 +'rpx',
        imgLoaded:true
      })
    }    
  }
  */


};
Page(config);
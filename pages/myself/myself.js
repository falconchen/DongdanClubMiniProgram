// pages/myself/myself.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    blocklist:[],
    swiperHeight:650,
    blocklistHeight:150,
    bookmarklistHeight:150,
    bookmarklist:[],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    this.refreshBlocklist();
    this.refreshBookmarklist();
    var swiperHeight = this.swiperHeight;
    this.displayTitle()
    /*
    if (this.data.currentTab == 0) {
      
      swiperHeight = this.data.bookmarklistHeight;
      
    } else if (this.data.currentTab == 1){
      swiperHeight = this.data.blocklistHeight;
    }else{

    }

    this.setData({ swiperHeight: swiperHeight });
    */
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

  refreshBlocklist(){
    var blocklist = wx.getStorageSync('blocklist') || [];
    
    var blocklistHeight = blocklist.length * 80 > 0 ? blocklist.length * 80 :550;
    this.setData({ blocklist: blocklist, blocklistHeight: blocklistHeight + 20 });
  },

  refreshBookmarklist() {
    var bookmarklist = wx.getStorageSync('bookmarklist') || [];
    
    if(bookmarklist.length){
      for(var i=0;i<bookmarklist.length;i++) {
        bookmarklist[i].body = util.subWords(bookmarklist[i].body,38);
        bookmarklist[i].tweetData = JSON.stringify(bookmarklist[i]);
      }
    }      
    var bookmarklistHeight = bookmarklist.length * 120 > 0 ? bookmarklist.length * 120 : 550;
    this.setData({ bookmarklist: bookmarklist, bookmarklistHeight: bookmarklistHeight + 20 });

  },

  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current,
      
    });
    that.displayTitle()
  },

  clickTweet: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;

    wx.setStorage({
      key: 'tweet_' + id,
      data: that.data.bookmarklist[index]
    });

  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    that.displayTitle()
  },


  displayTitle: function(){

    var titles = ['收藏列表','屏蔽列表','关于小程序'];    
    wx.setNavigationBarTitle({
      title: titles[this.data.currentTab]
    });

  },


  unbookmark: function(e) {
    var that = this;

    wx.showModal({ //使用模态框提示用户进行操作

      title: '警告',

      content: '你确定要移除这条收藏吗?',

      success: function (res) {

        if (res.confirm) { //判断用户是否点击了确定

          if (util.unbookmark(e)) {
            that.refreshBookmarklist();
          }

        }

      }

    })


    

  },
  /**
   * 解除block
   */
  unblockUser: function (e) {

    var that = this;    
    var authorid = e.currentTarget.dataset.authorid;
    var author = e.currentTarget.dataset.author;

    wx.showModal({ //使用模态框提示用户进行操作

      title: '警告',

      content: '你确定要解除对 ' + author + ' 的屏蔽吗?',

      success: function (res) {

        if (res.confirm) { //判断用户是否点击了确定

          //wx.clearStorageSync();
          var blocklist = wx.getStorageSync('blocklist') || [];
          if(blocklist.length > 0) {

            for( var i=0;i<blocklist.length;i++ ) { 
              if(authorid == blocklist[i].authorid) {
                blocklist.splice(i, 1);
                wx.setStorageSync('blocklist', blocklist);
                that.refreshBlocklist();
                return;
              }                           
            }
            
          }
          

        }

      }

    })
  }

})
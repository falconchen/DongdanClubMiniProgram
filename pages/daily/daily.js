// pages/daily/daily.js
//import tempObj from '../template/template'
var util = require('../../utils/util.js');

const xxbianid = 1428332;
const blogPerPage = 20;
const girlPerPage = 15;
var currentBlogPage ;
var currentGirlPage;
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectlist: [],
    finishLoadBlogList:false,
    finishLoadGirlList:false,
    currentTab:0,
    scrollTop:[0,0],
    tabTitles:['乱弹', '美图'],
    mmlist: []
  },
  clickLink: util.clickLink,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    currentBlogPage = 1;
    var that = this;
    //app.loading();
    util.getUserBlogList(xxbianid, currentBlogPage, blogPerPage, function (data) { //成功
      

      if (data.projectlist) {
        
        var pubDates = [];
        for (let i = 0; i < data.projectlist.length; i++) {
          //真机时 util.timeSince总是NAN....

          data.projectlist[i].pubDate = util.blogDateReplace(data.projectlist[i].pubDate).replace(/\d{2}\:\d{2}\:\d{2}/g,"")

          
                              
        }
        currentBlogPage++;
        that.setData({ projectlist: data.projectlist, pubDates: pubDates })
      }



    }, function (event) {//完成
      //wx.hideLoading()
    }, function (error) {//失败

    });


    //载入妹子图
    currentGirlPage = 1;

    
    util.getTweetGirlsList(currentGirlPage, girlPerPage, function (data) { 
      currentGirlPage++;
      that.setData({ mmlist: data })
        //console.log(data)
    }, 
    
    function (event){

    },    
    function(error){


    },)

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
    //return false;
    wx.reLaunch({
      url: 'daily',
    });


  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    var that = this;
    if (that.data.finishLoadBlogList || that.data.finishLoadGirlList) {
      return;
    }
    
    if(that.data.currentTab == 1) {
      //console.log('加载妹子图')
      that.loadMoreGirl();
      return;
    }else{
      //console.log('加载BLOG')
      that.loadMoreBlog();
    }


    
  },

  loadMoreBlog:function(){

    var that = this;

    util.getUserBlogList(xxbianid, currentBlogPage, blogPerPage, function (data) { //成功


      if (data.projectlist) {

        var pubDates = [];
        for (let i = 0; i < data.projectlist.length; i++) {
          //真机时 util.timeSince总是NAN....

          data.projectlist[i].pubDate = util.blogDateReplace(data.projectlist[i].pubDate).replace(/\d{2}\:\d{2}\:\d{2}/g, "")



        }

        var blogsData = that.data.projectlist.concat(data.projectlist);
        that.setData({ projectlist: blogsData })

        if (data.projectlist.length < blogPerPage) {
          that.setData({ finishLoadBlogList: true })

        } else {
          currentBlogPage++;
        }

      }



    }, function (event) {//完成
      //wx.hideLoading()
    }, function (error) {//失败

    });


  },

  loadMoreGirl: function () {

    var that = this;

    util.getTweetGirlsList( currentGirlPage, girlPerPage, function (data) { //成功


      if (data) {
        

        var mmlist = that.data.mmlist.concat(data);
        that.setData({ mmlist: mmlist })

        if (data.length < girlPerPage) {
          that.setData({ finishLoadGirlList: true })

        } else {
          currentGirlPage++;
        }

      }



    }, function (event) {//完成
      
    }, function (error) {//失败

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
    //修正tab滚动距离
    //console.log(that.data.scrollTop[e.target.dataset.current]);
    wx.pageScrollTo({
      scrollTop: that.data.scrollTop[e.target.dataset.current],
      duration: 0
    })
    that.displayTitle()
  },



  displayTitle: function () {

    var titles = this.data.tabTitles;
    wx.setNavigationBarTitle({
      title: titles[this.data.currentTab]
    });

  },

  toDetail:function(){

  },


  onPageScroll: function (e) {

    //记录当前tab滚动距离    
    var that = this;
    if (e.scrollTop != 0) {

      var scrollTop = that.data.scrollTop;
      scrollTop[that.data.currentTab] = e.scrollTop;
      that.setData({ scrollTop: scrollTop })      

    }


  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  previewImg: function (e) {

    var current = e.target.dataset;
    var urls = [];
    for (var i=0;i<this.data.mmlist.length;i++ ) {
      urls[i] = this.data.mmlist[i].images.large
    }
    wx.previewImage({
      current: current.src,
      urls: urls      
    })
  }  

})
// pages/daily/daily.js
//import tempObj from '../template/template'
var util = require('../../utils/util.js');
const xxbianid = 1428332;
const blogPerPage = 20;
var currentPage = 1;
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectlist: []
  },
  clickLink: util.clickLink,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    currentPage = 1;
    var that = this;
    app.loading();
    util.getUserBlogList(xxbianid, currentPage, blogPerPage, function (data) { //成功
      

      if (data.projectlist) {
        
        var pubDates = [];
        for (let i = 0; i < data.projectlist.length; i++) {
          //真机时 util.timeSince总是NAN....

          data.projectlist[i].pubDate = util.blogDateReplace(data.projectlist[i].pubDate).replace(/\d{2}\:\d{2}\:\d{2}/g,"")

          
                              
        }
        that.setData({ projectlist: data.projectlist, pubDates: pubDates })
      }



    }, function (event) {//完成
      wx.hideLoading()
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
    wx.reLaunch({
      url: 'daily',
    });
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
    
  }
})
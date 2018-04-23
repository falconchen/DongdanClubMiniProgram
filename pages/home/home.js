//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');



var config = {
  data: {
    tweets: []
  },
  onLoad: function (options) {

    //console.log(app.globalData.api_prefix)
    var that = this;
    // var nodeId = options.nodeid;

    try {
      app.loading();

      // 请求数据
      wx.request({
        url: "https://dev.cellmean.com/?osc_api=tweet_list",
        header: {
          'cache-control': 'max-age=120'
        },
        success: function (res) {
          
          
          

          for(let i=0;i<res.data.length;i++){
            res.data[i].body2 = app.towxml.toJson(res.data[i].body, 'html');
            var date = new Date(res.data[i].pubDate.replace(/-/g, '/'));
            res.data[i].pubDate = (Date.parse(date))/ 1000 ;

            if(res.data[i].imgSmall) {
              let imgPreUrl = 'https://staticosc.cellmean.com/uploads/space/';
              var thumbs = util.quoteSplit(res.data[i].imgSmall);
              if (thumbs.length>1) {

                for (let j = 0; j < thumbs.length;j++) {
                  if ( j>0 ) {
                    thumbs[j] = imgPreUrl + thumbs[j];
                  }
                }
                                
              }
              res.data[i].thumbs = thumbs;
            }
          }
          console.log(res.data);        
          that.setData({ tweets: res.data });


        },
        complete: function () {
          wx.hideLoading()
          wx.stopPullDownRefresh()
        }
      });
    } catch (e) {
      // Do something when catch error
    }
  },
  /**
   * 下拉刷新
   */
  onPullDownRefresh: function () {
    wx.reLaunch({
      url: 'index',
    });
  },
  onReachBottom: function () {
    // app.loading();
    // setTimeout(function(){
    //   wx.hideLoading()
    // },2000)
    console.log("onReachBottom")

  }
};
Page(config);
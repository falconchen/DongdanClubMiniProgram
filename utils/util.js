/**
 * 格式化时间 YYYY/MM/DD HH:II:SS
 */
const api_host = 'https://www.cellmean.com'

function formatTime(date) {
  date = typeof date === 'object' ? date : (new Date(date))

  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function timeSince(timestamp) {

  timestamp = parseInt(timestamp)

  
  var now = (new Date()).valueOf() / 1000; // 当前时间戳（秒）  ;

  var diff = now - timestamp; // 时间差

  return parseInt(timestamp)+ ' / ' +parseInt(timestamp) + ' ' + '秒前'

  if (diff < 0) {
    return '刚刚';
  }
  if (diff < 60) {
    return parseInt(diff) + ' ' + '秒前'
  }


  var periods = [
    [parseInt(diff / 31536000), '年前'], // 有bug，科学计数法时有bug
    [parseInt(diff / 2592000), '个月前'],
    [parseInt(diff / 18144000), '周前'],
    [parseInt(diff / 86400), '天前'],
    [parseInt(diff / 3600), '小时前'],
    [parseInt(diff / 60), '分钟前'],
    [parseInt(diff), '秒前'],
  ];

  for (var i = 0; i < 7; i++) {
    if (periods[i][0]) {
      return periods[i].join(' ');
    }
  }
  return '刚刚';
}

/**
 * 
 */

function clickLink(event) {

  console.log('click link');
  console.log(event);
}
/**
 * 格式化时间日期数据
 */
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 跳转页面
function redirect(url) {

  wx.navigateTo({
    url: url,
  })
}

/**
 * html是否需要解析
 */
// function isNeedParse(html) {
//   return html.indexOf('<a') !== -1 ||
//     html.indexOf('<img') !== -1 ||
//     html.indexOf('://') !== -1 ||
//     html.indexOf('<blockquote') !== -1 ||
//     html.indexOf('<code') !== -1;
// }


function quoteSplit(str) {
  var temp = str.split(/[\n,]/g);
  for (var i = 0; i < temp.length; i++) {
    if (temp[i] == "") {
      temp.splice(i, 1);
      //删除数组索引位置应保持不变
      i--;
    }
  }
  return temp;
}

function getTweetList(userid, currentPage, tweetPerPage, successCallback, completeCallback, errorCallback) {

  try {

    // 请求数据
    wx.request({
      url: api_host,

      data: {
        osc_api: 'tweet_list',
        page_index: currentPage,
        page_size: tweetPerPage
      },
      header: {
        'cache-control': 'max-age=120'
      },
      success: function (res) {

        var app = getApp();


        for (let i = 0; i < res.data.length; i++) {

          res.data[i].body2 = app.towxml.toJson(res.data[i].body, 'html');


          var date = new Date(res.data[i].pubDate.replace(/-/g, '/'));
          res.data[i].pubDate = (Date.parse(date)) / 1000; //取秒

          if (res.data[i].imgSmall) {
            let imgPreUrl = 'https://staticosc.cellmean.com/uploads/space/';
            var thumbs = quoteSplit(res.data[i].imgSmall);
            if (thumbs.length > 1) {

              for (let j = 0; j < thumbs.length; j++) {
                if (j > 0) {
                  thumbs[j] = imgPreUrl + thumbs[j];
                }
              }

            }
            res.data[i].thumbs = thumbs;
          }
        }
        //console.log(res.data);

        successCallback(res.data);

      },
      complete: function () {
        completeCallback();

      }
    });
  } catch (e) {
    errorCallback(e)
    // Do something when catch error
  }

}

function blogDateReplace(dateStr) {
  var date = new Date()

  var year = date.getFullYear()

  return dateStr.replace(year+'-', '').replace('.0', '');
}

function getTweetCommentList(id, currentPage, tweetPerPage, successCallback, completeCallback, errorCallback) {

  try {

    // 请求数据
    wx.request({
      url: api_host,

      data: {
        osc_api: 'tweet_comment_list',
        id: id,
        page_index: currentPage,
        page_size: tweetPerPage
      },
      header: {
        'cache-control': 'max-age=120'
      },
      success: function (res) {
        var app = getApp();


        for (let i = 0; i < res.data.length; i++) {

          res.data[i].content2 = app.towxml.toJson(res.data[i].content, 'html');
          var date = new Date(res.data[i].pubDate.replace(/-/g, '/'));
          res.data[i].pubDate = (Date.parse(date)) / 1000;
          //res.data[i].deviceName = getDeviceName(res.data[i].client_type);

        }
        

        successCallback(res.data);

      },
      complete: function () {
        completeCallback();

      }
    });
  } catch (e) {
    errorCallback()
    // Do something when catch error
  }

}

function getHotTweetList(successCallback, completeCallback, errorCallback) {

  try {

    // 请求数据
    wx.request({
      url: api_host,

      data: {
        osc_api: 'hot_tweet_list'
      },
      header: {
        'cache-control': 'max-age=120'
      },
      success: function (res) {

        var app = getApp();

        for (let i = 0; i < res.data.length; i++) {
          res.data[i].body2 = app.towxml.toJson(res.data[i].body, 'html');


          if (res.data[i].imgSmall) {
            let imgPreUrl = 'https://staticosc.cellmean.com/uploads/space/';
            var thumbs = quoteSplit(res.data[i].imgSmall);
            if (thumbs.length > 1) {

              for (let j = 0; j < thumbs.length; j++) {
                if (j > 0) {
                  thumbs[j] = imgPreUrl + thumbs[j];
                }
              }

            }
            res.data[i].thumbs = thumbs;
          }
        }

        successCallback(res.data);

      },
      complete: function () {
        completeCallback();

      }
    });
  } catch (e) {
    errorCallback(e)
    // Do something when catch error
  }

}

function getUserBlogList(authorid, currentPage, blogPerPage, successCallback, completeCallback, errorCallback) {

  

  try {

    // 请求数据
    wx.request({
      url: api_host,

      data: {
        osc_api: 'user_blog_list',
        authorid: authorid,
        page_index: currentPage,
        pgge_size: blogPerPage
      },
      header: {
        'cache-control': 'max-age=120'
      },
      success: function (res) {
                
        successCallback(res.data);

      },
      complete: function () {
        completeCallback();

      }
    });
  } catch (e) {
    errorCallback(e)
    // Do something when catch error
  }

}
/**
 * 获取博客文章详情
 */
function getBlogDetail(id, successCallback, completeCallback, errorCallback) {

  

  try {

    // 请求数据
    wx.request({
      url: api_host,

      data: {
        osc_api: 'blog_detail',
        id: id,
        
      },
      header: {
        'cache-control': 'max-age=120'
      },
      success: function (res) {
        
        
        successCallback(res.data);

      },
      complete: function () {
        completeCallback();

      }
    });
  } catch (e) {
    errorCallback(e)
    // Do something when catch error
  }

}

function gotoTweet(event) {
  console.log(getCurrentPages())
//  wx.navigateTo({
//     url: '/pages/detail/detail?id=' + event.currentTarget.dataset.id
//   })

}
module.exports = {
  formatTime: formatTime,
  jsTimeSince: timeSince, //替代方案，wxs版本在真机运行不正常，在乱弹页
  redirect: redirect,
  quoteSplit: quoteSplit,
  blogDateReplace: blogDateReplace,  
  clickLink: clickLink,
  gotoTweet: gotoTweet,
  getTweetList: getTweetList,
  getTweetCommentList: getTweetCommentList,
  getHotTweetList: getHotTweetList,
  getUserBlogList: getUserBlogList,
  getBlogDetail: getBlogDetail
}

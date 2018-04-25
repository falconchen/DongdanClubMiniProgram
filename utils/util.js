/**
 * 格式化时间 YYYY/MM/DD HH:II:SS
 */
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
function isNeedParse(html) {
  return html.indexOf('<a') !== -1 ||
    html.indexOf('<img') !== -1 ||
    html.indexOf('://') !== -1 ||
    html.indexOf('<blockquote') !== -1 ||
    html.indexOf('<code') !== -1;
}

/**
 * 解析离散的回复
 */
function utilParseTemArray(temArrayName, bindNameReg, total, that) {
  var array = [];
  var temData = that.data;
  var obj = null;

  for (var i = 0; i < total; i++) {
    if (temData[bindNameReg + i]) {
      var simArr = temData[bindNameReg + i].nodes;
      array[i] = simArr;
    }
  }
  
  temArrayName = temArrayName || 'wxParseTemArray';
  obj = JSON.parse('{"' + temArrayName + '":""}');
  obj[temArrayName] = array;

  that.setData(obj);
}

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

function getTweetList(userid, currentPage, tweetPerPage, successCallback, completeCallback,errorCallback) {

  try {
    
    // 请求数据
    wx.request({
      url: "https://dev.cellmean.com/",

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
          
          console.log(res.data[i].body2)
          var date = new Date(res.data[i].pubDate.replace(/-/g, '/'));
          res.data[i].pubDate = (Date.parse(date)) / 1000;

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

function getTweetCommentList(id, currentPage, tweetPerPage, successCallback, completeCallback, errorCallback) {

  try {

    // 请求数据
    wx.request({
      url: "https://dev.cellmean.com/",

      data: {
        osc_api: 'tweet_comment_list',
        id:id,
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
        //console.log(res.data);

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
      url: "https://dev.cellmean.com/",

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




module.exports = {
  formatTime: formatTime,
  redirect: redirect,
  isNeedParse: isNeedParse,
  utilParseTemArray: utilParseTemArray,
  quoteSplit: quoteSplit,
  
  getTweetList: getTweetList,
  getTweetCommentList: getTweetCommentList,
  getHotTweetList: getHotTweetList

}

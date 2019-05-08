/**
 * 格式化时间 YYYY/MM/DD HH:II:SS
 */

const app = getApp();
const apiHost = app.globalData.apiHost;

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
  
}

/**
 * 
 */

function clickLink(event) {

  // console.log('click link');
  // console.log(event);
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
      url: apiHost,

      data: {
        osc_api: 'tweet_list',
        page_index: currentPage,
        page_size: tweetPerPage
      },
      header: {
        'cache-control': 'max-age=120'
      },
      success: function (res) {

      
        for (let i = 0; i < res.data.length; i++) {

          res.data[i] = prepare_tweet_item(res.data[i]);
      
        }
        
        successCallback(res.data);

      },
      complete: function () {
        completeCallback();

      }

    });
  } catch (e) {
    console.log(e)
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
      url: apiHost,

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
        


        for (let i = 0; i < res.data.length; i++) {

          res.data[i].content2 = app.towxml.toJson(res.data[i].content, 'html');
          var date = new Date(res.data[i].pubDate.replace(/-/g, '/'));
          res.data[i].pubDate = (Date.parse(date)) / 1000;          

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
      url: apiHost,

      data: {
        osc_api: 'hot_tweet_list'
      },
      header: {
        'cache-control': 'max-age=120'
      },
      success: function (res) {        

        for (let i = 0; i < res.data.length; i++) {
          res.data[i] = prepare_tweet_item(res.data[i]);

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
      url: apiHost,

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
      url: apiHost,

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



function getTweetDetail(id, successCallback, completeCallback, errorCallback) {

  try {

    // 请求数据
    wx.request({
      url: apiHost,

      data: {
        osc_api: 'tweet_detail',
        id:id
      },
      header: {
        'cache-control': 'max-age=120'
      },
      success: function (res) {
                
        if (res.data){
          
          res.data = prepare_tweet_item(res.data )
          successCallback(res.data);
          
        }
            
      },
      complete: function () {
        completeCallback();

      }

    });
  } catch (e) {
    console.log(e)
    errorCallback(e)
    // Do something when catch error
  }

}

/**
 * 预处理动弹数据
 */

function prepare_tweet_item(tweet) {

        
  tweet.body2 = app.towxml.toJson(tweet.body, 'html');
  
  if(tweet.pubDate){
    var date = new Date(tweet.pubDate.replace(/-/g, '/'));
    tweet.pubDate = (Date.parse(date)) / 1000; //取秒  
  } 
  
  if (tweet.imgSmall) {
    let imgPreUrl = 'https://staticosc.cellmean.com/uploads/space/';
    var thumbs = quoteSplit(tweet.imgSmall);
    var bigImgs = quoteSplit(tweet.imgBig);
    if (thumbs.length > 1) {

      for (let j = 1; j < thumbs.length; j++) {
        thumbs[j] = (thumbs[j].indexOf('https://') === 0) ? thumbs[j] : imgPreUrl + thumbs[j];
        bigImgs[j] = (bigImgs[j].indexOf('https://') === 0) ? bigImgs[j] : imgPreUrl + bigImgs[j];
        //thumbs[j] = imgPreUrl + thumbs[j];
        //bigImgs[j] = imgPreUrl + bigImgs[j];

      }

    }
    tweet.bigImgs = bigImgs;
    tweet.thumbs = thumbs;
  }
  return tweet;
}


function delHtmlTag(str) {
  return str.replace(/<[^>]+>/g, "");//去掉所有的html标记
}

function subWords(str,limit){
  var str = delHtmlTag(str);
  if (str.length <= limit) {
    return str;
  }
  return str.substr(0,limit) + '...';
}

function blockFilter(resdata) {
  var blocklist = wx.getStorageSync('blocklist') || [];
  var qaBlock = wx.getStorageSync('qaBlock') || false;

  if (blocklist.length > 0) {

    for (var i = 0; i < resdata.length; i++) {

      var authorid = resdata[i].authorid;
      for (var j = 0; j < blocklist.length; j++) {
        if (authorid == blocklist[j].authorid) {
          resdata.splice(i, 1);
          i--;
          break;
        }
      }
    }
  }

  if (qaBlock) {

    for (var i = 0; i < resdata.length; i++) {

      var body = resdata[i].body;
      
      if (resdata[i].body.indexOf('>技术问答<') > 0 ) {
        console.log('blockedQA: '+resdata[i].body)
        resdata.splice(i, 1);
        i--;        
      }

    }
  }

  return resdata;

}

function blockCommentFilter(resdata) {
  var blocklist = wx.getStorageSync('blocklist') || [];
  if (blocklist.length > 0) {

    for (var i = 0; i < resdata.length; i++) {

      var authorid = resdata[i].commentAuthorId;
      for (var j = 0; j < blocklist.length; j++) {
        if (authorid == blocklist[j].authorid) {
          resdata.splice(i, 1);
          i--;
          break;
        }
      }
    }
  }
  return resdata;
}


function blockUser(e) {

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
        
        if(typeof that.data !=='undefined') {

          var tweets = that.data.tweets;
          if ( typeof tweets !=='undefined') {
            tweets = that.blockFilter(tweets);
            that.setData({
              tweets: tweets
            });
          }else{          
            wx.reLaunch( {url: '/pages/home/home'} );
          }

        }else{
          wx.reLaunch({ url: '/pages/home/home' });
        }
        return true;
      }

    }

  })
  return false;

}

/**
   * 取消收藏
   */
function unbookmark(e) {
  var that = this;

  var tweet = JSON.parse(e.currentTarget.dataset.tweet);
  var bookmarklist = wx.getStorageSync('bookmarklist') || [];
  if (bookmarklist.length == 0) {
    return false;
  }
  for (var i = 0; i < bookmarklist.length; i++) {

    if (tweet.id == bookmarklist[i].id) {
      bookmarklist.splice(i, 1);
      wx.setStorageSync('bookmarklist', bookmarklist);      
      return true;
    }
  }
  return false;

}

/**
 * 用户信息，自定义接口
 */
function getAuthorInfo(authorid,successCallback, completeCallback, errorCallback) {

  try {

    // 请求数据
    wx.request({
      url: apiHost,

      data: {
        osc_api: 'author_info',
        id: authorid
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
 * 用户动弹列表
 */

function getUserTweetList(userid, currentPage, successCallback, completeCallback, errorCallback) {

  try {

    // 请求数据
    wx.request({
      url: apiHost,

      data: {
        osc_api: 'user_tweet_list',
        id: userid,
        page_index: currentPage
        
      },
      header: {
        'cache-control': 'max-age=120'
      },
      success: function (res) {

        
        for (let i = 0; i < res.data.length; i++) {

          res.data[i] = prepare_tweet_item(res.data[i]);

        }

        successCallback(res.data);

      },
      complete: function () {
        completeCallback();

      }

    });
  } catch (e) {
    console.log(e)
    errorCallback(e)
    // Do something when catch error
  }

}

/**
 * 博客评论列表
 */
function getBlogCommentList(id, currentPage, commentsPerPage, successCallback, completeCallback, errorCallback) {

  try {

    // 请求数据
    wx.request({
      url: apiHost,

      data: {
        osc_api: 'blog_comment_list',
        id: id,
        page_index: currentPage,
        page_size: commentsPerPage
      },
      header: {
        'cache-control': 'max-age=120'
      },
      success: function (res) {



        for (let i = 0; i < res.data.length; i++) {

          res.data[i].content2 = app.towxml.toJson(res.data[i].content, 'html');
          var date = new Date(res.data[i].pubDate.replace(/-/g, '/'));
          res.data[i].pubDate = (Date.parse(date)) / 1000;

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


function getUserBlogList(authorid, currentPage, blogPerPage, successCallback, completeCallback, errorCallback) {

  

  try {

    // 请求数据
    wx.request({
      url: apiHost,

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
 * 妹子图列表
 */
function getTweetGirlsList(currentPage, perPage, successCallback, completeCallback, errorCallback) {

  try {

    // 请求数据
    wx.request({
      url: apiHost,

      data: {
        osc_api: 'tweet_girls_list',
        page_index: currentPage,
        page_size: perPage
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
    errorCallback()
    // Do something when catch error
  }

}


/**
 * 取一个笑话，排除
 */
function getOneJoke(currentId, type, successCallback,errorCallback) {

  try {

    // 请求数据
    wx.request({
      url: apiHost,
      data: {
        osc_api: 'get_one_joke',
        current_id: currentId,        
        type:type
      },
      header: {
        'cache-control': 'max-age=120'
      },      
      success: function (res) {
                        
        
        successCallback(res.data);
        
      },
    });
  } catch (e) {
    errorCallback();
    // Do something when catch error
  }

}

function copyText(text) {
  //this.ShowHideMenu();
  wx.setClipboardData({
      data: text,
      success: function (res) {
          wx.getClipboardData({
              success: function (res) {
                  wx.showToast({
                      title: '文字已复制',
                      //image: '../../images/link.png',
                      duration: 2000
                  })
              }
          })
      }
  })
}

/**
 * 修改黑暗模式下的导航栏和tab栏样式
 */
function changeBarTabStyle() {

  //app.globalData.skin = res.data

  if(app.globalData.skin == 'dark') {        
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#222A36',
      animation: {
        duration: 0,
        timingFunc: 'easeIn'
      }
    });
    wx.setTabBarStyle({
      color: '#C9C9C9',
      selectedColor: '#C9C9C9',
      backgroundColor: '#222A36',
      borderStyle: 'black'
    });
    
  }else{ //正常模式
    //console.log(app.globalData.skin)
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: "#45B05D",
      animation: {
        duration: 0,
        timingFunc: 'easeIn'
      }
    });
    wx.setTabBarStyle({
      color: '#707070',
      selectedColor: '#45B05D',
      backgroundColor: '#fff',
      borderStyle: 'white'
    });


  }
}

  /**
   * 获取QR Code
   */
  function getWechatQRcode(path,  successCallback,errorCallback) {

    try {
  
      // 请求数据
      wx.request({
        url: apiHost,
        method: 'POST',
        data: {
          osc_api: 'get_wechat_qrcode',
          path: path,
        },
        header: {
          'content-type':'application/x-www-form-urlencoded',
          'cache-control': 'max-age=120'
        },      
        success: function (res) {                                    
          successCallback(res.data);          
        },
      });
    } catch (e) {
      errorCallback();
      // Do something when catch error
    }
  
  
  
  
}

 //将canvas转换为图片保存到本地，然后将路径传给image图片的src
function createPosterLocal(postImageLocal, qrcodeLoal, title, excerpt,successCallback,errorCallback) {
  var that = this;

  var context = wx.createCanvasContext('mycanvas');
  context.setFillStyle('#ffffff');//填充背景色
  context.fillRect(0, 0, 600, 970);
  context.drawImage(postImageLocal, 0, 0, 600, 400);//绘制首图
  context.drawImage(qrcodeLoal, 210, 670, 180, 180);//绘制二维码
  //context.drawImage(that.data.logo, 350, 740, 130, 130);//画logo
  //const grd = context.createLinearGradient(30, 690, 570, 690)//定义一个线性渐变的颜色
  //grd.addColorStop(0, 'black')
  //grd.addColorStop(1, '#118fff')
  //context.setFillStyle(grd)
  context.setFillStyle("#959595");
  context.setFontSize(20);
  context.setTextAlign('center');
  context.fillText("长按二维码, 强势围观这条动弹！", 300, 900);
  //context.setStrokeStyle(grd)
  context.setFillStyle("#959595");
  // context.beginPath()//分割线
  // context.moveTo(30, 690)
  // context.lineTo(570, 690)
  // context.stroke();
  // this.setUserInfo(context);//用户信息        
  that.drawTitleExcerpt(context, title, excerpt);//文章标题
  context.draw();
  //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
  setTimeout(function () {
      wx.canvasToTempFilePath({
          canvasId: 'mycanvas',
          success: function (res) {
              var tempFilePath = res.tempFilePath;
              // that.setData({
              //     imagePath: tempFilePath,
              //     maskHidden: "none"
              // });
              wx.hideLoading();
              console.log("海报图片路径：" + res.tempFilePath); 
              successCallback(res.tempFilePath);

          },
          fail: function (res) {
            errorCallback(res);
          }
      });
  }, 900);
}   


//绘制文字：文章题目、摘要、扫码阅读
function drawTitleExcerpt(context, title, excerpt) {

  context.setFillStyle("#000000");
  context.setTextAlign('left');

  // if (getStrLength(title) <= 14) {
  //     //14字以内绘制成一行，美观一点
  //     context.setFontSize(40);
  //     context.fillText(title, 40, 460);
  // }
  // else {
  //     //题目字数很多的，只绘制前36个字（如果题目字数在15到18个字则也是一行，不怎么好看）
  //     context.setFontSize(30);
  //     context.fillText(title.substring(0, 19), 40, 460);
  //     //context.fillText(title.substring(19, 36), 40, 510);
  // }
  context.setFontSize(30);
  context.fillText(title, 40, 460);

  context.setFontSize(22);
  context.setTextAlign('left');
  context.setGlobalAlpha(0.7);    
  for (var i = 0; i <= excerpt.length; i += 24) {
      //摘要只绘制前160个字，这里是用截取字符串
      // if (getStrLength(excerpt)>160)
      // {
      //     if ( i == 160) {
      //         context.fillText(excerpt.substring(i, i + 24) + "...", 40, 520 + i * 2);
      //     }
      //     else {
      //         context.fillText(excerpt.substring(i, i + 24), 40, 520 + i * 2);
      //     }
      // }
      // else
      // {
        
      // }

      context.fillText(excerpt.substring(i, i + 24), 40, 510 + i * 1.6);


  }

  context.stroke();
  context.save();
}

function getStrLength(str){
  return str.replace(/[\u0391-\uFFE5]/g, "aa").length;
}

function stripTags(str) {
  return str.replace(/<[^>]+>/g, "");
}

module.exports = {
  formatTime: formatTime,
  jsTimeSince: timeSince, //替代方案，wxs版本在真机运行不成功，在乱弹页使用年月
  redirect: redirect,
  quoteSplit: quoteSplit,
  blogDateReplace: blogDateReplace,  
  clickLink: clickLink,  
  
  getTweetList: getTweetList,
  getTweetCommentList: getTweetCommentList,
  getBlogCommentList: getBlogCommentList,
  getHotTweetList: getHotTweetList,
  getUserBlogList: getUserBlogList,
  getBlogDetail: getBlogDetail,
  getTweetDetail: getTweetDetail,
  delHtmlTag: delHtmlTag,
  subWords: subWords,
  blockFilter: blockFilter,
  blockUser: blockUser,
  unbookmark: unbookmark,
  getAuthorInfo: getAuthorInfo,
  getUserTweetList: getUserTweetList,
  blockCommentFilter: blockCommentFilter,
  getTweetGirlsList: getTweetGirlsList,
  getOneJoke:getOneJoke,
  copyText:copyText,
  changeBarTabStyle: changeBarTabStyle,
  getWechatQRcode:getWechatQRcode,
  createPosterLocal:createPosterLocal,
  drawTitleExcerpt:drawTitleExcerpt,
  getStrLength:getStrLength,
  stripTags:stripTags  
}

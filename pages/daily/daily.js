// pages/daily/daily.js
//import tempObj from '../template/template'
var util = require('../../utils/util.js');
const xxbianid = 1428332;
const blogPerPage = 20;
var currentPage ;
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectlist: [],
    finishLoadList:false,
    currentTab:1,
    scrollTop:[0,0],
    tabTitles:['乱弹', '妹子图'],
    mmlist: [{ "title": "2019.03.29 周五", "pubdates": ["2019.04.05(\u4e2d\u56fd\u5927\u9646)"], "year": "2019", "images": { "small": "https://oscimg.oschina.net/oscnet/26fb4fc89a963d131eba38365c4c0a279d2.jpg!/sq/200", "large": "https://img3.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2550559970.jpg", "medium": "https://img3.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2550559970.jpg" }, "id": "26878827", "rating": { "max": 10, "average": 8.2 }, "stars": [1, 1, 1,1,0] }, 
    
    
    { "rating": { "max": 10, "average": 0, "details": { "1": 0, "3": 0, "2": 0, "5": 0, "4": 0 }, "stars": "00", "min": 0 },
    
    
     "genres": ["\u513f\u7ae5", "\u52a8\u4f5c", "\u5947\u5e7b"], "title": "\u6e90\u00b7\u5f69\u8679", "casts": [{ "avatars": { "small": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1372233667.16.jpg", "large": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1372233667.16.jpg", "medium": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1372233667.16.jpg" }, "name_en": "Willow Shields", "name": "\u8587\u6d1b\u00b7\u897f\u5c14\u5fb7\u65af", "alt": "https:\/\/movie.douban.com\/celebrity\/1318991\/", "id": "1318991" }, { "avatars": { "small": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p7401.jpg", "large": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p7401.jpg", "medium": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p7401.jpg" }, "name_en": "Maria Grazia Cucinotta", "name": "\u739b\u4e3d\u4e9a\u00b7\u683c\u62c9\u9f50\u4e9a\u00b7\u5e93\u5947\u8bfa\u5854", "alt": "https:\/\/movie.douban.com\/celebrity\/1022787\/", "id": "1022787" }, { "avatars": { "small": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1511246201.79.jpg", "large": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1511246201.79.jpg", "medium": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1511246201.79.jpg" }, "name_en": "Chelsie Preston Crayford", "name": "\u5207\u5c14\u897f\u00b7\u666e\u96f7\u65af\u987f\u00b7\u514b\u96f7\u798f\u5fb7", "alt": "https:\/\/movie.douban.com\/celebrity\/1384459\/", "id": "1384459" }], "durations": ["88\u5206\u949f"], "collect_count": 34, "mainland_pubdate": "2019-04-05", "has_video": false, "original_title": "Into the Rainbow", "subtype": "movie", "directors": [{ "avatars": { "small": "https://img1.doubanio.com\/f\/movie\/ca527386eb8c4e325611e22dfcb04cc116d6b423\/pics\/movie\/celebrity-default-small.png", "large": "https://img3.doubanio.com\/f\/movie\/63acc16ca6309ef191f0378faf793d1096a3e606\/pics\/movie\/celebrity-default-large.png", "medium": "https://img1.doubanio.com\/f\/movie\/8dd0c794499fe925ae2ae89ee30cd225750457b4\/pics\/movie\/celebrity-default-medium.png" }, "name_en": "Norman Stone", "name": "\u8bfa\u66fc\u00b7\u65af\u901a", "alt": "https:\/\/movie.douban.com\/celebrity\/1298498\/", "id": "1298498" }], "pubdates": ["2017-04-08(\u591a\u4f26\u591a\u513f\u7ae5\u7535\u5f71\u8282)", "2019-04-05(\u4e2d\u56fd\u5927\u9646)"], "year": "2017", "images": { "small": "https://img1.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2502989849.jpg", "large": "https://img1.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2502989849.jpg", "medium": "https://img1.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2502989849.jpg" }, "alt": "https:\/\/movie.douban.com\/subject\/20469905\/", "id": "20469905" }, { "rating": { "max": 10, "average": 0, "details": { "1": 0, "3": 0, "2": 0, "5": 0, "4": 0 }, "stars": "00", "min": 0 }, "genres": ["\u513f\u7ae5", "\u52a8\u753b", "\u5192\u9669"], "title": "\u529f\u592b\u56db\u4fa0\uff1a\u52c7\u95ef\u5730\u5bab", "casts": [{ "avatars": { "small": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1518344457.05.jpg", "large": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1518344457.05.jpg", "medium": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1518344457.05.jpg" }, "name_en": "Qi Wang", "name": "\u738b\u742a", "alt": "https:\/\/movie.douban.com\/celebrity\/1348778\/", "id": "1348778" }, { "avatars": { "small": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1470558117.44.jpg", "large": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1470558117.44.jpg", "medium": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1470558117.44.jpg" }, "name_en": "Xueqin Wang", "name": "\u738b\u96ea\u6c81", "alt": "https:\/\/movie.douban.com\/celebrity\/1348775\/", "id": "1348775" }, { "avatars": { "small": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1470557893.97.jpg", "large": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1470557893.97.jpg", "medium": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1470557893.97.jpg" }, "name_en": "Fan Wu", "name": "\u5434\u51e1", "alt": "https:\/\/movie.douban.com\/celebrity\/1360698\/", "id": "1360698" }], "durations": ["80\u5206\u949f"], "collect_count": 19, "mainland_pubdate": "2019-04-05", "has_video": false, "original_title": "\u529f\u592b\u56db\u4fa0\uff1a\u52c7\u95ef\u5730\u5bab", "subtype": "movie", "directors": [{ "avatars": { "small": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1518344540.18.jpg", "large": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1518344540.18.jpg", "medium": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1518344540.18.jpg" }, "name_en": "Jinbao Li", "name": "\u674e\u91d1\u4fdd", "alt": "https:\/\/movie.douban.com\/celebrity\/1359918\/", "id": "1359918" }], "pubdates": ["2019-04-05(\u4e2d\u56fd\u5927\u9646)"], "year": "2019", "images": { "small": "https://img3.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2550448960.jpg", "large": "https://img3.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2550448960.jpg", "medium": "https://img3.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2550448960.jpg" }, "alt": "https:\/\/movie.douban.com\/subject\/30145516\/", "id": "30145516" }, { "rating": { "max": 10, "average": 0, "details": { "1": 0, "3": 0, "2": 0, "5": 0, "4": 0 }, "stars": "00", "min": 0 }, "genres": ["\u559c\u5267", "\u52a8\u753b", "\u5192\u9669"], "title": "\u9752\u86d9\u738b\u5b50\u5386\u9669\u8bb0", "casts": [], "durations": [], "collect_count": 5, "mainland_pubdate": "2019-04-05", "has_video": false, "original_title": "\u9752\u86d9\u738b\u5b50\u5386\u9669\u8bb0", "subtype": "movie", "directors": [{ "avatars": { "small": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1505789251.02.jpg", "large": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1505789251.02.jpg", "medium": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1505789251.02.jpg" }, "name_en": "Yefeng Jiang", "name": "\u848b\u53f6\u5cf0", "alt": "https:\/\/movie.douban.com\/celebrity\/1361983\/", "id": "1361983" }], "pubdates": ["2019-04-05(\u4e2d\u56fd\u5927\u9646)"], "year": "2019", "images": { "small": "https://img3.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2551183233.jpg", "large": "https://img3.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2551183233.jpg", "medium": "https://img3.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2551183233.jpg" }, "alt": "https:\/\/movie.douban.com\/subject\/30288751\/", "id": "30288751" }, { "rating": { "max": 10, "average": 0, "details": { "1": 0, "3": 0, "2": 0, "5": 0, "4": 0 }, "stars": "00", "min": 0 }, "genres": ["\u5267\u60c5"], "title": "\u96be\u4ee5\u7f6e\u4fe1", "casts": [{ "avatars": { "small": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1552531752.22.jpg", "large": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1552531752.22.jpg", "medium": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1552531752.22.jpg" }, "name_en": "", "name": "\u5434\u8d85", "alt": "https:\/\/movie.douban.com\/celebrity\/1412761\/", "id": "1412761" }, { "avatars": { "small": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p57105.jpg", "large": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p57105.jpg", "medium": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p57105.jpg" }, "name_en": "Jialun Song", "name": "\u5b8b\u4f73\u4f26", "alt": "https:\/\/movie.douban.com\/celebrity\/1318018\/", "id": "1318018" }, { "avatars": { "small": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1553529755.62.jpg", "large": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1553529755.62.jpg", "medium": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1553529755.62.jpg" }, "name_en": "", "name": "\u5468\u4e5f", "alt": "https:\/\/movie.douban.com\/celebrity\/1412762\/", "id": "1412762" }], "durations": [], "collect_count": 157, "mainland_pubdate": "2019-04-11", "has_video": false, "original_title": "\u96be\u4ee5\u7f6e\u4fe1", "subtype": "movie", "directors": [{ "avatars": { "small": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1552386423.11.jpg", "large": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1552386423.11.jpg", "medium": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1552386423.11.jpg" }, "name_en": "Xiaoya Lu", "name": "\u9646\u5c0f\u96c5", "alt": "https:\/\/movie.douban.com\/celebrity\/1290397\/", "id": "1290397" }], "pubdates": ["2018-04-07(\u5317\u4eac\u7535\u5f71\u8282)", "2019-04-11(\u4e2d\u56fd\u5927\u9646)"], "year": "2018", "images": { "small": "https://img3.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2550531644.jpg", "large": "https://img3.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2550531644.jpg", "medium": "https://img3.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2550531644.jpg" }, "alt": "https:\/\/movie.douban.com\/subject\/27666591\/", "id": "27666591" }, { "rating": { "max": 10, "average": 0, "details": { "1": 0, "3": 0, "2": 0, "5": 0, "4": 0 }, "stars": "00", "min": 0 }, "genres": ["\u7231\u60c5"], "title": "\u5728\u4e4e\u4f60", "casts": [{ "avatars": { "small": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1364106535.09.jpg", "large": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1364106535.09.jpg", "medium": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1364106535.09.jpg" }, "name_en": "Faye Yu", "name": "\u4fde\u98de\u9e3f", "alt": "https:\/\/movie.douban.com\/celebrity\/1014618\/", "id": "1014618" }, { "avatars": { "small": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1364496491.17.jpg", "large": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1364496491.17.jpg", "medium": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1364496491.17.jpg" }, "name_en": "Takao \u00d4sawa", "name": "\u5927\u6cfd\u9686\u592b", "alt": "https:\/\/movie.douban.com\/celebrity\/1134773\/", "id": "1134773" }, { "avatars": { "small": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1529044556.91.jpg", "large": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1529044556.91.jpg", "medium": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1529044556.91.jpg" }, "name_en": "Ayane Kinoshita", "name": "\u6728\u4e0b\u5f69\u97f3", "alt": "https:\/\/movie.douban.com\/celebrity\/1395517\/", "id": "1395517" }], "durations": [], "collect_count": 57, "mainland_pubdate": "2019-04-12", "has_video": false, "original_title": "\u5728\u4e4e\u4f60", "subtype": "movie", "directors": [{ "avatars": { "small": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1355295036.29.jpg", "large": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1355295036.29.jpg", "medium": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1355295036.29.jpg" }, "name_en": "Kenneth Bi", "name": "\u6bd5\u56fd\u667a", "alt": "https:\/\/movie.douban.com\/celebrity\/1278580\/", "id": "1278580" }], "pubdates": ["2019-04-12(\u4e2d\u56fd\u5927\u9646)"], "year": "2019", "images": { "small": "https://img3.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2551164085.jpg", "large": "https://img3.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2551164085.jpg", "medium": "https://img3.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2551164085.jpg" }, "alt": "https:\/\/movie.douban.com\/subject\/27185558\/", "id": "27185558" }, { "rating": { "max": 10, "average": 0, "details": { "1": 0, "3": 0, "2": 0, "5": 0, "4": 0 }, "stars": "00", "min": 0 }, "genres": ["\u5267\u60c5", "\u559c\u5267"], "title": "\u6211\u7684\u5ba0\u7269\u662f\u5927\u8c61", "casts": [{ "avatars": { "small": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p844.jpg", "large": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p844.jpg", "medium": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p844.jpg" }, "name_en": "Sean Lau", "name": "\u5218\u9752\u4e91", "alt": "https:\/\/movie.douban.com\/celebrity\/1007251\/", "id": "1007251" }, { "avatars": { "small": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1540259770.09.jpg", "large": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1540259770.09.jpg", "medium": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1540259770.09.jpg" }, "name_en": "Jingru You", "name": "\u5c24\u9756\u8339", "alt": "https:\/\/movie.douban.com\/celebrity\/1343521\/", "id": "1343521" }, { "avatars": { "small": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p6449.jpg", "large": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p6449.jpg", "medium": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p6449.jpg" }, "name_en": "Wei Kong", "name": "\u5b54\u7ef4", "alt": "https:\/\/movie.douban.com\/celebrity\/1053125\/", "id": "1053125" }], "durations": ["108\u5206\u949f"], "collect_count": 45, "mainland_pubdate": "2019-04-12", "has_video": false, "original_title": "\u6211\u7684\u5ba0\u7269\u662f\u5927\u8c61", "subtype": "movie", "directors": [{ "avatars": { "small": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1533824828.55.jpg", "large": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1533824828.55.jpg", "medium": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1533824828.55.jpg" }, "name_en": "Xiaoli Shao", "name": "\u90b5\u6653\u9ece", "alt": "https:\/\/movie.douban.com\/celebrity\/1328976\/", "id": "1328976" }], "pubdates": ["2019-04-12(\u4e2d\u56fd\u5927\u9646)"], "year": "2019", "images": { "small": "https://img3.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2551418225.jpg", "large": "https://img3.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2551418225.jpg", "medium": "https://img3.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2551418225.jpg" }, "alt": "https:\/\/movie.douban.com\/subject\/26803717\/", "id": "26803717" }, { "rating": { "max": 10, "average": 0, "details": { "1": 0, "3": 0, "2": 0, "5": 0, "4": 0 }, "stars": "00", "min": 0 }, "genres": ["\u72af\u7f6a", "\u60ac\u7591"], "title": "\u79e6\u660e\u00b7\u751f\u6b7b\u8bed\u8005", "casts": [{ "avatars": { "small": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p34637.jpg", "large": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p34637.jpg", "medium": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p34637.jpg" }, "name_en": "Yikuan Yan", "name": "\u4e25\u5c79\u5bbd", "alt": "https:\/\/movie.douban.com\/celebrity\/1313653\/", "id": "1313653" }, { "avatars": { "small": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1518149545.97.jpg", "large": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1518149545.97.jpg", "medium": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1518149545.97.jpg" }, "name_en": "Daisy", "name": "\u4ee3\u65af", "alt": "https:\/\/movie.douban.com\/celebrity\/1361029\/", "id": "1361029" }, { "avatars": { "small": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1370503685.74.jpg", "large": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1370503685.74.jpg", "medium": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1370503685.74.jpg" }, "name_en": "Le Geng", "name": "\u803f\u4e50", "alt": "https:\/\/movie.douban.com\/celebrity\/1274576\/", "id": "1274576" }], "durations": [], "collect_count": 33, "mainland_pubdate": "2019-04-12", "has_video": false, "original_title": "\u79e6\u660e\u00b7\u751f\u6b7b\u8bed\u8005", "subtype": "movie", "directors": [{ "avatars": { "small": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p50186.jpg", "large": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p50186.jpg", "medium": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p50186.jpg" }, "name_en": "Haishu Li", "name": "\u674e\u6d77\u8700", "alt": "https:\/\/movie.douban.com\/celebrity\/1321164\/", "id": "1321164" }, { "avatars": { "small": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1503313132.91.jpg", "large": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1503313132.91.jpg", "medium": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1503313132.91.jpg" }, "name_en": "Yanwei Huang", "name": "\u9ec4\u5f66\u5a01", "alt": "https:\/\/movie.douban.com\/celebrity\/1321340\/", "id": "1321340" }], "pubdates": ["2019-04-12(\u4e2d\u56fd\u5927\u9646)"], "year": "2019", "images": { "small": "https://img3.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2549543630.jpg", "large": "https://img3.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2549543630.jpg", "medium": "https://img3.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2549543630.jpg" }, "alt": "https:\/\/movie.douban.com\/subject\/27090753\/", "id": "27090753" }, { "rating": { "max": 10, "average": 0, "details": { "1": 0, "3": 0, "2": 0, "5": 0, "4": 0 }, "stars": "00", "min": 0 }, "genres": ["\u5267\u60c5", "\u72af\u7f6a", "\u60ac\u7591"], "title": "\u6b32\u5ff5\u6e38\u620f", "casts": [{ "avatars": { "small": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1505398270.58.jpg", "large": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1505398270.58.jpg", "medium": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1505398270.58.jpg" }, "name_en": "Tao Guo", "name": "\u90ed\u6d9b", "alt": "https:\/\/movie.douban.com\/celebrity\/1274274\/", "id": "1274274" }, { "avatars": { "small": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1537164285.33.jpg", "large": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1537164285.33.jpg", "medium": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1537164285.33.jpg" }, "name_en": "Zifeng Zhang", "name": "\u5f20\u5b50\u67ab", "alt": "https:\/\/movie.douban.com\/celebrity\/1274254\/", "id": "1274254" }, { "avatars": { "small": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1376584616.33.jpg", "large": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1376584616.33.jpg", "medium": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1376584616.33.jpg" }, "name_en": "Chao Jiang", "name": "\u59dc\u6f6e", "alt": "https:\/\/movie.douban.com\/celebrity\/1312694\/", "id": "1312694" }], "durations": [], "collect_count": 5, "mainland_pubdate": "2019-04-12", "has_video": false, "original_title": "\u6b32\u5ff5\u6e38\u620f", "subtype": "movie", "directors": [{ "avatars": { "small": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1505398270.58.jpg", "large": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1505398270.58.jpg", "medium": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1505398270.58.jpg" }, "name_en": "Tao Guo", "name": "\u90ed\u6d9b", "alt": "https:\/\/movie.douban.com\/celebrity\/1274274\/", "id": "1274274" }], "pubdates": ["2019-04-12(\u4e2d\u56fd\u5927\u9646)"], "year": "2019", "images": { "small": "https://img3.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2551072052.jpg", "large": "https://img3.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2551072052.jpg", "medium": "https://img3.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2551072052.jpg" }, "alt": "https:\/\/movie.douban.com\/subject\/26850330\/", "id": "26850330" }, { "rating": { "max": 10, "average": 0, "details": { "1": 0, "3": 0, "2": 0, "5": 0, "4": 0 }, "stars": "00", "min": 0 }, "genres": ["\u60ac\u7591", "\u60ca\u609a"], "title": "\u539f\u6765\u5982\u6b64", "casts": [{ "avatars": null, "name_en": "", "name": "\u6c60\u4e39", "alt": null, "id": null }, { "avatars": null, "name_en": "", "name": "\u5f90\u5fd7\u98de", "alt": null, "id": null }, { "avatars": null, "name_en": "", "name": "\u6768\u71d5", "alt": null, "id": null }], "durations": ["83\u5206\u949f"], "collect_count": 43, "mainland_pubdate": "2019-04-12", "has_video": false, "original_title": "\u539f\u6765\u5982\u6b64", "subtype": "movie", "directors": [{ "avatars": null, "name_en": "", "name": "\u5ed6\u5fc5\u7fd4", "alt": null, "id": null }], "pubdates": ["2018-10-20(\u5e73\u9065\u56fd\u9645\u7535\u5f71\u8282)", "2019-04-12(\u4e2d\u56fd\u5927\u9646)"], "year": "2018", "images": { "small": "https://img1.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2546359739.jpg", "large": "https://img1.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2546359739.jpg", "medium": "https://img1.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2546359739.jpg" }, "alt": "https:\/\/movie.douban.com\/subject\/30345723\/", "id": "30345723" }, { "rating": { "max": 10, "average": 0, "details": { "1": 0, "3": 0, "2": 0, "5": 0, "4": 0 }, "stars": "00", "min": 0 }, "genres": ["\u559c\u5267", "\u7231\u60c5"], "title": "\u6700\u4f73\u7537\u53cb\u8fdb\u5316\u8bba", "casts": [{ "avatars": { "small": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1366015827.84.jpg", "large": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1366015827.84.jpg", "medium": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1366015827.84.jpg" }, "name_en": "Kai Zheng", "name": "\u90d1\u607a", "alt": "https:\/\/movie.douban.com\/celebrity\/1275564\/", "id": "1275564" }, { "avatars": { "small": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1510497293.38.jpg", "large": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1510497293.38.jpg", "medium": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1510497293.38.jpg" }, "name_en": "Yuqi  Zhang", "name": "\u5f20\u96e8\u7eee", "alt": "https:\/\/movie.douban.com\/celebrity\/1274494\/", "id": "1274494" }, { "avatars": { "small": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1521463768.66.jpg", "large": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1521463768.66.jpg", "medium": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1521463768.66.jpg" }, "name_en": "Dongdong Xu", "name": "\u5f90\u51ac\u51ac", "alt": "https:\/\/movie.douban.com\/celebrity\/1315463\/", "id": "1315463" }], "durations": ["90\u5206\u949f"], "collect_count": 10, "mainland_pubdate": "2019-04-12", "has_video": false, "original_title": "\u6700\u4f73\u7537\u53cb\u8fdb\u5316\u8bba", "subtype": "movie", "directors": [{ "avatars": { "small": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p33988.jpg", "large": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p33988.jpg", "medium": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p33988.jpg" }, "name_en": "Tze Chung Lam", "name": "\u6797\u5b50\u806a", "alt": "https:\/\/movie.douban.com\/celebrity\/1314402\/", "id": "1314402" }], "pubdates": ["2019-04-12(\u4e2d\u56fd\u5927\u9646)"], "year": "2019", "images": { "small": "https://img3.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2551908401.jpg", "large": "https://img3.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2551908401.jpg", "medium": "https://img3.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2551908401.jpg" }, "alt": "https:\/\/movie.douban.com\/subject\/26774017\/", "id": "26774017" }, { "rating": { "max": 10, "average": 0, "details": { "1": 0, "3": 0, "2": 0, "5": 0, "4": 0 }, "stars": "00", "min": 0 }, "genres": ["\u559c\u5267", "\u7231\u60c5", "\u5947\u5e7b"], "title": "\u83f2\u51e1\u8bb0\u5fc6", "casts": [{ "avatars": { "small": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1547700603.74.jpg", "large": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1547700603.74.jpg", "medium": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1547700603.74.jpg" }, "name_en": "", "name": "\u5f20\u5955", "alt": "https:\/\/movie.douban.com\/celebrity\/1409112\/", "id": "1409112" }, { "avatars": { "small": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p34429.jpg", "large": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p34429.jpg", "medium": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p34429.jpg" }, "name_en": "Jianfeng Bao", "name": "\u4fdd\u5251\u950b", "alt": "https:\/\/movie.douban.com\/celebrity\/1044611\/", "id": "1044611" }, { "avatars": { "small": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1526268656.92.jpg", "large": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1526268656.92.jpg", "medium": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1526268656.92.jpg" }, "name_en": "Jiaming Li", "name": "\u674e\u5609\u94ed", "alt": "https:\/\/movie.douban.com\/celebrity\/1392642\/", "id": "1392642" }], "durations": ["97\u5206\u949f"], "collect_count": 3, "mainland_pubdate": "2019-04-12", "has_video": false, "original_title": "\u83f2\u51e1\u8bb0\u5fc6", "subtype": "movie", "directors": [{ "avatars": { "small": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1479824414.48.jpg", "large": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1479824414.48.jpg", "medium": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1479824414.48.jpg" }, "name_en": "Zhong Tian", "name": "\u7530\u91cd", "alt": "https:\/\/movie.douban.com\/celebrity\/1365003\/", "id": "1365003" }], "pubdates": ["2019-04-12(\u4e2d\u56fd\u5927\u9646)"], "year": "2019", "images": { "small": "https://img1.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2551162358.jpg", "large": "https://img1.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2551162358.jpg", "medium": "https://img1.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2551162358.jpg" }, "alt": "https:\/\/movie.douban.com\/subject\/30450410\/", "id": "30450410" }, { "rating": { "max": 10, "average": 0, "details": { "1": 0, "3": 0, "2": 0, "5": 0, "4": 0 }, "stars": "00", "min": 0 }, "genres": ["\u5267\u60c5"], "title": "\u6697\u8bed\u8005", "casts": [{ "avatars": { "small": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1407300516.34.jpg", "large": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1407300516.34.jpg", "medium": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1407300516.34.jpg" }, "name_en": "Liqun Luo", "name": "\u7f57\u7acb\u7fa4", "alt": "https:\/\/movie.douban.com\/celebrity\/1340059\/", "id": "1340059" }, { "avatars": null, "name_en": "", "name": "\u9ad8\u8d6b\u4e00", "alt": null, "id": null }, { "avatars": null, "name_en": "", "name": "\u91d1\u7426\u8317", "alt": null, "id": null }], "durations": ["99\u5206\u949f"], "collect_count": 1, "mainland_pubdate": "2019-04-12", "has_video": false, "original_title": "\u6697\u8bed\u8005", "subtype": "movie", "directors": [{ "avatars": { "small": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p22201.jpg", "large": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p22201.jpg", "medium": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p22201.jpg" }, "name_en": "Wanfeng Han", "name": "\u97e9\u4e07\u5cf0", "alt": "https:\/\/movie.douban.com\/celebrity\/1312804\/", "id": "1312804" }], "pubdates": ["2018-11-09(\u91d1\u9e21\u767e\u82b1\u7535\u5f71\u8282)", "2019-04-12(\u4e2d\u56fd\u5927\u9646)"], "year": "2018", "images": { "small": "https://img1.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2535203209.jpg", "large": "https://img1.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2535203209.jpg", "medium": "https://img1.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2535203209.jpg" }, "alt": "https:\/\/movie.douban.com\/subject\/30335687\/", "id": "30335687" }, { "rating": { "max": 10, "average": 0, "details": { "1": 0, "3": 0, "2": 0, "5": 0, "4": 0 }, "stars": "00", "min": 0 }, "genres": ["\u559c\u5267", "\u52a8\u753b", "\u5192\u9669"], "title": "\u866b\u6797\u5927\u4f5c\u6218", "casts": [{ "avatars": { "small": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1368949491.29.jpg", "large": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1368949491.29.jpg", "medium": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1368949491.29.jpg" }, "name_en": "Justin Long", "name": "\u8d3e\u65af\u6c40\u00b7\u6717", "alt": "https:\/\/movie.douban.com\/celebrity\/1017904\/", "id": "1017904" }, { "avatars": { "small": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1459858599.17.jpg", "large": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1459858599.17.jpg", "medium": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1459858599.17.jpg" }, "name_en": "Kev Adams", "name": "\u51ef\u6587\u00b7\u4e9a\u5f53\u65af", "alt": "https:\/\/movie.douban.com\/celebrity\/1356429\/", "id": "1356429" }, { "avatars": { "small": "https://img1.doubanio.com\/f\/movie\/ca527386eb8c4e325611e22dfcb04cc116d6b423\/pics\/movie\/celebrity-default-small.png", "large": "https://img3.doubanio.com\/f\/movie\/63acc16ca6309ef191f0378faf793d1096a3e606\/pics\/movie\/celebrity-default-large.png", "medium": "https://img1.doubanio.com\/f\/movie\/8dd0c794499fe925ae2ae89ee30cd225750457b4\/pics\/movie\/celebrity-default-medium.png" }, "name_en": "Marie-Charlotte Leclaire", "name": "\u739b\u4e3d-\u590f\u6d1b\u7279\u00b7\u52d2\u514b\u83b1\u5c14", "alt": "https:\/\/movie.douban.com\/celebrity\/1406443\/", "id": "1406443" }], "durations": ["84\u5206\u949f"], "collect_count": 32, "mainland_pubdate": "2019-04-13", "has_video": false, "original_title": "Dr\u00f4les de petites b\u00eates", "subtype": "movie", "directors": [{ "avatars": null, "name_en": "", "name": "Arnaud Bouron", "alt": null, "id": null }, { "avatars": null, "name_en": "", "name": "Antoon Krings", "alt": null, "id": null }], "pubdates": ["2017-06-14(\u5b89\u9521\u52a8\u753b\u8282)", "2017-12-13(\u6cd5\u56fd)", "2019-04-13(\u4e2d\u56fd\u5927\u9646)"], "year": "2017", "images": { "small": "https://img3.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2550873121.jpg", "large": "https://img3.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2550873121.jpg", "medium": "https://img3.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2550873121.jpg" }, "alt": "https:\/\/movie.douban.com\/subject\/27059060\/", "id": "27059060" }, { "rating": { "max": 10, "average": 7.9, "details": { "1": 23.0, "3": 1592.0, "2": 105.0, "5": 1423.0, "4": 3045.0 }, "stars": "40", "min": 0 }, "genres": ["\u5267\u60c5", "\u72af\u7f6a", "\u60ac\u7591"], "title": "\u5df4\u6bd4\u9f99", "casts": [{ "avatars": { "small": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1415795056.08.jpg", "large": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1415795056.08.jpg", "medium": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1415795056.08.jpg" }, "name_en": "Charlie Hunnam", "name": "\u67e5\u7406\u00b7\u6c49\u7eb3\u59c6", "alt": "https:\/\/movie.douban.com\/celebrity\/1000024\/", "id": "1000024" }, { "avatars": { "small": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1860.jpg", "large": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1860.jpg", "medium": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1860.jpg" }, "name_en": "Rami Malek", "name": "\u62c9\u7c73\u00b7\u9a6c\u96f7\u514b", "alt": "https:\/\/movie.douban.com\/celebrity\/1044903\/", "id": "1044903" }, { "avatars": { "small": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p4770.jpg", "large": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p4770.jpg", "medium": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p4770.jpg" }, "name_en": "Tommy Flanagan", "name": "\u6c64\u7c73\u00b7\u5f17\u62c9\u7eb3\u6839", "alt": "https:\/\/movie.douban.com\/celebrity\/1081424\/", "id": "1081424" }], "durations": ["133\u5206\u949f"], "collect_count": 8686, "mainland_pubdate": "2019-04-19", "has_video": false, "original_title": "Papillon", "subtype": "movie", "directors": [{ "avatars": { "small": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1502196986.05.jpg", "large": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1502196986.05.jpg", "medium": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1502196986.05.jpg" }, "name_en": "Michael Noer", "name": "\u8fc8\u514b\u5c14\u00b7\u8bfa\u5c14", "alt": "https:\/\/movie.douban.com\/celebrity\/1328562\/", "id": "1328562" }], "pubdates": ["2017-09-07(\u591a\u4f26\u591a\u7535\u5f71\u8282)", "2018-08-24(\u7f8e\u56fd)", "2019-04-19(\u4e2d\u56fd\u5927\u9646)"], "year": "2017", "images": { "small": "https://img3.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2539543895.jpg", "large": "https://img3.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2539543895.jpg", "medium": "https://img3.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2539543895.jpg" }, "alt": "https:\/\/movie.douban.com\/subject\/26636537\/", "id": "26636537" }]
  },
  clickLink: util.clickLink,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    currentPage = 1;
    var that = this;
    //app.loading();
    util.getUserBlogList(xxbianid, currentPage, blogPerPage, function (data) { //成功
      

      if (data.projectlist) {
        
        var pubDates = [];
        for (let i = 0; i < data.projectlist.length; i++) {
          //真机时 util.timeSince总是NAN....

          data.projectlist[i].pubDate = util.blogDateReplace(data.projectlist[i].pubDate).replace(/\d{2}\:\d{2}\:\d{2}/g,"")

          
                              
        }
        currentPage++;
        that.setData({ projectlist: data.projectlist, pubDates: pubDates })
      }



    }, function (event) {//完成
      //wx.hideLoading()
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
    return false;
    wx.reLaunch({
      url: 'daily',
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    var that = this;
    if (that.data.finishLoadList) {
      return;
    }
    
    if(that.data.currentTab == 1) {
      console.log('加载妹子图')
      return;
    }


    util.getUserBlogList(xxbianid, currentPage, blogPerPage, function (data) { //成功


      if (data.projectlist) {

        var pubDates = [];
        for (let i = 0; i < data.projectlist.length; i++) {
          //真机时 util.timeSince总是NAN....

          data.projectlist[i].pubDate = util.blogDateReplace(data.projectlist[i].pubDate).replace(/\d{2}\:\d{2}\:\d{2}/g, "")



        }
                
        var blogsData = that.data.projectlist.concat(data.projectlist);        
        that.setData({ projectlist: blogsData})

        if (data.projectlist.length < blogPerPage) {
          that.setData({ finishLoadList: true })          

        }else{
          currentPage++;
        }

      }



    }, function (event) {//完成
      wx.hideLoading()
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
    console.log(that.data.scrollTop[e.target.dataset.current]);
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
    console.log(e)
    var that = this;
    if (e.scrollTop != 0) {

      var scrollTop = that.data.scrollTop;
      scrollTop[that.data.currentTab] = e.scrollTop;
      that.setData({ scrollTop: scrollTop })
      console.log(that.data.scrollTop)

    }


  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
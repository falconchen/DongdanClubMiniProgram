
var modalSubmit = function (event) {
  //console.log(event.currentTarget.dataset.url)

  this.setData({
    showModal: true, bigImg: event.currentTarget.dataset.src
  })
}

var preventTouchMove= function () {

}


var closeImgModal = function (event) {
  this.setData({
    showModal: false, imgHeight: 'auto', imgTop: '300rpx', imgLoaded: false
  })
}

var bigImgLoaded = function(event) {
  var sysinfo = wx.getSystemInfoSync();

  var windowHeighRpx = (750 / sysinfo.windowWidth) * sysinfo.windowHeight; // rpx

  var that = this;
  var detail = event.detail

  if ((detail.height / detail.width) > (windowHeighRpx/650) ) {
    that.setData({
      imgHeight: windowHeighRpx+'rpx',
      imgTop: 0,
      imgLoaded: true
    })
  } else {
    var imgHeight = (650 * detail.height / detail.width)
    that.setData({
      imgHeight: imgHeight + 'rpx',
      imgTop: (windowHeighRpx - imgHeight) / 2 + 'rpx',
      imgLoaded: true
    })
  }
}

var previewImg = function (e) {

  var current = e.target.dataset;  
  var urls = (typeof current.srcs != 'undefined') ? current.srcs.split(' ') : [current.src]
  
  wx.previewImage({
    current: current.src,
    urls: urls
    //urls: [current.src]
  })
}  



module.exports = {
  modalSubmit: modalSubmit,
  preventTouchMove: preventTouchMove,
  closeImgModal: closeImgModal,
  bigImgLoaded: bigImgLoaded,
  previewImg: previewImg 
}
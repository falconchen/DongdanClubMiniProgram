
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

  var that = this;
  var detail = event.detail

  if ((detail.height / detail.width) > 1.83) {
    that.setData({
      imgHeight: '1100rpx',
      imgTop: 0,
      imgLoaded: true
    })
  } else {
    var imgHeight = (600 * detail.height / detail.width)
    that.setData({
      imgHeight: imgHeight + 'rpx',
      imgTop: (1100 - imgHeight) / 2 + 'rpx',
      imgLoaded: true
    })
  }
}

module.exports = {
  modalSubmit: modalSubmit,
  preventTouchMove: preventTouchMove,
  closeImgModal: closeImgModal,
  bigImgLoaded: bigImgLoaded
}
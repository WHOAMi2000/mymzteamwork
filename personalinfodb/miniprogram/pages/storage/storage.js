//创建云对象的引用变量
var cloud = wx.cloud;

// pages/storage/storage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 6, //设置最多6张图片 
    allImg: [], 
    imgShow: [],
  },
  // 上传图片 
  chooseImage: function() 
  { 
    wx.showLoading({ title: '加载中...', mask: true })
    var that = this; 
    var imgShow = that.data.imgShow; 
    var count = that.data.count - imgShow.length; 
    //设置最多6张图片
    wx.chooseImage({ count: count, sizeType: ['compressed'], 
    sourceType: ['album', 'camera'], 
    success: function(res) { 
      console.log(res) 
      that.uplaodFile(res) 
      for (var i = 0, h = res.tempFilePaths.length; i < h; i++) 
      { 
        imgShow.push(res.tempFilePaths[i]);
        that.setData({ imgShow: imgShow }) 
      }
    wx.hideLoading({ title: '加载中...', mask: false })}})
  },
  deleteImage(e) 
  { 
    let self = this; 
    let index = e.target.dataset.index; 
    let imgShow = self.data.imgShow; 
    let allImg = self.data.allImg; 
    allImg.splice(index, 1); 
    imgShow.splice(index, 1);
    this.setData({ 
      imgShow: imgShow, 
      allImg: allImg 
    })
  },
    previewImage: function(e) 
  { 
    console.log(this.data.files) 
    wx.previewImage({ 
      current: e.currentTarget.id, 
      // 当前显示图片的http链接 
      urls: this.data.files 
      // 需要预览的图片http链接列表 
    })
  },
  selectFile(files) 
  { 
    console.log('files', files) 
    // 返回false可以阻止某次文件上传 
  },
  uplaodFile(files) 
  { 
    console.log('upload files', files) 
    let that = this 
    files.tempFilePaths.forEach(element => { 
      util.uploadFile('/fastdfsServer/fileUpload', 
      element, 
      'file', 
      {}, 
      function(res) 
      { 
        //上传本地图片地址到服务器 返回地址 存放到input提交时取值 
        res = JSON.parse(res); 
        if (res.responseCode == 0) 
        { 
          sysMsg.sysMsg("上传成功", 1000, 'success'); 
          that.setData({ allImg: that.data.allImg.concat(res.responseBody) }); 
        } 
        else 
        { 
          sysMsg.sysMsg("上传失败", 1500, 'error'); 
        }
      }
      ); 
    });
    // 文件上传的函数，返回一个promise 
    return new Promise((resolve, reject) => { 
      resolve({ urls: files.tempFilePaths }); 
      setTimeout(() => { reject('some error') }, 10000) 
    })
  },
    uploadError(e) 
    { 
      console.log('upload error', e.detail) 
    },
    uploadSuccess(e) 
    { 
      // this.setData({ 
      // allImg: this.data.allImg.concat(e.detail.urls[0]) 
      // }); 
      console.log('upload success', e.detail, e.detail.urls) 
    },
  downloadFile:function(){
    //下载
    var page = this;
    console.log(page.data.fileID)
    cloud.downloadFile({
      fileID:page.data.fileID
    }).then(res=>{
      console.log(res);
      page.setData({
        downloadInfo:res.errMsg,
        imgUrl:res.tempFilePath
      });
    }).catch(res=>{
      console.log(res)
    });
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

  }
})
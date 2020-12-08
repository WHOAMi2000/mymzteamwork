//cloud:云对象


Page({
  /**
   * 页面的初始数据
   */
  data: {
   userid:"",
   avatarurl:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    const db =wx.cloud.database();
    const users = db.collection("users");
    var userid = wx.getStorageSync('userid');
    console.log(userid);
    users.where({userid:userid}).get({
      success: res => {
        this.setData({
          user: res.data[0],
        })
        console.log(user)
      }
    })
  },
  //更改头像图片上传并更新数据库
  changeavatar: function(e) {
    const db = wx.cloud.database();
    const users = db.collection("users");
    var userid = wx.getStorageSync('userid');//登陆状态可以保持 此处的userid就是登陆时使用的userid


    users.where({userid:userid}).get({
      success: res => {
        this.setData({
          user: res.data[0],
        })
        console.log(user)
      }
    })

    wx.chooseImage({
      success: res => {
        var path = res.tempFilePaths[0]
        var suffix = path.split('.')[path.split('.').length - 1]
        
        wx.cloud.uploadFile({
          cloudPath: `avatar/${userid}.${suffix}`,
          filePath: path,
          success: res => {
            this.setData({
              "user.photourl": res.fileID//res.fileID就是该图片的云存储路径
            });
            console.log(res.fileID);
            wx.cloud.callFunction({
              name: 'photoupload',//云函数名称为photoupload
              data :
              {
                userid : userid,
                photourl : res.fileID
              },
              success : res=>{
                console.log("uploadphoto success")
              }
            })
          }
        })
      },
    })
  },
  changelabel: function(e) {
  },
  changepics: function(e) {
  },
  changeintroduction: function(e) {
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
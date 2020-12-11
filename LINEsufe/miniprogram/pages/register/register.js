// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value1: '',
    value2: '',
    value3: '',
    count:0
  },
  
  onRegister: function(e) {
    var page = this;
    const db = wx.cloud.database();
    const users = db.collection("users");
    var userid = e.detail.value.userid;
    var password1 = e.detail.value.password1;
    var password2 = e.detail.value.password2;

    users.where({
      userid: userid
    }).get().then(res => {
      if (res.data.length) {
        wx.showModal({
          title: "提示",
          content: "用户名已被占用，请重新起名"
        })
      } else{
        if (userid.search(/[\W]/) >=0 || userid.length <= 4) {
          wx.showModal({
            titel: "提示",
            content: "用户名必须是4位以上数字或字母的组合"
          })
        } else if (password1 != password2) {
          wx.showModal({
            titel: "提示",
            content: "两次密码不一致"
          })
        } else if (password1.length < 6) {
          wx.showModal({
            titel: "提示",
            content: "请输入6位及以上密码"
          })
        } else if ((password1.search(/[a-z]/) == -1 & password1.search(/[A-Z]/) == -1 )|| password1.search(/\d/) == -1) {
          wx.showModal({
            titel: "提示",
            content: "密码必须同时包含字母和数字"
          })
        } else {
          var count = 0
          users.get({
            success:res=>{
              var reset = res.data
              page.setData({count : reset.length+10001})
              console.log(reset.length);
            }
          })
          var lianjiefu = "%"
          users.add({
            data: {
              userid: userid,
              password: password1,
              id:count,
              LoginCheck: userid+lianjiefu+password1,
              BriefIntroduction:'',
              SelfIntroduction:'',
              friends:[],
              looked:[],
              looking:[],
              name:'',
              photourl:'',
              picurl:[],
              sex:true,
              tags:[]
            }
          })
          wx.showModal({
            titel: "提示",
            content: "注册成功!请登录",
            duration:3000,
            success(res){
              wx.redirectTo({
                url: '../login/login',
              })
            }
          });
          
        }
      }
    }) 
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
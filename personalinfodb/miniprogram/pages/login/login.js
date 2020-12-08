// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_name : "",
    password : "",
    userid : ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  /*
  addusers:function(){
    const db = wx.cloud.database();
    const users = db.collection("users");
    users.add({
          data:{
            id:10006,//我们分配的id
            name:'谭松韵',//用户名
            sex:false,//性别
            SelfIntroduction:'2001年，进入四川省舞蹈学校学习古典舞和民间舞。2005年，因拍摄电视剧《好好过日子》而接触表演。2007年考入北京电影学院表演系。2012年，因在清宫剧《后宫·甄嬛传》中扮演淳贵人一角而受到关注。2016年，凭借网络剧《最好的我们》获得爱奇艺尖叫之夜年度最具潜力演员；同年，她参演的爱情电影《微微一笑很倾城》上映。',//长自我介绍
            BriefItroduction:'中国内地影视女演员',//短自我介绍
            tags:[
               '松松','喜欢美食','舞蹈'
            ],//标签
            looked:[
              10001,10003
            ],
           looking:[
              10001,10004,1005
            ],
            friends:[
              10001
            ],//好友
            userid:'tsy1111',
            password:'123456',
            LoginCheck:'tsy1111%123456',//用户自己设置的id+%+密码
            photourl:'cloud://linesufe-1gzbdtjoc498b7c3.6c69-linesufe-1gzbdtjoc498b7c3-1304232581/01.jpg',
            //这个就是用户上传头像后获得的路径
            picurl:[
              'cloud://linesufe-1gzbdtjoc498b7c3.6c69-linesufe-1gzbdtjoc498b7c3-1304232581/10001_pic1.jpg',
              'cloud://linesufe-1gzbdtjoc498b7c3.6c69-linesufe-1gzbdtjoc498b7c3-1304232581/10001_pic2.jpg',
              'cloud://linesufe-1gzbdtjoc498b7c3.6c69-linesufe-1gzbdtjoc498b7c3-1304232581/10001_pic3.jpg'
            ]
            //用户的照片
          }
      })
      .then(res=>{
          console.log(res)
      })
      },
    */
  onLogin: function(e) {

    const db = wx.cloud.database();
    const users = db.collection("users");
    var userid = e.detail.value.userid;
    var password = e.detail.value.password;

    users.where({
      userid: userid,
      password: password
    }).get().then(res => {
      if (res.data.length) {
        wx.setStorageSync('userid', userid); //将userid存入本地缓存
        wx.showModal({
          title: "提示",
          content: "登陆成功"
        })
        wx.redirectTo({
          url: '../../pages/profile/profile',
        })
      } else {
        wx.showModal({
          title: "提示",
          content: "用户名不存在或密码错误"
        })
        
      }
    })

  },
  turntoregister:function(){
    wx.redirectTo({
      url: '../../pages/register/register',
    })
  },
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
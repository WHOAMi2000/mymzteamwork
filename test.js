//创建数据库云对象
const db = wx.cloud.database()
const _ = db.command

// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    id2:"",
    direction:'',
    text:"",
    time:{},
    Message:[],
    Message_nums:0
  },

  getdata:function(){
    db.collection('Chatting').where({
      id1:'10000',
      id2:'10001',
      direction:'1'
    }).get({
      success:res=>{
        var reset = res.data;
        console.log(reset);
        this.setData({
          direction:reset[0].direction,
          text:reset[0].text
        });
      }
    });
    var t = require ( '../../time.js' ); 
    var time = t .formatTime ( new Date ()); 
    this .setData ({
      time : time
      }); 
  },

  adddata:function(){
    var t = require ( '../../time.js' ); 
    var time = t .formatTime ( new Date ()); 
    db.collection('Chatting').add({
      data: {
        direction:'0',
        id: '10000',
        id2:'10001',
        text:'这是第十二条测试消息',
        time:time
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        wx.showToast({
          title: '新增记录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },

  onPullDownRefresh: function () {

    let x = this.data.Message_nums + 5
    console.log(x)
    let old_data = this.data.Message
    db.collection('Chatting').orderBy('time','desc').skip(x) // 限制返回数量为 20 条
      .get()
      .then(res => {
      
      // 利用concat函数连接新数据与旧数据
      // 并更新emial_nums  
        this.setData({
          Message: old_data.concat(res.data),
          Message_nums: x
        })
        console.log(res.data)
      })
      .catch(err => {
        console.error(err)
      })
    
    wx.stopPullDownRefresh();
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
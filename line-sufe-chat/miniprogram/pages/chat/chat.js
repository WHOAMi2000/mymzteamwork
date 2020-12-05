// pages/chat/chat.js
const db = wx.cloud.database()
const app = getApp();
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;
var idMe = "";
var idYou = "";
var idsmall = "";
var idlarge = "";
var thisdirection = "";
var inputVal = "";
var Message = [];

const formatTime = date => {
    const year = date .getFullYear ()
    const month = date .getMonth () + 1
    const day = date .getDate ()
    const hour = date .getHours ()
    const minute = date .getMinutes ()
    const second = date .getSeconds ()
    
    return [year , month , day ].map (formatNumber ).join ( '-' ) + ' ' + [hour , minute , second ].map (formatNumber ).join ( ':' )
    }
    
    const formatNumber = n => {
    n = n .toString ()
    return n [ 1 ] ? n : '0' + n
    }
    
    module .exports = {
    formatTime : formatTime
    } 
function initData(that) {
  for(var i = Message.length-1; i >= 0; i--){
    var temp = '';
    if(Message[i].direction == thisdirection){
      temp = 'me';
    }else{
      temp = 'you';
    }
    console.log(temp);
    msgList.push({
      speaker: temp,
      contentType: 'text',
      content: Message[i].text
    })
  }
  console.log(msgList);
  that.setData({
    msgList,
    inputVal
  })
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: '91vh',
    inputBottom: 0,
    Message_nums : 0
  },

  bindKeyInput:function(e){
    inputVal = e.detail.value;
  },

  submitTo:function(){
    if(inputVal != null)
    {
      var time = formatTime ( new Date ()); 
      console.log(thisdirection);
      db.collection('Chatting').add({
        data: {
          direction: thisdirection,
          id: idsmall,
          id2: idlarge,
          text: inputVal,
          time: time
        },
        success: res => {
          // 在返回结果中会包含新创建的记录的 _id
          console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        },
        fail: err => {
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })
      msgList.push({
        speaker: 'me',
        contentType: 'text',
        content: inputVal
      })
      this.setData({
        msgList,
        toView: 'msg-' + (msgList.length - 1)
      })
      inputVal = '';
      console.log('success');
      this.setData({
        inputVal
      })
      console.log("清空", inputVal);
    }
  },

  focus: function(e) {
    keyHeight = e.detail.height;
    this.setData({
      scrollHeight: (windowHeight - keyHeight - 41) + 'px'
    });
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: keyHeight + 'px'
    })
    //计算msg高度
    // calScrollHeight(this, keyHeight);

  },

  //失去聚焦(软键盘消失)
  blur: function(e) {
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //var id1 = options.id1;
    //var id2 = option.id2;
    var id1 = '10002';
    var id2 = '10001';
    idMe = id1;
    idYou = id2;
    if(parseInt(idMe) > parseInt(idYou))
      {
        thisdirection = '1';
        idlarge = idMe;
        idsmall = idYou;      
      }else{
        thisdirection = '0';
        idlarge = idYou;
        idsmall = idMe;
      }

    let old_data = Message;
    let x = 0;
    db.collection('Chatting').where({
        id:idsmall,
        id2:idlarge
      }).orderBy('time','desc') // 限制返回数量为 20 条
      .get()
      .then(res => {
      
      // 利用concat函数连接新数据与旧数据
      // 并更新Message_nums  
        x = old_data.concat(res.data).length;
        Message = old_data.concat(res.data);
        this.setData({
          Message_nums: x
        })
        console.log(res.data);
        console.log(Message.length);
        console.log(x);
        initData(this);
        this.setData({
          toView: 'msg-' + (msgList.length - 1)
        })
      })
      .catch(err => {
        console.error(err)
      })
      var otherdirection = String(1 - parseInt(thisdirection));
      console.log(otherdirection);
      db.collection('Chatting').where({
        id: idsmall,
        id2: idlarge,
        direction: otherdirection
      }).watch({
        onChange:res=>{
          console.log(res);
        },
        onError:function(e){
          console.log(e);
        }
      })
      wx.stopPullDownRefresh();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {

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
  refresh: function (e) {
    wx.showNavigationBarLoading();
    console.log('success');
    let old_data = Message;
    let x = Message.length;
    db.collection('Chatting').where({
      id:idsmall,
      id2:idlarge
    }).orderBy('time','desc').skip(x) // 限制返回数量为 20 条
    .get()
    .then(res => {
          
      // 利用concat函数连接新数据与旧数据
      // 并更新emial_nums  
      Message = old_data+res.data.reverse();
      x = Message.length;
      console.log(Message)
      for(var i = res.data.length-1; i >= 0 ; i--){
        var temp = '';
        if(res.data[i].direction == thisdirection){
          temp = 'me';
        }else{
          temp = 'you';
        }
        console.log(temp);
        msgList.unshift({
          speaker: temp,
          contentType: 'text',
          content: res.data[i].text
        })
      }
      console.log(msgList);
      this.setData({
        msgList,
        inputVal
      })
      this.setData({
        toView: 'msg-' + 0
      })
    })
     .catch(err => {
       console.error(err)
     })
    wx.hideNavigationBarLoading();   
    wx.stopPullDownRefresh();
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

  },

  /**
   * 退回上一页
   */
  toBackClick: function() {
    wx.navigateBack({})
  }
})
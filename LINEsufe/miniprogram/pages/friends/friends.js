// pages/friends/friends.js
const db = wx.cloud.database()
var record = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    friendlist:[]
    
  },

  getfriends:function(){
        wx.setStorageSync('id', 10001);
    var userid = wx.getStorageSync('id');//获取用户id
        var friends = [];
        db.collection('users').where({id:userid}).get().then(res=>{
          friends = res.data[0].friends;
          for(var i = 0;i<friends.length;i++){
            var friendid = friends[i];
            db.collection('users').where({id:friendid}).get().then(r=>{
              var name = r.data[0].name;
              var pic = r.data[0].photourl;
              var id = r.data[0].id;
              var idlarge = '';
              var idsmall = '';
              if(id > userid)
                {
                  idlarge = id.toString();
                  idsmall = userid.toString();      
                }else{
                  idlarge = userid.toString();
                  idsmall = id.toString();
                }
              db.collection('Chatting').where({
                id: idsmall,
                id2: idlarge
              }).orderBy('time','desc').get().then(rm=>{
                var message = "";
                var time = "";
                if(rm.data.length != 0){
                  if(rm.data[0].text.length <= 20){
                    message = rm.data[0].text;
                  }else{
                    message = rm.data[0].text.substring(0,20)+"...";
                  }
                  time = rm.data[0].time.substring(5,rm.data[0].time.length-3);
                }
                var friend = {
                  id:id,
                  name:name,
                  photo:pic,
                  message:message,
                  time:time
                };
                  var list = this.data.friendlist;
                  list.push(friend);
                  this.setData({
                  friendlist:list
                  });
              })
            });
          }
        });
    var that = this;
    db.collection('Chatting').orderBy('time','desc').limit(1)
    .where({
      id: userid
    }).watch({
      onChange: function(res) {
        console.log('success');
        if(record != 0){
          var friends = that.data.friendlist;
          for(var i = 0; i < friends.length; i++){
            console.log(res);
            if(friends[i].id.toString() == res.docChanges[0].doc.id2){
              friends[i].message = res.docChanges[0].doc.text;
              friends[i].time = res.docChanges[0].doc.time;
            }
          }
          that.setData({
            friendlist: friends
          })
          record++;
        }
      },
      onError: function(err) {
        
      }
    })
    db.collection('Chatting').orderBy('time','desc').limit(1)
    .where({
      id2: userid
    }).watch({
      onChange: function(res) {
        console.log('success');
        if(record != 0){
          var friends = that.data.friendlist;
          for(var i = 0; i < friends.length; i++){
            console.log(res);
            if(friends[i].id.toString() == res.docChanges[0].doc.id){
              friends[i].message = res.docChanges[0].doc.text;
              friends[i].time = res.docChanges[0].doc.time;
            }
          }
          that.setData({
            friendlist: friends
          })
          record++;
        }
      },
      onError: function(err) {
        
      }
    })
  },


  onTapNavigateTo(e) {
    //console.log(e)
    let id1 = wx.getStorageSync('id');
    let id2= e.currentTarget.dataset.id;

    //console.log(id, e)

    wx.navigateTo({
      url: '/pages/chat/chat?id1=' + id1 + "&id2=" + id2,
    })
  },
    



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getfriends()
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
    this.onLoad()
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
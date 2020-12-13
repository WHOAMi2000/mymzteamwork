// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    brief_introduction:'',
    looked:[{}],
    looking:[{}],
    tags:[],
    photos:'',
    self_introduction:'',
    userid:0,
    url:[],
    tags_color:['red','blue','green'],
    sex:true
  },
  unique:function(arr){            
      for(var i=0; i<arr.length; i++){
          for(var j=i+1; j<arr.length; j++){
              if(arr[i].id==arr[j].id){         //第一个等同于第二个，splice方法删除第二个
                  arr.splice(j,1);
                  j--;
              }
          }
      }
  return arr;
  },

  // SetMydata:function(userid) {
  //   // wx.setStorageSync('id', 10002);
  //   // var userid = wx.getStorageSync('id');//获取用户id
  //   // console.log(userid)
  //   var that = this;
  //   console.log(userid)
  //   const db = wx.cloud.database();
  //   db.collection('users').where({id:parseInt(userid)}).get().then(res=>{
  //     console.log(res)

  //     that.setData({
  //       name:res.data[0].name,
  //       brief_introduction:res.data[0].BriefIntroduction,
  //       tags:res.data[0].tags,
  //       photos:res.data[0].photourl,
  //       self_introduction:res.data[0].SelfIntroduction,
  //       userid:res.data[0].id,
  //       url:res.data[0].picurl,
  //     })

  //     var lookedid = res.data[0].looked;
  //     var lookingid = res.data[0].looking;
  //     var info = {id:0,name:'',brief:''};
  //     var dinfo = [];
  //     var ginfo = [];
  //     for(var i=0;i<lookedid.length;i++){
  //       let temp_id = lookedid[i];
  //       db.collection('users').where({id:temp_id}).get().then(r=>{
  //         info['id'] = r.data[0].id;
  //         info['name'] = r.data[0].name;
  //         info['brief'] = r.data[0].BriefIntroduction;
  //         dinfo.push(info);
  //         dinfo = this.unique(dinfo)
  //         // console.log(dinfo)
  //         that.setData({looked:dinfo})
  //         info = {id:0,name:'',brief:''};
  //       })
  //     }
  //     for(var i=0;i<lookingid.length;i++){
  //       var id = lookingid[i];
  //       db.collection('users').where({id:id}).get().then(s=>{
  //         info['id'] = s.data[0].id;
  //         info['name'] = s.data[0].name;
  //         info['brief'] = s.data[0].BriefIntroduction;
  //         ginfo.push(info);
  //         ginfo = this.unique(ginfo)
  //         that.setData({looking:ginfo})
  //         info = {id:0,name:'',brief:''};
  //       })
  //     }

  //     // console.log(that.data);
  //   });
  // },
  
  SetMydata:function(userid) {
    var that = this;
    const db = wx.cloud.database();
    db.collection('users').where({id:parseInt(userid)}).get().then(res=>{
      {var lookedid = res.data[0].looked;
      var lookingid = res.data[0].looking;
      var s = res.data[0].sex;
      var info = {id:0,name:'',brief:'',pu:''};
      var dinfo = [];
      var ginfo = [];
      for(var i=0;i<lookedid.length;i++){
        var id = lookedid[i];
        db.collection('users').where({id:id}).get().then(r=>{
          info['id'] = r.data[0].id;
          info['name'] = r.data[0].name;
          info['brief'] = r.data[0].BriefIntroduction;
          info['pu'] = r.data[0].photourl;
          dinfo.push(info);
          info = {id:0,name:'',brief:'',pu:''};
        })
      }
      dinfo = this.unique(dinfo)
      for(var i=0;i<lookingid.length;i++){
        var id = lookingid[i];
        db.collection('users').where({id:id}).get().then(s=>{
          info['id'] = s.data[0].id;
          info['name'] = s.data[0].name;
          info['brief'] = s.data[0].BriefIntroduction;
          info['pu'] = s.data[0].photourl;
          ginfo.push(info);
          info = {id:0,name:'',brief:'',pu:''};
        })
      }}
      ginfo = this.unique(ginfo)
      wx.cloud.callFunction({
        name: 'picurl',
        data:{userid:parseInt(userid),looked:lookedid,looking:lookingid},
        success: res => {
          that.setData({
            sex:s,
            url: res.result.url,
            looking:ginfo,
            looked:dinfo,
            userid:res.result.userid,
            name:res.result.name,
            brief_introduction:res.result.brief_introduction,
            tags:res.result.tags,
            photos:res.result.photos,
            self_introduction:res.result.self_introduction
          });
          console.log(that.data)
        }
      });
    });
    
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     console.log(options.id)
    this.SetMydata(options.id);
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
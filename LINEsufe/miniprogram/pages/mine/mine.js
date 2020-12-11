// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // src: '../../images/01.jpg',
    // me:[
    //   "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606652905943&di=818f54a0b8a03bf12ba9fc0afc848bb0&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170403%2Fa18953a64c4d43fa89b4c3b1a9e73df9_th.jpeg",
    //   "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606652905036&di=c26dcaac3cd55ec1dd660ac95728131e&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201608%2F03%2F20160803151703_cB2PL.jpeg",
    //   "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606652905030&di=b013f17e138f6bc6b5e2b2ccec4aefda&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201508%2F29%2F20150829201719_PV3iQ.jpeg"
    // ],
    name:'',
    brief_introduction:'',
    looked:[{}],
    looking:[{}],
    tags:[],
    photos:'',
    self_introduction:'',
    userid:0,
    url:['a'],
    tags_color:['red','blue','green']
  },

  SetMydata:function() {
    wx.setStorageSync('id', 10002);
    var userid = wx.getStorageSync('id');//获取用户id
    var that = this;
    const db = wx.cloud.database();
    db.collection('users').where({id:userid}).get().then(res=>{
      // wx.cloud.init({
      //   traceUser: true
      // })
      {var lookedid = res.data[0].looked;
      var lookingid = res.data[0].looking;
      var info = {id:0,name:'',brief:''};
      var dinfo = [];
      var ginfo = [];
      for(var i=0;i<lookedid.length;i++){
        var id = lookedid[i];
        db.collection('users').where({id:id}).get().then(r=>{
          info['id'] = r.data[0].id;
          info['name'] = r.data[0].name;
          info['brief'] = r.data[0].BriefItroduction;
          dinfo.push(info);
          info = {id:0,name:'',brief:''};
        })
      }
      for(var i=0;i<lookingid.length;i++){
        var id = lookingid[i];
        db.collection('users').where({id:id}).get().then(s=>{
          info['id'] = s.data[0].id;
          info['name'] = s.data[0].name;
          info['brief'] = s.data[0].BriefItroduction;
          ginfo.push(info);
          info = {id:0,name:'',brief:''};
        })
      }}
      wx.cloud.callFunction({
        name: 'picurl',
        data:{userid:userid,looked:res.data[0].looked,looking:res.data[0].looking},
        success: res => {
          that.setData({
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
        }
      });
      console.log(that.data);
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.SetMydata();
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
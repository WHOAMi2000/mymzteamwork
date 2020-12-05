const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryData:'',
    addData:'',
    updataData:'',
    deleteData:'',
  },
  getData:function(){
    var page = this;
    db.collection('Chatting').get({
      success:res=>{
        var reset = res.data[0];
        console.log(reset.id);
        console.log(reset.id2);
        page.setData({
          queryData:reset.id+reset.text+reset.time
        });
      }
    });

    // Promise
    db.collection('Chatting').doc('0288fce75fb87ed9001ea92364abb1e3').get().then(res=>{
      var reset = res.data;
        console.log(reset.id);
    })
  },
  addData:function(){

  },
  updataData:function(){

  },
  deleteData:function(){

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
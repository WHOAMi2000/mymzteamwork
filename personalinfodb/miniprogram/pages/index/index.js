//cloud:云对象
const db =wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '../../images/01.jpg',
    queryData:'',
    addData:'',
    updateData:'',
    deleteData:''
  },
  getData:function(){ //查询
    var page = this;
    //链式操作：查询所有记录
    db.collection('personalinfodb').get({
      success:res=>{
        var reset = res.data
        console.log(reset);
        console.log(reset.name+reset.userid+reset.sex);
        page.setData({
          queryData:reset.length + '条数据'
        });
      }
    })
    //Promise风格
    //doc:通过id查询一条记录
    db.collection('personalinfodb').doc('b1a52c595fb9ea67003fcf5856454092').get().then(res=>{
      var reset = res.data
      console.log(reset);
      page.setData({
        queryData:reset
      });
    })

    //where 
    //声明指令对象
    const _ = db.command;
    db.collection('personalinfodb').where({
      sex: _.eq(true)
    }).get().then(res=>{
      var reset = res.data
      console.log(reset);
      page.setData({
        queryData:reset[0].sex
      });
    })
    
  },
  addData:function(){ //插入
    var page = this;
    db.collection('personalinfodb').add({
      data:{
        userid:3,
        name:'hh',
        sex:true,
        charactertag:['easygoing','friendly']
      }
    }).then(res=>{
      console.log(res);
      page.setData({
        addData:res.errMsg
      });
    })
  },
  updateData:function(){ //更新
    var page = this;
    //更新一条数据
    // doc 确定id
    //where 查询唯一字段
    db.collection('personalinfodb').doc('b1a52c595fba178f00438fcb7e79ee1b').update({
      data:{
        name:'hasa'
      }
    }).then(res=>{
      console.log(res);
      page.setData({
        updateData:res.errMsg
      });
    });
  },

  deleteData:function(){ //删除
    var page = this;
    //更新一条数据
    // doc 确定id
    //where 查询唯一字段
    db.collection('personalinfodb').doc('b1a52c595fba1bcd0043ed4d49d4a4ef').remove().then(res=>{
      console.log(res);
      page.setData({
        deleteData:res.errMsg
      });
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
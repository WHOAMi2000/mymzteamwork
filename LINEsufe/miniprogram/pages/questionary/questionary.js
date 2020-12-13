// pages/questionary/questionary.js
const bank = require("../../utils/bank.js");  //导入题库
var ans = new Array(20);

Page({
  /**
   * 页面的初始数据
   */
  data : {
    qnaire: bank.qnaire,
    answer: ans,
    id: 0
  },
  radioChange: function (e) {
    //console.log(e.detail.value)
  },

  catchTouchMove: function(){
    
  },
   
  nextq: function () {
    
  },
   
  lastq: function (e) {
    if (this.data.id != 0) {
      this.setData({
        id: this.data.id - 1,
      })
    }
  },
   
  submit: function (e) {
    //console.log(e.detail.value);
    var a = e.detail.value.answer;
    var id = this.data.id;
    //console.log(id);
    ans[id] = a;
    this.setData({
      answer: ans,
    })
    console.log(this.data.answer);
    if (this.data.id < 19) {
      this.setData({
        id: this.data.id + 1,
      })
    }
    if(id == 19){
      var finish;
      var i = 0;
      var _this = this;
      while (i < 20) {
        if (ans[i] == "") {
          finish = 'false';
          break;
        } else {
          finish = 'true';
        }
        i++;
      }
      if (finish == 'false') {
        wx.showModal({
          title: '无法提交',
          content: '您还有部分题目未完成，请检查后重新提交',
          showCancel: false,
          confirmColor: '#fcbe39',
          confirmText: "好的",
          success(res) {
            _this.setData({
              id: i,
            })
          }
        })
      } else {
        var score = 5;
        var stdans = ["C","B","B","C","B","A","D","A","C","B","D","D","A","B","D","A","C","B","A"]
        for(var i = 0; i < 19; i++){
          if(stdans[i] == ans[i]){
            score = score + 5;
          }
        }
        if(score >= 80){
          wx.showModal({
            title: '答题结果',
            content: '您总共获得了'+score+'分',
            showCancel: false,
            confirmColor: '#fcbe39',
            confirmText: "好的",
          })
          //nevigate
          wx.redirectTo({
            url: '../../pages/register/register',
          })
        }else{
          wx.showModal({
            title: '答题结果',
            content: '您总共获得了'+score+'分，没有达到80分，再接再厉！',
            showCancel: false,
            confirmColor: '#fcbe39',
            confirmText: "好的",
          })
        }
      }
    }
  },
   
  //判断答题完成情况
  formSubmit: function() {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    for(var i=0; i<20; i++) {
      ans[i] = "";
    }
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
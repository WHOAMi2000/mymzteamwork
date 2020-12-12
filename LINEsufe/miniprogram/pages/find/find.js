var touch = [0, 0];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData:[],
    testCurrentNav: 0,
    currentIndex: 0,
    currentstu: {},
    // stuAnimationData: '',
    stuDistance: 0,
    classArray: ['active', 'next'], // 定义class数组，存放样式class，
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getrandomusers();
    
  },

  refresh: function(options){
    this.getrandomusers();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //this.getstuList()
  },
  // 开始滑动
  onTouchStart(e) {
    // console.log(e)

    touch[0] = e.touches[0].clientX
  },
  // 结束滑动
  onTouchEnd(e) {
    touch[1] = e.changedTouches[0].clientX;
    if (touch[0] - touch[1] > 5) {
      this.addClassName('left');
    } else if (touch[1] - touch[0] > 5) {
      this.addClassName('right');
    }
  },
  addClassName(direction) {
    let currentIndex = this.data.currentIndex
    let currentstu = {}
    let userData = this.data.userData
    let length = userData.length
    let classArray = new Array(length)

    if (direction === 'left') {  // 向左滑动
      if (++currentIndex >= length) return

      classArray[currentIndex] = 'active';
      classArray[currentIndex - 1] = 'prev';
      if (currentIndex + 1 < length) {
        classArray[currentIndex + 1] = 'next';
      }

    } else if (direction === 'right') {  // 向右滑动
      if (--currentIndex < 0) return

      if (currentIndex - 1 >= 0) {
        classArray[currentIndex - 1] = 'prev';
      }
      classArray[currentIndex] = 'active';
      classArray[currentIndex + 1] = 'next';

    }

    currentstu = userData[currentIndex]
    this.moveCard(direction)

    this.setData({
      currentIndex,
      classArray,
      currentstu,
    })
  },
  // 创建平移动画
  moveCard(direction) {
    let currentIndex = this.data.currentIndex + 1
    let stuDistance = this.data.stuDistance

    if (direction === 'left') {
      stuDistance -= 549
    } else if (direction === 'right') {
      stuDistance += 549
    }

    this.setData({
      stuDistance
    })
  },

  // onReady: function () {
  //   var u = [];
  //   var taowa = this.data.userData;
  //   taowa.forEach(element => {
  //     u.push(element);console.log(element)
  //   })
  //   console.log(taowa)
  //   this.setData({
  //     userData:u
  //   })
  // },

  getrandomusers:function(){
    const db = wx.cloud.database();
    var id = wx.getStorageSync('id');
    var num = 5;
    var users = [];
    db.collection('users').where({id:id}).get().then(res=>{
      var looking = res.data[0].looking;
      var friends = res.data[0].friends;
      var u = [];
      var lastid = 0;
      var grap = 0;
      db.collection('users').orderBy('id','desc').limit(1).get().then(lastid_res =>{
        {lastid = lastid_res.data[0].id;
        grap = lastid - 10001 + 0.9;
        var thisid = 0;
        for (var i = 1; i; i++) {
          thisid = Math.floor(Math.random()*grap) + 10001;
          if(thisid == id) continue;
          var j = 0;
          for(j=0;j<u.length;j++){
            if(u[j] == thisid) break;
          }
          for(var k=0;k<looking.length;k++){
            if(looking[k] == thisid){
              j = -1;
              break;
            }
          }
          for(var k=0;k<friends.length;k++){
            if(friends[k] == thisid){
              j = -1;
              break;
            }
          }
          if(j == u.length){
            u.push(thisid);
            db.collection('users').where({id:thisid}).get().then(people_res=>{
              var info = {};
              info.id = people_res.data[0].id?people_res.data[0].id:null;
              info.title=people_res.data[0].name?people_res.data[0].name:'无';
              info.image=people_res.data[0].photourl?people_res.data[0].photourl:'../../images/male.png';
              info.BriefItroduction=people_res.data[0].BriefItroduction?people_res.data[0].BriefItroduction:'无';
              info.tags=people_res.data[0].tags?people_res.data[0].tags:[];
              users.push(info);
              this.setData({
                userData:users
              })
            });
          } 
          
          
          if(u.length >= num) break;
        }
      
      }
      });
    });
    
  },


  
 

  viewProfile:function(e){
    var userLookedID = e.currentTarget.dataset.name;
    console.log(userLookedID)
    wx.navigateTo({
      url: '../homepage/homepage?id='+userLookedID
    })
  },

  notlike:function(e){
    //TODO:刷新掉现在的人
    let currentIndex = this.data.currentIndex + 1
    let stuDistance = this.data.stuDistance

    stuDistance -= 549;

    this.setData({
      stuDistance
    })
  },

  like:function(e){
    var userLookedID = this.data.userData[this.data.currentIndex].id;
    
    var userid = wx.getStorageSync('id');
    console.log(userLookedID);
    console.log(userid);
    wx.cloud.callFunction({
      name:'update',
      data:{
        id:userLookedID,//用户对谁点了喜欢，这里就是谁的id
        userid:userid
      },success:res=>{
        console.log(res);
       if(res.result){
        wx.showModal({
          content: '恭喜你们成为朋友了',
          duration:3000
        })
       }
       else{
        wx.showModal({
          content: '已经把你加到喜欢他（她）的人了',
          duration:3000
        })
       }
        console.log('success')
      },fail:res=>{
        console.log(res.errMsg)
      }
    })
    //TODO:刷新掉现在的人
  },

  onShow:function(){
  //   var a = this.data.userData;
  //   this.setData({
  //     userData:a
  //   });
  },
})


  // 实现页面跳转
  // onTapNavigateTo(e) {
  //   console.log(e)
  //   let id = e.currentTarget.dataset.id
  //   console.log(id, e)

  //   wx.navigateTo({
  //     url: '/pages/detail/detail?id=' + id,
  //   })
  // },

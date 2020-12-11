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
    this.getRandomUsers()

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

  getRandomArrayElements:function(arr, count) {
    if(count>arr.length){
      return;
    }
    let shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
    }
    console.log(shuffled.slice(min))
    return shuffled.slice(min);
    },

  getRandomUsers:function(){

    const db = wx.cloud.database();
    db.collection('users').orderBy('id','desc').limit(20).get().then(res =>{
      // console.log(res.data)
      var selectedUsers = this.getRandomArrayElements(res.data,8)
      let users = [];
      selectedUsers.forEach(element => {
        let dic={};
        dic.id = element.id?element.id:null;
        dic.title=element.name?element.name:'无';
        dic.image=element.photourl?element.photourl:'../../images/male.png';
        dic.BriefItroduction=element.BriefItroduction?element.BriefItroduction:'无';
        dic.tags=element.tags?element.tags:[];
        users.push(dic)
      });
      // console.log(users)
      this.setData({userData:users})
    });
  },

  viewProfile:function(e){
    var userLookedID = e.currentTarget.dataset.name;
    console.log(userLookedID)
    var userid = wx.getStorageSync('id');//获取登录状态，也就是用户的id
    wx.cloud.callFunction({
      name:'update',
      data:{
        id:userLookedID,//用户对谁点了喜欢，这里就是谁的id
        userid:userid
      },success:res=>{
        console.log(res)
        wx.navigateTo({
          url: '../homepage/homepage?id='+userLookedID
        })
      },fail:res=>{
        console.log(res.errMsg)
      }
    })
  }

  // 实现页面跳转
  // onTapNavigateTo(e) {
  //   console.log(e)
  //   let id = e.currentTarget.dataset.id
  //   console.log(id, e)

  //   wx.navigateTo({
  //     url: '/pages/detail/detail?id=' + id,
  //   })
  // },
})
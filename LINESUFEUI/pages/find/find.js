var touch = [0, 0];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieData: [
      {
      id: 0,
      title: '彭于晏',
      image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3879871549,4230884007&fm=26&gp=0.jpg',
      grade: "大三",
      school:'信息学院',
      constellation:'双子座'
    },
    {
      id: 1,
      title: '周杰伦',
      image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606477362180&di=16da090f5c733960e23362ade10c2552&imgtype=0&src=http%3A%2F%2Fimg1.ali213.net%2Fpicfile%2FNews%2F2014%2F08%2F06%2Fam%2F584_20140806110326513.jpg',
      grade: '大一',
      school:'金融学院',
      constellation:'处女座'
    },
    {
      id: 2,
      title: '吴亦凡',
      image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606477573329&di=8d91653b7d434a25f3b60a17bdd0c4ef&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn13%2F44%2Fw1080h564%2F20181110%2F9dc9-hnstwwq0951119.jpg',
      grade: '大三',
      school:'经济学院',
      constellation:'水瓶座'
    },
    {
      id: 3,
      title: '朱一龙',
      image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606488559236&di=f7da7432786fb0d8e35936aa09e13bd7&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn09%2F768%2Fw870h1498%2F20180911%2F8343-hiycyfw8352831.jpg',
      grade: '大三',
      school:'人文学院',
      constellation:'射手座'
    }
  ],
    testCurrentNav: 0,
    currentIndex: 0,
    currentMovie: {},
    // movieAnimationData: '',
    movieDistance: 0,
    classArray: ['active', 'next'], // 定义class数组，存放样式class，
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMovieList();
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getMovieList()
  },
  // 开始滑动
  onTouchStart(e) {
    console.log(e)

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
    let currentMovie = {}
    let movieData = this.data.movieData
    let length = movieData.length
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

    currentMovie = movieData[currentIndex]
    this.moveCard(direction)

    this.setData({
      currentIndex,
      classArray,
      currentMovie,
    })
  },
  // 创建平移动画
  moveCard(direction) {
    let currentIndex = this.data.currentIndex + 1
    let movieDistance = this.data.movieDistance

    if (direction === 'left') {
      movieDistance -= 549
    } else if (direction === 'right') {
      movieDistance += 549
    }

    this.setData({
      movieDistance
    })
  },
  /*
  // 实现页面跳转
  onTapNavigateTo(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    console.log(id, e)

    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
  },
  */
})
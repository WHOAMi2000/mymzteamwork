// pages/test/test.js
Page({

  data: {
    name:'',
    sex:true,
    BI:'',
    SI:'',
    tags:[]
  },

  onLoad: function (options) {
    const db = wx.cloud.database();
    var id = wx.getStorageSync('id');
    var that =this;
    db.collection('users').where({id:id}).get().then(res=>{
      console.log(res.data[0].BriefItroduction);
      var tags = res.data[0].tags;
      if(tags.length < 5){
        for(var i=0;i<(5-tags.length+1);i++){
          tags.push("无标签")
        }
      }
      that.setData({
        name:res.data[0].name?res.data[0].name:null,
        sex:res.data[0].sex,
        BI:res.data[0].BriefIntroduction?res.data[0].BriefIntroduction:null,
        SI:res.data[0].SelfIntroduction?res.data[0].SelfIntroduction:null,
        tags:res.data[0].tags
      })
    })
  },



  formSubmit: function(e) {
    var id = wx.getStorageSync('id');
    var tags = [];
    if(e.detail.value.t1 != "无标签" && e.detail.value.t1 != '' ) tags.push(e.detail.value.t1);
    if(e.detail.value.t2 != "无标签" && e.detail.value.t2 != '' ) tags.push(e.detail.value.t2);
    if(e.detail.value.t3 != "无标签" && e.detail.value.t3 != '' ) tags.push(e.detail.value.t3);
    if(e.detail.value.t4 != "无标签" && e.detail.value.t4 != '' ) tags.push(e.detail.value.t4);
    if(e.detail.value.t5 != "无标签" && e.detail.value.t5 != '' ) tags.push(e.detail.value.t5);
    
    var sex = true;
    if(e.detail.value.sex == '女') sex = false;
    console.log(sex);
    wx.cloud.callFunction({
      name: 'updateinfo',
      data:{
        id: id,
        name:e.detail.value.name,
        BI:e.detail.value.BI,
        tags:tags,
        SI:e.detail.value.SI,
        sex:sex
      },
      success: res => {
        console.log("success");
        wx.switchTab({
          url: '../../pages/mine/mine',
        })
      }
    });
    
  },
})
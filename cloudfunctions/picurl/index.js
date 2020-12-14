// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var userid = event.userid;
  return await db.collection('users').where({id:userid}).get().then(res=>{
    var d = {
      url:res.data[0].picurl,
      looked:[],
      looking:[],
      name:'',
      brief_introduction:'',
      tags:[],
      photos:'',
      self_introduction:'',
      userid:userid
    };
    d['name'] = res.data[0].name;
    d['brief_introduction'] = res.data[0].BriefIntroduction;
    d['tags'] = res.data[0].tags;
    d['photos'] = res.data[0].photourl;
    d['self_introduction'] = res.data[0].SelfIntroduction;
    var lookedid = event.looked;
    var lookingid = event.looking;
    var info = {id:0,name:'',brief:''};
    var dinfo = [];
    var ginfo = [];
    for(var i=0;i<lookedid.length;i++){
      var id = lookedid[i];
      db.collection('users').where({id:id}).get().then(r=>{
        info['id'] = r.data[0].id;
        info['name'] = r.data[0].name;
        info['brief'] = r.data[0].BriefIntroduction;
        dinfo.push(info);
        info = {id:0,name:'',brief:''};
      })
    }
    d['looked'] = dinfo;
    for(var i=0;i<lookingid.length;i++){
      var id = lookingid[i];
      db.collection('users').where({id:id}).get().then(s=>{
        info['id'] = s.data[0].id;
        info['name'] = s.data[0].name;
        info['brief'] = s.data[0].BriefIntroduction;
        ginfo.push(info);
        info = {id:0,name:'',brief:''};
      })
    }
    d['looking'] = ginfo;
    return d;
  })
}
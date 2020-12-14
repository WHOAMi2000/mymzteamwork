// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  try {
    return await db.collection('users').where({id:event.id}).get().then(res=>{
      var users = [];
      var looking = res.data[0].looking;
      var u = [];
      var lastid = 0;
      var grap = 0;
      db.collection('users').orderBy('id','desc').limit(1).get().then(lastid_res =>{
        {lastid = lastid_res.data[0].id;
        grap = lastid - 10001 + 0.9;
        var thisid = 0;
        for (var i = 1; i; i++) {
          thisid = Math.floor(Math.random()*grap) + 10001;
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
          if(j == u.length) u.push(thisid);
          if(u.length >= event.num) break;
        }}
        for(var i=0;i<u.length;i++){
          db.collection('users').where({id:u[i]}).get().then(people_res=>{
            var info = {};
            info.id = people_res.data[0].id?people_res.data[0].id:null;
            info.title=people_res.data[0].name?people_res.data[0].name:'无';
            info.image=people_res.data[0].photourl?people_res.data[0].photourl:'../../images/male.png';
            info.BriefIntroduction=people_res.data[0].BriefIntroduction?people_res.data[0].BriefItroduction:'无';
            info.tags=people_res.data[0].tags?people_res.data[0].tags:[];
            users.push(info);
          });
        }
        console.log(users);
        return users;
      });
    });
  } catch (e) {
    console.error(e)
  }
}
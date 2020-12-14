// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();


// 云函数入口函数
exports.main = async (event, context, callback) => {
  const wxContext = cloud.getWXContext();
  var id = event.id;
  var userid = event.userid;

  return await db.collection('users').where({id:userid}).get().then(res=>{
    db.collection('users').where({id:id}).get().then(r=>{
      var sysid = res.data[0]._id;//获取用户的数据库系统id
      var friendsysid = r.data[0]._id;//获取用户喜欢的用户的系统id
      var userlooked = res.data[0].looked;
      var inuserlooked = false;//用于检测用户是否在，他点击喜欢的这个用户，的喜欢里
      for(var i = 0; i < userlooked.length;i++){
        if(userlooked[i] == id) inuserlooked = true;
      }
      if(inuserlooked){//如果在，那么同时更新两者的数据库，让两者成为朋友
        var friends = r.data[0].friends;
        friends.push(userid);//向他的朋友里加入用户
        var friendlooking = r.data[0].looking;
        var lastids = [];
        for(var i=0;i<friendlooking.length;i++){//从他的looking中移除用户
          if(friendlooking[i] != userid) lastids.push(friendlooking[i]);
        }
        db.collection('users').doc(friendsysid).update({
          data:{
            friends:friends,
            looking:lastids
          }
        });
        friends=res.data[0].friends;
        friends.push(id);
        var looked = res.data[0].looked;
        lastids = [];
        for(var i=0;i<looked.length;i++){//从用户的looked中去除他
          if(looked[i] != id) lastids.push(looked[i]);
        }
        db.collection('users').doc(sysid).update({
          data:{
            friends:friends,
            looked:lastids
          }
        });//更新用户的朋友、looked
      }
      else{//如果用户不在他的looking里，那么把用户加入他的looked里，把他加入用looking里
        var looked = r.data[0].looked;
        looked.push(userid);
        var looking = res.data[0].looking;
        looking.push(id);
        db.collection('users').doc(friendsysid).update({data:{looked:looked}});
        db.collection('users').doc(sysid).update({data:{looking:looking}});
      }
    })
  }).catch(res=>{})
}
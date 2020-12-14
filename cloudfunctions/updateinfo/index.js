// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return db.collection('users').where({id:event.id}).get().then(res=>{
    db.collection("users").doc(res.data[0]._id).update({
      data:{
        name:event.name,
        sex:event.sex,
        tags:event.tags,
        BriefIntroduction:event.BI,
        SelfIntroduction:event.SI
      }
    });
  })
}
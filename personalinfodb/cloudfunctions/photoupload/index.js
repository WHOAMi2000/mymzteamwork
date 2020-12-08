// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init();
const db = cloud.database();
// 云函数入口函数

exports.main = async (event, context) => {
    try {
    //这里的update依据是event._id
    console.log(event.userid)
    console.log(event.photourl)
    return await db.collection("users").where({userid : event.userid}).update({
      data: {
        photourl:event.photourl
      }
    })
    } catch (e) {
    console.error(e)
  }
}

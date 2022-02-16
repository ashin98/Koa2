//连接mongodb数据库

//启动MongoDb数据库----在bin目录中打开cmd执行----  1.mongod -dbpath D:\MongoDB\data\db
//  2. 另外开启一个cmd，也是bin目录下的，执行----  2.mongo

const {MongodbURL,koa} = require('../config/config.default')
const mongoose = require('mongoose')
module.exports = ()=>{
    mongoose.connect(MongodbURL,{useUnifiedTopology:true,useNewUrlParser:true})
    .then(()=>{
        console.log('数据库连接成功')
    }).catch((err)=>{
        console.log('数据库连接失败',err)
    })
}

// const MongoClient = require('mongodb').MongoClient
// const dbURL = MongodbURL
// const dbName = koa
// MongoClient.connect(dbURL,(err,client)=>{
//     if(err){
//         console.log(err)
//             return ;
//     }
//     const db = client.db(dbName)
//     //增加数据
//     db.collection('users').insertOne({"username":'张三',"age":33},function(err,res){
//         if(!err){
//             console.log('增加数据成功')
//         }
//     })
// })
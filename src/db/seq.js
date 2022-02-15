//连接数据库-------需要安装sequelize
const {Sequeize} = require('sequelize')
const {MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER,
    MYSQL_PWD,
    MYSQL_DB} = require('../config/config.default')

const seq = new Sequeize('MYSQL_DB','MYSQL_USER','MYSQL_PWD',{     //前三个参数分别是数据库名，用户名，密码
    host:'MYSQL_HOST',
    dialect:'mysql'
})

seq.authenticate().then(()=>{
    console.log('数据库连接成功')
}).catch((err)=>{
    console.log('数据库连接失败',err)
})

module.exports = req
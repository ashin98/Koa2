//配置文件---默认配置
//需要先安装dotenv   npm i dotenv
const dotenv = require('dotenv')

dotenv.config()

//console.log(process.env.App_PORT) 输出env里面的APP_PORT
module.exports = process.env
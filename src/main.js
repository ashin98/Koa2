//入口文件
const MongoConnect = require('./db/seq')
const {APP_PORT} = require('./config/config.default')
MongoConnect()

const app = require('./app')

app.listen(APP_PORT,()=>{
    console.log(`server is running on http://localhost:${APP_PORT}`)
})
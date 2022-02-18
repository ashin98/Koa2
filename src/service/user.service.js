//操作数据库函数
const {User} = require('../models/user')
class userService {
    //查询数据库中是否存在用户名
    async getUserInfo(username){
        const whereOpt = {}
        //id && Object.assign(whereOpt,{id}) //如果id存在，则拷贝id到whereOpt里面
        username && Object.assign(whereOpt,{username})
        //password && Object.assign(whereOpt,{password})
        
        const res = await User.findOne({username})
        return res?res:''
    }

    //注册--创建用户密码存到数据库
    async createUser(username,password){
        const res = await User.create({username,password})
        return res
    }

    
}

module.exports = new userService()
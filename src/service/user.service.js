//用来操作数据库
const {User} = require('../models/user')
class userService {
    // async createUser(user_name,password){
    //     //todo:写入数据库
    //     return '写入数据库成功'
    // }
    async getUserInfo(username){
        const whereOpt = {}
        //id && Object.assign(whereOpt,{id}) //如果id存在，则拷贝id到whereOpt里面
        username && Object.assign(whereOpt,{username})
        //password && Object.assign(whereOpt,{password})
        
        const res = await User.findOne({username})
        console.log('空?',res)
        return res?res:''
    }

    async createUser(username,password){
        const res = await User.create({username,password})
        return res
    }

    
}

module.exports = new userService()
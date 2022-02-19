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

    //修改密码或者用户名等
    async updatePasswood({id,username,password}){
        const newUser = {}
        //username && Object.assign(newUser,{username})
        password && Object.assign(newUser,{password})
        // console.log({id})
        // console.log(password)
        // console.log(newUser.password)
        const res = await User.updateOne({_id:id},{password:newUser.password})
        //const res = await User.findOne({_id:id})
        //console.log(res)
        return res.acknowledged
    }

    
}

module.exports = new userService()
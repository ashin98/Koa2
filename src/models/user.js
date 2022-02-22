//创建模型对象
const mongoose = require('mongoose')

//系统用户模型对象
const userSchema = new mongoose.Schema({
    username:String,
    password:String,
    is_admin:{
        type:Boolean,
        default:false
    }
})
//如果mongodb里面没有User这个集合，它会自动帮我们创建users这个集合，并且按照schema里面的规则创建对应的字段类型
const User = mongoose.model('users',userSchema)    

module.exports = {User}
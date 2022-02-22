//创建购物车表
const mongoose = require('mongoose')
//自增插件  自定义id自增
const AutoIncrement = require('mongoose-sequence')(mongoose)
const cartsSchema = new mongoose.Schema({
    goods_id:{
        type:String,
        required:true,
        ref:'goods'   //关联goods表
    },
    user_id:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        default:1,
    },
    selected:{
        type:Boolean,
        default:true
    }
})

const Carts = mongoose.model('carts',cartsSchema)
module.exports = {Carts}
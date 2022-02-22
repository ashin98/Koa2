//创建商品模型
const mongoose = require('mongoose')
//自增插件  自定义id自增
const AutoIncrement = require('mongoose-sequence')(mongoose)

const goodsSchema = new mongoose.Schema({
    goods_id:String,
    goods_name:String,
    goods_price:Number,
    goods_num:Number,
    goods_img:String,
    isdelete:{
        type:Boolean,
        default:false
    }
})
const Goods = mongoose.model('goods',goodsSchema)
module.exports = {Goods}
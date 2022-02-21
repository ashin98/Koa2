//创建商品模型
const mongoose = require('mongoose')

const goodsSchema = new mongoose.Schema({
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
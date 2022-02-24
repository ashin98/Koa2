const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    address_id:{
        type:String,
        required:true
    },
    goods_info:{
        type:String,
        required:true
    },
    total:{
        type:Number,
        required:true
    },
    order_id:{
        type:String,
        required:true
    },
    statue:{ //订单状态（0：未支付；1：已支付；2：已发货；3：已签收；4：取消）
        type:Number,
        required:true,
        default:0
    }
})

const Orders = mongoose.model('orders',orderSchema)
module.exports = {Orders}
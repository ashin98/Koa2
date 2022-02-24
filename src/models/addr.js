//创建地址表
const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    consignee:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
        trim:true
    },
    address:{
        type:String,
        required:true
    },
    is_default:{
        type:Boolean,
        required:true,
        default:false
    }
})

const Addr = mongoose.model('address',addressSchema)
module.exports = {Addr}
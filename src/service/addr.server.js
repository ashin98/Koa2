const {Addr} = require('../models/addr')
class addrServer {
    async addAddr(params){
        const {user_id,consignee,phone,address} = params
        
        const res = await Addr.create({user_id,consignee,phone,address})
        return res
    }

    async finAllAddr(user_id){
        const res = await Addr.find({user_id})
        return res
    }

    async updateAddress(id,params){
        const {consignee,phone,address} = params
       const res = await Addr.updateOne({_id:id},{consignee,phone,address})
       return res
    }

    async removeAddress(id){
        const res = await Addr.deleteOne({_id:id}) 
        return res
    }

    async setDefaultAddr(id,user_id){
        //先把所有地址的is_default设置为false,然后再将一个设置为true
        await Addr.updateMany({user_id},{is_default:false})
        const res = await Addr.updateOne({_id:id},{is_default:true})
        return res.matchedCount
    }
}

module.exports = new addrServer()
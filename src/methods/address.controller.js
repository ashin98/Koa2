const {addAddr,finAllAddr,updateAddress,removeAddress,setDefaultAddr} = require('../service/addr.server')
class addrContrller {
    async addAddress(ctx,next){
        const user_id = ctx.state.user._doc._id 
        const {consignee,phone,address} = ctx.request.body 
        const res = await addAddr({user_id,consignee,phone,address})
        ctx.body = {
            code:200,
            message:'添加地址成功',
            result:res
        }
    }

    async findAll(ctx){
        const user_id = ctx.state.user._doc._id
        const res = await finAllAddr(user_id)
        ctx.body = {
            code:200,
            message:'获取地址成功',
            result:res
        }
    }

    async updateAddr(ctx){
        const id = ctx.request.params.id
        const res = await updateAddress(id,ctx.request.body)
        if(res.acknowledged){
            ctx.body = {
                code:200,
                message:'修改地址成功',
                result:res.matchedCount
            }
        }else{
            ctx.body = {
                code:400,
                message:'修改地址失败',
                result:res
            }
        }
        
    }

    async removeAddr(ctx){
        const id = ctx.request.params.id
        const res = await removeAddress(id)
        ctx.body = {
            code:200,
            message:'删除地址成功',
            result:res
        }
    }

    async setDefault(ctx){
        const id = ctx.request.params.id
        const user_id = ctx.state.user._doc._id
        const res = await setDefaultAddr(id,user_id) 
        ctx.body = {
            code:200,
            message:'设置默认地址成功',
            result:res
        }
    }
}
module.exports = new addrContrller()
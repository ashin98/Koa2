//购物车数据库操作
const {Carts} = require('../models/carts')
class cartsServer {
    //加入购车车
    async createOrUpdate(user_id,goods_id){
        const res = await Carts.findOne({user_id:user_id,goods_id:goods_id})
        
        if(res){
            //已经存在一条数据,则number+1
            await Carts.updateOne({user_id:user_id},{number:++res.number})
            return res
        }else{
            //创建数据
            return await Carts.create({user_id,goods_id})
             
        }
    }

    //获取购物车列表
    async findCarts(pageNum,pageSize){
       const total = await Carts.find().count()
       const offset = (pageNum-1)*parseInt(pageSize)
       const rows = await Carts.find({},{id:1,number:1,selected:1}).populate('goods_id',{id:1,goods_name:1,goods_price:1,goods_img:1}).skip(offset).limit(parseInt(pageSize))
       return {
           total,
           pageNum,
           pageSize,
           list:rows
       }
    }

    //更新购物车number和selected
    async updateCarts(params){
        const {number,selected} = params
        const id = params.id.id
        const res = await Carts.find({_id:id})
        if(!res) return ''
        if(number!==undefined){
            await Carts.updateOne({_id:id},{number:number})
        }
        selected!==undefined?await Carts.updateOne({_id:id},{selected:selected}):''
        const reslut = await Carts.find({_id:id})
        return reslut
         
    }

    //删除购物车
    async removeCarts(ids){
       const res = await Carts.remove({_id:{$in:ids}})
       return res.deletedCount
    }

    //全选
    async selectAllCarts(user_id){
       const res = await Carts.updateMany({user_id:user_id},{selected:true})
       return res.matchedCount
    }

    //全不选
    async unSelectAllCarts(user_id){
        const res = await Carts.updateMany({user_id},{selected:false})
        return res.matchedCount
    }
}

module.exports = new cartsServer()
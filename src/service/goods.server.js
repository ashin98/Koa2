//商品数据库
const {Goods} = require('../models/goods')

class goodsService {
    async createGoods(goods_name,goods_price,goods_num,goods_img){
       const res =  await Goods.create({goods_name,goods_price,goods_num,goods_img})
       return res
    }

    async updateGoods(id,goods){
        const {goods_name,goods_price,goods_num,goods_img} = goods
        const res = await Goods.updateOne({_id:id},{goods_name:goods_name,goods_price:goods_price,goods_num:goods_num,goods_img:goods_img})
        return res.acknowledged
    }

    async deleteGood(id){
        const res = await Goods.updateOne({_id:id},{isdelete:true})
        return res.acknowledged
    }

    async restoreGood(id){
        const res = await Goods.updateOne({_id:id},{isdelete:false})
        return res.acknowledged
    }

    async findGoods(pageNum,pageSize){
        const total = await Goods.find({isdelete:false}).count()
        const offset = (pageNum-1)*parseInt(pageSize)  //skip方法用来跳过指定条数据
        const rows = await Goods.find({isdelete:false}).skip(offset).limit(parseInt(pageSize))
        console.log(rows)
        return {
            pageNum,
            pageSize,
            total,
            list:rows
        }
        
    }
}

module.exports = new goodsService()
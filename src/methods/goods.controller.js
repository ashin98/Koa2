//处理商品接口的函数
const path = require('path')

const {createGoods,updateGoods,deleteGood,restoreGood,findGoods} = require('../service/goods.server')
class goodsController {
    async upload(ctx){
        //console.log(ctx.request.files.file)
        const {file} = ctx.request.files
        const fileType = ['image/png','image/jpg','image/jpeg']
        if(file){
            if(!fileType.includes(file.type)){
                //如果上传的文件不是图片格式的文件则返回错误
                return ctx.body = {
                    code:10020,
                    message:'不支持文件格式',
                    result:''
                }
            }
            ctx.body = {
                code:200,
                message:'图片上传成功',
                result:{
                    goods_img:path.basename(file.path)
                }
            }
        }else{
            return ctx.body = {
                code:400,
                message:'图片上传失败'
            }
        }
        
    }

    async create(ctx){
        //写入数据库
        const {goods_name,goods_price,goods_num,goods_img} = ctx.request.body
        try {
           const res =  await createGoods(goods_name,goods_price,goods_num,goods_img)
           ctx.body = {
               code:200,
               message:'发布商品成功',
               result:res
           }
        } catch (err) {
            console.error(err)
            ctx.body = {
                code:10020,
                message:'发布失败'
            }
            
        }
    }

    async update(ctx){
      const res = await updateGoods(ctx.params.id,ctx.request.body)
      try {
        if(res){
            ctx.body ={
                code:200,
                message:'修改商品成功',
                res:''
            }
        }else{
           return ctx.body = {
                code:400,
                message:'修改商品不存在',
                res:''
            }
        }
      } catch (err) {
          console.error(err) 
          ctx.body = {
              code:400,
              message:'修改商品失败'
          }
      }
      

    }

    async remove(ctx){
      const res = await deleteGood(ctx.params.id)
      if(res){
          ctx.body = {
              code:200,
              message:'商品下架成功',
              result:''
          }
      }else{
          ctx.body = {
              code:400,
              message:'商品下架失败',
              result:''
          }
      }
    }

    async restore(ctx){
        const res = await restoreGood(ctx.params.id)
        if(res){
            ctx.body = {
                code:200,
                message:'商品上架成功',
                res:''
            }
        }else{
            ctx.body = {
                code:400,
                message:'商品上架失败',
                res:''
            }
        }
    }

    async findAll(ctx){
        //1.解析pageNum和pageSize
        const {pageNum=1,pageSize=10} = ctx.request.query
        //2.调用数据库处理的相关方法
       const res = await findGoods(pageNum,pageSize)
        //3.返回结果
        ctx.body = {
            code:200,
            message:'获取数据成功',
            result:res
        }
    }
}

module.exports = new goodsController()
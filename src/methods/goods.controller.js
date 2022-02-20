//处理商品接口的函数
const path = require('path')
class goodsController {
    async upload(ctx,next){
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
}

module.exports = new goodsController()
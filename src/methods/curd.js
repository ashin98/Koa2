//处理每个users路由中用到的函数，封装成一个类

const {User} = require('../models/user')  //引入数据库模型
class userController {
    //添加系统用户
    async register(ctx,next){
        //1.获取客户端输入数据 
        const {username='',password=''} = ctx.request.body
        
        //2.操作数据库
       const res = await User.create({username,password}).then(res=>{
            if(res){
                ctx.body = {code:200,msg:'添加成功',data:res}
            }else{
                ctx.body = {
                    code:300,
                    msg:'添加失败'
                }
            }
        }).catch(err=>{
            ctx.body = {
                code:400,
                msg:'添加异常'
            }
            console.error(err)
        })
        
    }

    //修改用户信息
    async update(ctx,next){
        let params = ctx.request.body
        await User.updateOne(
            {
                _id:params._id
            },
            {
                username:params.username,
                password:params.password
            }
        ).then(res=>{
            ctx.body = {result:res}
        }).catch(err=>{
            ctx.body = {
                code:400,
                msg:'添加异常'
            }
            console.error(err)
        })
    }

    //删除用户信息
    async del(ctx,next){
        let {_id} = ctx.request.body
        await User.findOneAndDelete({_id}).then((res)=>{
            ctx.body = {result:res}
        }).catch(err=>{
            ctx.body = {
                code:400,
                msg:'删除错误'
            }
            console.log(err)
        })
    }

    //查询所有用户信息
    async find(ctx,next){
        await User.find().then(res=>{
            ctx.body = {code:200,data:res}
        }).catch(err=>{
            ctx.body = {
                code:400,
                msg:'查询错误'
            }
            console.log(err)
        })
    }

    //查询单个用户信息
    async findmes(ctx,next){
        await User.findOne({_id:ctx.params.id}).then(res=>{
            ctx.body = {
                code:200,
                data:res
            }
        }).catch(err=>{
            ctx.body = {
                code:400,
                msg:'查询错误'
            }
            console.log(err)
        })
    }
}

module .exports = new userController()
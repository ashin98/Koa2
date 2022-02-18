//user路由模块
const Router = require('koa-router')
const router = new Router({prefix:'/users'})  
const {add,update,del,find,findmes} = require('../methods/curd')
const {userValidator,verifyUser,cryptPassword,verifylogin} = require('../middleware/user.middleware')
const {register,login} = require('../methods/users.controller')
const {auth} = require('../middleware/auth.middleware')

router.post('/register',userValidator,verifyUser,cryptPassword,register)

router.post('/login',userValidator,verifylogin,login)

router.patch('/',auth,(ctx,next)=>{
    ctx.body = {
        code:200,
        message:'修改密码成功'
    }
})

//POST  /users/add
router.post('/add',add)

//POST  /users/update
router.post('/update',update)

//POST  /users/delete
router.post('/del',del)

//GET /users/find
router.get('/find',find)

//GET /users/find/id
router.get('/find/:id',findmes)
module.exports = router
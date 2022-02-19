//user路由模块
const Router = require('koa-router')
const router = new Router({prefix:'/users'})  
const {add,update,del,find,findmes} = require('../methods/curd')
const {userValidator,verifyUser,cryptPassword,verifylogin} = require('../middleware/user.middleware')
const {register,login,changePassword} = require('../methods/users.controller')
const {auth} = require('../middleware/auth.middleware')

//注册
router.post('/register',userValidator,verifyUser,cryptPassword,register)
//登录
router.post('/login',userValidator,verifylogin,login)
//修改密码
router.patch('/',auth,cryptPassword,changePassword)

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
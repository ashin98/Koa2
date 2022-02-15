//user路由模块
const Router = require('koa-router')
const router = new Router({prefix:'/users'})  
const {register,login} = require('../controller/user.controller')


//POST  /users/register
router.post('/register',register)

//POST  /users/login
router.post('/login',login)



module.exports = router
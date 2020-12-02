const Koa=require('koa')
const bodyParser=require('koa-bodyparser')   
const router = require('koa-router')()                  
const app =new Koa()
const cors = require('koa2-cors');
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose');
// app.use(cors({
//   origin: function (ctx) {
//       return '*'  // 允许来自所有域名请求
//   },
//   exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
//   maxAge: 5,
//   credentials: true,
//   allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PUT'],
//   allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
// }))

app.use(cors())
  router.get('/',async (ctx,next)=>{  
    await next()
    ctx.body = '<h1>this is a get response!</h1>'
    
})

router.post('/addform',async (ctx,next)=>{  
  ctx.set('Access-Control-Allow-Origin','*')
  await next()
  ctx.body = '提交成功！'
  
})

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mongoosedb');
  app.use(router.routes(),bodyParser())
app.listen(3001, () => {
  console.log('koa is listening in 3001');
})
module.exports = app
 
const koa = require('koa');
const app = new koa();
const koaBody = require('koa-body');
const router = require('koa-router')();

const serve = require('koa-static');
const path = require('path')
const fs = require('fs')
const clip = require('clipboard');
app.use(serve(__dirname + "/public"));
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 500 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
  }
}));

router.post('/upload', async (ctx, next) => {
  // 上传单个文件
  const file = ctx.request.files.file; // 获取上传文件
  console.log(file.path)
  // 创建可读流
  const host=ctx.request.header.host
  const reader = fs.createReadStream(file.path);
  let filePath = path.join(__dirname, 'public/') + `${file.name}`;
  // 创建可写流
  const upStream = fs.createWriteStream(filePath);
  // 可读流通过管道写入可写流
  reader.pipe(upStream);
  ctx.body ={"imgurl":`${host}/${file.name}`}
 
  // const pro = new Promise( (resolve, reject) => {
  //   var stream = reader.pipe(upStream);
  //   stream.on('finish', function () {
    
  //   });
//})

//ctx.response.body =  await pro



});



app.use(router.routes());
app.listen(3001, () => {
  console.log('koa is listening in 3001');
})
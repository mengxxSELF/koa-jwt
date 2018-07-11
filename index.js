const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const jwt = require('jsonwebtoken')
const jwtKoa = require('koa-jwt')
const app = new Koa()
const router = new Router()
const SECRET = 'girl'
app.use(bodyParser())
app.use(function(ctx, next){
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = 'Protected resource, use Authorization header to get access'
    } else {
      throw err;
    }
  });
});
app.use(
  jwtKoa({secret: SECRET})
  .unless({
    path: [/\/login/] // 数组中的路径不需要通过jwt验证
  })
)
router.get('/login', async (ctx) => {
  let token = jwt.sign({
    name: 'dva'
  }, SECRET)
  // console.log(token, 'token')
  ctx.body = {
    token
  }
})

router.get('/try', async (ctx) => {
  let token = ctx.header.authorization
  token = token.slice(7)
  // console.log(token, 'token');
  let result = jwt.verify(token, SECRET)
  ctx.body = {
    result
  }
})

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(9098)

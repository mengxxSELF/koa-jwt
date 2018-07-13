const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const jwt = require('jsonwebtoken')
const jwtKoa = require('koa-jwt')
const app = new Koa()
const router = new Router()
const moment = require('moment')
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
  let expTime = moment().add(30, 'minutes').unix()
  let token = jwt.sign({
    name: 'dva',
    exp: expTime // 设置 token 过期时间
  }, SECRET)
  console.log(token, 'token')
  ctx.body = {
    token
  }
})

router.get('/try', async (ctx) => {
  let token = ctx.header.authorization
  token = token.slice(7)
  // console.log(token, 'token');
  let result = jwt.verify(token, SECRET)
  let {exp} = result
  // 判断 token 是否快要失效时 更新token
  let newToken = null
  let willInvalid = moment().add(10, 'minutes').unix()
  if (willInvalid > exp) {
    // 10分钟失效的时候 更新一次token
    let expTime = moment().add(30, 'minutes').unix()
    newToken = jwt.sign({
      name: 'dva',
      exp: expTime // 设置 token 过期时间
    }, SECRET)
  }

  ctx.body = {
    result,
    newToken
  }
})

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(9098)

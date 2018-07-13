/*
 * @Author: 孟闲闲 base64编码解码
 * @Date: 2018-07-13 10:21:29 
 * @Last Modified by: mxx
 * @Last Modified time: 2018-07-13 10:33:54
 */

const base64url = require('base64url')


// 编码
let header = {
  'typ': 'JWT',
  'alg': 'HS256'
}

let resultH = base64url(JSON.stringify(header))
console.log(resultH, 'resultH')

let payload = {
  name: 'dva',
  exp: 1531410000
}

let result = base64url(JSON.stringify(payload))
console.log(result, 'result')

// 解码

let isH = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9'

let getH = base64url.decode(isH)
console.log(getH, 'getH')


let isP = 'eyJuYW1lIjoiZHZhIiwiZXhwIjoxNTMxNDEwMDAwfQ'
let getP = base64url.decode(isP)
console.log(getP, 'getP')



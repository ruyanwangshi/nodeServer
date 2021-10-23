const jwt = require('jsonwebtoken')

function getToken(data) {
  if (!data) {
    throw new Error('请设置信息才能后续操作')
  }
  const created = Math.floor(Date.now() / 1000)
  const cert = 'ceshimiyao'
  const token = jwt.sign(
    {
      data: data,
      exp: created + 60 * 30, // 过期时间 30 分钟
      iat: created, // 创建时间
    },
    cert,
    { algorithm: 'RS256' }
  )
  return token
}

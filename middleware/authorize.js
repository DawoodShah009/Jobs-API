const jwt = require('jsonwebtoken')
const { UnauthorisedError } = require('../error')

const authorizeUserMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorisedError('Authetication Failed!!!')
  }
  const token = authHeader.split(' ')[1]
  // console.log(token)

  try {
    const payLoad = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { userID: payLoad.userID, name: payLoad.name }
    next()
  } catch (error) {
    throw new UnauthorisedError('Authetication Failed!!!')
  }
}

module.exports = authorizeUserMiddleware

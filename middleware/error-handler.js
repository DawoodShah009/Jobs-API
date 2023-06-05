const { CustomError } = require('../error')

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  // res.status(500).json({ msg: 'Something went wrong!' })
  res.status(500).json({ msg: err.message })
}

module.exports = errorHandlerMiddleware

const CustomError = require('./custom-error')

class UnauthorisedError extends CustomError {
  constructor(message) {
    super(message)
    this.statusCode = 401
  }
}
module.exports = UnauthorisedError

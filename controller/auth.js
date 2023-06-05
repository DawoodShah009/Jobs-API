const bcrypt = require('bcryptjs')
const User = require('../model/user')
const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthorisedError } = require('../error')

const register = async (req, res) => {
  // const {
  //   body: { name, email, password },
  // } = req
  // const salt = await bcrypt.genSalt(10)
  // const hashedPassword = await bcrypt.hash(password, salt)
  // req.body.password = hashedPassword
  const user = await User.create({ ...req.body })

  // res.json({ name, email, hashedPassword })
  res.status(StatusCodes.CREATED).json({ user: { name: user.name } })
}

const login = async (req, res) => {
  const {
    body: { email, password },
  } = req
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }

  const user = await User.findOne({ email: email })
  if (!user) {
    throw new UnauthorisedError('Invalid credentials!!!')
  }
  const isCorrectPassword = await bcrypt.compare(password, user.password)
  if (!isCorrectPassword) {
    throw new UnauthorisedError('Invalid Credentials!!!')
  }
  const token = jwt.sign(
    { userID: user._id, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  )
  res.status(200).json({ user: { name: user.name }, token })
}
module.exports = {
  register,
  login,
}

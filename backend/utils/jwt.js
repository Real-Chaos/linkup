const jwt = require('jsonwebtoken')

// generate a new token

const generateToken = (userId) => {
  return jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: '1h'})
}


// verify a token

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {generateToken, verifyToken}
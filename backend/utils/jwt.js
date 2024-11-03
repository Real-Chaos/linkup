const jwt = require('jsonwebtoken')
require('dotenv').config()
// generate a new token

const generateToken = (userId) => {
	const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
		expiresIn: '1h',
	})
	return token
}

// verify a token

const verifyToken = (token) => {

	return jwt.verify(token, process.env.JWT_SECRET)
}

const generateRefreshToken = (userId) => {
	return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

module.exports = { generateToken, generateRefreshToken, verifyToken }

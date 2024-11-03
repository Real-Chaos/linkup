const express = require('express')
const bcrypt = require('bcryptjs')
const { generateToken, verifyToken, generateRefreshToken } = require('../utils/jwt')
const {saveRefreshToken} = require('../utils/authHelper')
const { createUser, findUserByEmail } = require('../models/user')
const router = express.Router()

router.post('/register', async (req, res) => {
	const { username, email, password } = req.body
	try {
		const existingUser = await findUserByEmail(email)
		if(existingUser) return res.status(400).json({message: 'user already exists'})
		
		const hashedPassword = await bcrypt.hash(password, 10)

		const newUser = await createUser(username, email, hashedPassword)


		const accessToken = generateToken(newUser.id)
		const refreshToken = generateRefreshToken(newUser.id)
		res.json({ accessToken, refreshToken, user: {id: newUser.id, username, email} })
	} catch (err) {
		res.status(500).json({ message: 'Error registering User!' })
	}
})

router.post('/login', async (req, res) => {
	const {email, password} = req.body

	try {
		const user = await findUserByEmail(email)

		if(user && await bcrypt.compare(password, user.password)) {
			const accessToken = generateToken(user.id)
			const refreshToken = generateRefreshToken(user.id)

			await saveRefreshToken(user.id, refreshToken)
			return res.json({accessToken, refreshToken})
		}
		return res.status(401).json({ message: 'Invalid credentials' });

	}catch(err) {
		res.status(500).json({message: 'Internal server error'})
	}
})


router.post('/refresh-token', async(req, res) => {
	const {token} = req.body

	if(!token) {
		return res.status(403).json({ message: 'Refresh token required' });
	}

	try {
		const decoded = verifyToken(token, process.env.JWT_SECRET)
		const storedToken = await pool.query(
			'SELECT * FROM refresh_tokens WHERE token = $1 AND user_id = $2',
			[token, decoded.id]
		)
		if (storedToken.rows.length === 0) return res.status(403).json({message:  'Invalid Refresh Token'})

		const newAccessToken = generateToken(decoded.id)
		return res.json({accessToken: newAccessToken})
	} catch (error) {
    return res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
})

module.exports = router

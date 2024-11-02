const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { generateToken, verifyToken, generateRefreshToken } = require('../utils/jwt')
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

router.post('login', (req, res) => {
	res.send('Login User')
})


// router.post('/refresh-token', async(req, res) => {
// 	const {refreshToken } = req.body
// 	if (!refreshToken) return res.status(401).json({ message: 'Refresh token required.' });

// 	try {
//     const decoded = verifyToken(refreshToken);
//     const user = await findUserById(decoded.id); // retrieve user data based on user ID

//     if (!user) {
//       return res.status(403).json({ message: 'User not found.' });
//     }

//     // Generate a new access token
//     const newAccessToken = generateToken(user.id);
//     res.json({ accessToken: newAccessToken });
//   } catch (error) {
//     return res.status(403).json({ message: 'Invalid or expired refresh token.' });
//   }
// })

module.exports = router

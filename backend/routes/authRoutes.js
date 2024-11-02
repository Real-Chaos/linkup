const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { generateToken } = require('../utils/jwt')
const { createUser } = require('../models/user')
const router = express.Router()

router.post('/register', async (req, res) => {
	const { username, email, password } = req.body
	try {
		const hashedPassword = await bcrypt.hash(password, 10)

		const newUser = await createUser(username, email, hashedPassword)

		// save user to the database
		const token = generateToken(newUser.id)
		res.json({ token })
	} catch (err) {
		res.status(500).json({ message: 'Error registering User!' })
	}
})

router.post('login', (req, res) => {
	res.send('Login User')
})

module.exports = router

const express = require('express')
const router = express.Router()
const { findUserById } = require('../models/user')

router.get('/profile', async (req, res) => {
	try {
		const user = await findUserById(req.user.id)
		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}

		res.json(user)
	} catch (error) {
		res.status(500).json({ message: 'Internal server erro' })
	}
})

module.exports = router

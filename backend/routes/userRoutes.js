const express = require('express')
const router = express.Router()

router.get('/profile', (req, res) => {
  res.json({message: `Welcome, user ${req.user}`})
})



module.exports = router
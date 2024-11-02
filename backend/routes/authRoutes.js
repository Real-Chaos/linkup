const express = require('express')
const router = express.Router()

router.post("/register", (req, res) => {
  res.send('User registration')
})

router.post('login', (req, res) => {
  res.send("Login User")
})

module.exports = router
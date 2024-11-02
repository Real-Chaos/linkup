const express = require('express')
const router = express.Router()

router.post("/register", (req, res) => {
  const {username, email, password} = req.body

  console.log(`Recieved Data:`, {username, email, password})

  res.status(200).send('Registration data recieved')
})

router.post('login', (req, res) => {
  res.send("Login User")
})

module.exports = router
const express = require('express')
const app = express()
const pool = require('./db')

pool.query('SELECT NOW()', (err, res) => {
  if(err) console.error('Database connection error: ', err.stack)
  else console.log('Database connected at: ', res.rows[0].now)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
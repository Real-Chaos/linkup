const express = require('express')
const app = express()
const pool = require('./db')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')


// parse json
app.use(express.json())

// connect to database

pool.query('SELECT NOW()', (err, res) => {
  if(err) console.error('Database connection error: ', err.stack)
  else console.log('Database connected at: ', res.rows[0].now)
})

// routes 
app.use('/auth', authRoutes)
app.use('/api', userRoutes)

// initialize port

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
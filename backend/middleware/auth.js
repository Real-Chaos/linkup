
const {verifyToken} = require('../utils/jwt')

const authenticateToken =  (req, res, next) => {
	const authHeader = req.headers['authorization']; // Get the Authorization header
  const token = authHeader && authHeader.split(' ')[1]; // Split and get the token part
	if (!token) return res.status(401).json({ message: 'Access Denied! No token provided' })

	try {
    console.log('decoding')
    const decoded = verifyToken(token)
    console.log(decoded)
    req.user = decoded
    next()
	} catch (err) {
    res.status(403).json({message: 'Invalid token'})
  }
}

module.exports = authenticateToken

const {verifyToken} = require('../utils/jwt')

const authenticateToken =  (req, res, next) => {
	const token = req.headers['authorization'].split(' ')[1]; // Get the Authorization header
	if (!token) return res.status(401).json({ message: 'Access Denied! No token provided' })

	try {

    const decoded = verifyToken(token)
    req.user = decoded
    next()
	} catch (err) {
    res.status(403).json({message: 'Invalid token'})
  }
}

module.exports = authenticateToken
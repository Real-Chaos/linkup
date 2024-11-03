const pool = require('../config/db.js')

const createUser = async (username, email, hashedpassword) => {
	const query = `
    INSERT INTO users (username, email, password)
    VALUES ($1::VARCHAR, $2::VARCHAR, $3::VARCHAR)
    RETURNING *;
  `

	const values = [username, email, hashedpassword]
	const result = await pool.query(query, values)
	return result.rows[0]
}

const findUserByEmail = async (email) => {
	const query = `
    SELECT * FROM users
    WHERE email = $1;
  `
		const values = [email]
		const result = await pool.query(query, values)
		return result.rows[0]
}

const findUserById = async(userId) => {
  const query = `
    SELECT username, email, profile_picture FROM users WHERE id = $1
    `
  
  const values = [userId]
  const result = await pool.query(query, values)
  return result.rows[0]
}

const updateUserProfilePicture = async(userId, profilePicture) => {
  const query = `
    UPDATE users SET profile_picture = $1
    WHERE id = $2
    RETURNING *
  `
  const values = [profilePicture, userId]
  const result = await pool.query(query, values)
  return result.rows[0]
}

module.exports = { createUser, findUserByEmail, findUserById, updateUserProfilePicture }

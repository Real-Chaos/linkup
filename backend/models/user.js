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

module.exports = { createUser, findUserByEmail }

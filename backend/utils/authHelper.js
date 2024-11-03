const pool = require('../config/db'); 

const saveRefreshToken = async (userId, refreshToken) => {
  const query = `
    INSERT INTO refresh_tokens (user_id, token)
    VALUES ($1, $2)
    RETURNING * 
  `

  const values = [userId, refreshToken]
  const result = await pool.query(query, values)
  return result.rows[0]
};

module.exports = { saveRefreshToken };

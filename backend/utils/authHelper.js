const pool = require('../config/db'); 

const saveRefreshToken = async (userId, token) => {
  const query = `
    INSERT INTO refresh_tokens (user_id, token, expiry)
    VALUES ($1, $2, CURRENT_TIMESTAMP + INTERVAL '7 days')
    RETURNING *;
  `;
  const values = [userId, token];
  const result = await pool.query(query, values);
  return result.rows[0]; // Returns the saved refresh token record
};

const getRefreshTokenFromDatabase = async (userId) => {
  const query = `
    SELECT token
    FROM refresh_tokens
    WHERE user_id = $1;
  `;
  const values = [userId];
  const result = await pool.query(query, values);
  return result.rows[0] ? result.rows[0].token : null;
};

module.exports = { saveRefreshToken, getRefreshTokenFromDatabase };

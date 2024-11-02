const pool = require('../config/db'); 

const saveRefreshToken = async (userId, refreshToken) => {
  const query = 'UPDATE users SET refresh_token = $2 WHERE id = $1';
  const values = [userId, refreshToken];
  await pool.query(query, values);
};

module.exports = { saveRefreshToken };

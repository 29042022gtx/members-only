const bcrypt = require("bcryptjs");
const pool = require("../connects/pool");

const authen = {
  isUsedEmail: async (email) => {
    return (
      (await pool.query("SELECT COUNT(*) FROM users WHERE email = $1", [email]))
        .rows?.[0].count != 0
    );
  },
  addUser: async (user) => {
    const password = await bcrypt.hash(user.password, 10);
    await pool.query(
      `INSERT INTO users (first_name, last_name, email, password, membership_status, role)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        user.firstName,
        user.lastName,
        user.email,
        password,
        "inactive",
        "user",
      ]
    );
  },
};

module.exports = authen;

const pool = require("../connects/pool");

const authen = {
  isUsedEmail: async (email) => {
    return (
      (await pool.query("SELECT COUNT(*) FROM users WHERE email = $1", [email]))
        .rows?.[0].count != 0
    );
  },
};

module.exports = authen;

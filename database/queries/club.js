const pool = require('../connects/pool');

const club = {
  getMessages: async (is_member) => {
    let selectFields = 'title, content';
    if (is_member) {
      selectFields += ', first_name, last_name, created_at';
    }
    return (await pool.query(`
      SELECT ${selectFields}
      FROM messages m JOIN users u ON m.author_id = u.user_id
      ORDER BY created_at DESC
      LIMIT 1000;
      `)).rows;
  },

  updateUserMembershipStatus: async (user_id, status) => {
    await pool.query(
      `UPDATE users SET
        membership_status = $1
        where user_id = $2;`,
      [status, user_id]
    );
  },

  addMessage: async ({title, content, author_id}) => {
    await pool.query(
      `INSERT INTO messages (title, content, author_id)
       VALUES ($1, $2, $3);`,
      [title, content, author_id]
    );
  },
};

module.exports = club;

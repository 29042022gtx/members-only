const { faker } = require('@faker-js/faker');
const client = require('../connects/client');

const getRandomTimestamp = () => {
  const currentYear = new Date().getFullYear(); // Get current year
  const startDate = new Date(`${currentYear - 1}-01-01T00:00:00Z`); // Jan 1 of last year
  const endDate = new Date(); // Current date
  return faker.date.between({ from: startDate, to: endDate });
};

const getRandomMessages = (author_id) => {
  const numMessages = Math.floor(Math.random() * 3) + 1; // Random between 1 and 3
  return Array.from({ length: numMessages }, () => ({
    title: faker.lorem.words(3), // Generates a random title
    content: faker.lorem.sentences(2), // Generates random content
    author_id,
    created_at: getRandomTimestamp(),
  }));
};

async function messageSeed() {
  const res = await client.query('SELECT user_id FROM users');
  const insertedUsers = res.rows;

  const allMessages = [];

  for (const user of insertedUsers) {
    const messages = getRandomMessages(user.user_id);
    allMessages.push(...messages);
  }
  allMessages.sort((a, b) => a.created_at - b.created_at);

  // Insert messages into the database in sorted order
  for (const msg of allMessages) {
    await client.query(
      `INSERT INTO messages (title, content, created_at, author_id) 
       VALUES ($1, $2, $3, $4)`,
      [msg.title, msg.content, msg.created_at, msg.author_id]
    );
  }
}

module.exports = messageSeed;

#! /usr/bin/env node

require('dotenv').config();
const client = require('../connects/client');
const userSeed = require('./userSeed');
const messageSeed = require('./messageSeed');

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR ( 50 ),
  last_name VARCHAR ( 50 ),
  email VARCHAR ( 255 ),
  password VARCHAR ( 255 ),
  membership_status VARCHAR ( 20 ),
  role VARCHAR ( 20 )
);

CREATE TABLE IF NOT EXISTS messages (
  message_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR ( 50 ),
  content VARCHAR ( 255 ),
  created_at TIMESTAMP,
  author_id INTEGER REFERENCES users(user_id)
);
`;

const seedActions = {
  users: userSeed,
  messages: messageSeed,
};

async function main() {
  console.log('seeding...');
  await client.connect();
  await client.query(SQL);

  const table = process.argv[2];

  if (!table) {
    await userSeed();
    await messageSeed();
  } else if (seedActions[table]) {
    await seedActions[table]();
  } else {
    console.log("Invalid table. Use 'users', 'messages' or skip for all.");
  }

  await client.end();
  console.log('done');
}

main();

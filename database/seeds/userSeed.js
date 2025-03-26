const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
const client = require('../connects/client');

const generateUsers = async (count = 12) => {
  const users = [];

  // Hash the same password for all users
  const hashedPassword = await bcrypt.hash('12345678', 10);

  for (let i = 0; i < count; i++) {
    users.push({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: hashedPassword,
      membership_status: faker.helpers.arrayElement(['active', 'inactive']),
      role: 'user',
    });
  }

  return users;
};

async function userSeed() {
  const users = [
    {
      first_name: 'Admin',
      last_name: 'User',
      email: 'admin@mail.com',
      password: await bcrypt.hash('12345678', 10),
      membership_status: 'active',
      role: 'admin',
    },
    {
      first_name: 'User',
      last_name: '01',
      email: 'user01@mail.com',
      password: await bcrypt.hash('12345678', 10),
      membership_status: 'active',
      role: 'user',
    },
    {
      first_name: 'User',
      last_name: '02',
      email: 'user02@mail.com',
      password: await bcrypt.hash('12345678', 10),
      membership_status: 'inactive',
      role: 'user',
    },
  ];
  users.push(...(await generateUsers(10)));

  for (const user of users) {
    await client.query(
      `INSERT INTO users (first_name, last_name, email, password, membership_status, role) 
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        user.first_name,
        user.last_name,
        user.email,
        user.password,
        user.membership_status,
        user.role,
      ]
    );
  }
}

module.exports = userSeed;

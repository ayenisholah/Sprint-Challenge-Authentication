const db = require('../database/dbConfig');
const Users = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db('users').select('id', 'username', 'password');
}

function findBy(filter) {
  return db('users').where(filter);
}

async function add(user) {
  const [id] = await db('users').insert(user);

  return findById(id);
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}
// Test

beforeEach(async () => {
  await db('users').truncate();
});

describe('Users.insert', () => {
  it('is able to add users', async () => {
    let users = await Users.find();
    expect(users).toHaveLength(0)

    await Users.add({ username: 'alex', password: 1234 });
    await Users.add({ username: 'matt', password: 1234 });
    users = await Users.find();

    expect(users).toHaveLength(2)
  });
});

describe('Users.find', () => {
  it('should return an array of objects', async () => {
    let users = await Users.find();
    expect(users).toHaveLength(0)

    await Users.add({ username: 'alex', password: 1234 });
    await Users.add({ username: 'matt', password: 1234 });
    users = await Users.find();

    expect(users).toMatchObject(users)
  })
})

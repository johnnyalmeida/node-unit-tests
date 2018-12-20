const { knex } = require('../../../src/config/db');

describe('Routes User', () => {
  beforeEach((done) => {
    knex.table('user').delete().then(() => { done(); });
  });

  const defaultUser = {
    email: 'email@email.com',
    name: 'Fulano',
    username: 'fulano',
    age: 20,
    bio: 'É uma pessoa',
    password: 'changeit',
  };

  describe('Route POST /users', () => {
    it('should create a user', (done) => {
      request
        .post('/users')
        .send(defaultUser)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.email).to.be.eql('email@email.com');
          done(err);
        });
    });
  });
});

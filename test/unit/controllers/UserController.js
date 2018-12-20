require('ava');
const UserController = require('../../../src/controllers/UserController');

describe('User Controller', () => {
  let UserModel;

  beforeEach((done) => {
    UserModel = td.replace('../../../src/models/BooksModel', {
      post: td.func(),
    });
    done();
  });

  afterEach(() => { td.reset(); });

  it('should create an user', (done) => {
    const userToCreate = {
      id: '1',
      name: 'Johnny Almeida',
      age: 30,
      team: 'share eat',
      doTests: true,
    };

    td.when(UserModel.post(userToCreate)).thenResolve({ id: userToCreate.id });

    const userController = new UserController(UserModel);
    userController.post(userToCreate)
      .then((res) => {
        expect(res.user.id).to.be.eql(userToCreate.id);
        done();
      });
  });

  it('should not create an user', (done) => {
    const userToCreate = {
      id: '2',
      name: 'Diogo Costa',
      age: 35,
      team: 'shared services',
      doTests: false,
    };

    td.when(UserModel.post(userToCreate)).thenResolve({ id: userToCreate.id });

    const userController = new UserController(UserModel);

    userController.post(userToCreate)
      .then((res) => {
        expect(res.user).to.be.eql(false);
        done();
      });
  });
});

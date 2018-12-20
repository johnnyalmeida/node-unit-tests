const UserController = require('../../../src/controllers/UserController');

describe('User Controller', () => {
  let UserModel;

  beforeEach((done) => {
    UserModel = td.replace('../../../src/models/UserModel', {
      post: td.func(),
    });
    done();
  });

  afterEach(() => {
    td.reset();
  });

  it('should create a user', (done) => {
    const userToCreate = {
      id: 1,
      name: 'Johnny Almeida',
      age: 30,
      team: 'share eat',
      doTest: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const req = {
      body: userToCreate,
    };
    const res = {
      status: (httpStatus) => {
        expect(httpStatus).to.be.eql(201);
        return res;
      },
      send: (param) => {
        expect(param.id).to.be.eql(5);
        done();
      },
    };

    // Irá simular uma inserção no BD
    td.when(UserModel.post(req.body))
      .thenResolve([5]);

    const userController = new UserController(UserModel);


    userController.post(req, res);
  });
});


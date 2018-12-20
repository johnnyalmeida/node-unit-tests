const UserController = require('../../../src/controllers/UserController');

describe('User Controller', () => {
  it('should create an user', () => {
    const userToCreate = {
      id: '1',
      name: 'Johnny Almeida',
      age: 30,
      team: 'share eat',
      doTests: true,
    };

    const userContoller = new UserController();
    const res = userContoller.create(userToCreate);

    expect(res.user.id).to.be.eql(userToCreate.id);
    expect(res.user.name).to.be.eql(userToCreate.name);
    expect(res.user.age).to.be.eql(userToCreate.age);
    expect(res.user.team).to.be.eql(userToCreate.team);
    expect(res.user.doTests).to.be.eql(userToCreate.doTests);
  });

  it('should not create an user', () => {
    const userToCreate = {
      id: '2',
      name: 'Diogo Costa',
      age: 35,
      team: 'shared services',
      doTests: false,
    };

    const userController = new UserController();

    const res = userController.create(userToCreate);

    expect(res.user).to.be.eql(false);
  });
});

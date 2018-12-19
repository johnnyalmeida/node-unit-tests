const UserModel = require('../models/UserModel');

class UserController {
  static create(data) {
    if (!data.doTests) {
      return {
        user: false,
      };
    }

    const userModel = new UserModel(data);
    const user = userModel.get();

    return {
      user,
    };
  }
}

module.exports = UserController;

class UserController {
  constructor(UserModel) {
    this.userModel = UserModel;
  }

  async post(data) {
    if (!data.doTests) {
      return {
        user: false,
      };
    }

    const createdUser = await this.userModel.post(data);

    return {
      user: createdUser,
    };
  }
}

module.exports = UserController;

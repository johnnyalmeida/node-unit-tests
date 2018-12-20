class UserController {
  constructor() {
    this.user = {};
  }
  create(data) {
    if (!data.doTests) {
      return {
        user: false,
      };
    }

    this.user = data;

    return {
      user: this.user,
    };
  }
}

module.exports = UserController;

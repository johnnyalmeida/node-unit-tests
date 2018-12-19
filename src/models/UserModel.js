class UserModel {
  constructor(data) {
    this.user = data;
  }

  get() {
    return this.user;
  }
}

module.exports = UserModel;


class UserModel {
  constructor(db) {
    this.db = db;
  }

  async post(user) {
    return this.db
      .table('user')
      .insert(user);
  }
}

module.exports = UserModel;

class UserController {
  constructor(UserModel) {
    this.userModel = UserModel;
  }

  async post(req, res) {
    const [id] = await this.userModel.post({
      ...req.body,
    });
    res.status(201).send({ ...req.body, id });
  }
}

module.exports = UserController;

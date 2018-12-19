class BooksController {
  constructor(BooksModel) {
    this.BooksModel = BooksModel;
  }

  async getAll() {
    console.log(this.BooksModel);
    return this.BooksModel.getAll();
  }
}

module.exports = BooksController;

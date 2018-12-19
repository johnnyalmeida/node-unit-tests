// const BooksController = require('../../../src/controllers/BooksController');

// let BooksModel;

// describe('Books Controller', () => {
//   describe('Get all books: getAll()', () => {
//     beforeEach((done) => {
//       BooksModel = td.replace('../../../src/models/BooksModel', {
//         getAll: td.func(),
//       });
//       done();
//     });

//     afterEach(() => { td.reset(); });

//     it('should return a list of books', (done) => {
//       // const expectedResponse = [
//       //   { name: 'book1', author: 'author 1' },
//       //   { name: 'book2', author: 'author 2' },
//       // ];

//       td.when(BooksModel.getAll()).thenResolve('oloco');

//       const booksController = new BooksController(BooksModel);

//       console.log(booksController);

//       booksController.getAll()
//         .then((result) => {
//           console.log('RESULT', result);
//           done();
//         })
//         .catch((err) => {
//           done(err);
//         });
//       console.log('you should not be seing this');
//     });
//   });
// });

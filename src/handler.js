const { nanoid } = require('nanoid');
const books = require('./books');
const validateBookProps = require('./validate');

const addBookHandler = (request, h) => {
  const { payload } = request;
  const error = validateBookProps(payload, request.method);
  if (error) {
    return h.response({
      status: 'fail',
      message: error,
    }).code(400);
  }

  const id = nanoid(16);
  const { finished = false } = payload;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    ...payload,
    finished,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);
  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    return h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    }).code(201);
  }

  return h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  }).code(500);
};

const getAllBooksHandler = (request, h) => {
  const { name = '', reading = -1, finished = -1 } = request.query;

  let newBooks = books;
  if (reading >= 0) {
    // eslint-disable-next-line eqeqeq
    newBooks = newBooks.filter((book) => book.reading == reading);
  }
  if (finished >= 0) {
    // eslint-disable-next-line eqeqeq
    newBooks = newBooks.filter((book) => book.finished == finished);
  }

  newBooks = newBooks
    .filter((book) => book.name.toLowerCase().includes(name.toLowerCase()))
    .map(({
      id, name, publisher,
    }) => ({
      id,
      name,
      publisher,
    }));

  return {
    status: 'success',
    data: {
      books: newBooks,
    },
  };
};

const getBookByIdHandler = (request, h) => {
  const { bookId: id } = request.params;

  const book = books.filter((book) => book.id === id)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  return h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  }).code(404);
};

const editBookByIdHandler = (request, h) => {
  const { payload } = request;
  const { bookId: id } = request.params;

  const error = validateBookProps(payload, request.method);

  if (error) {
    return h.response({
      status: 'fail',
      message: error,
    }).code(400);
  }

  const index = books.findIndex((book) => book.id === id);
  const updatedAt = new Date().toISOString();

  if (index !== -1) {
    books[index] = {
      ...books[index],
      ...payload,
      updatedAt,
    };

    return {
      status: 'success',
      message: 'Buku berhasil diperbarui',
    };
  }

  return h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  }).code(404);
};

const deleteBookByIdHandler = (request, h) => {
  const { bookId: id } = request.params;

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);

    return {
      status: 'success',
      message: 'Buku berhasil dihapus',
    };
  }

  return h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  }).code(404);
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};

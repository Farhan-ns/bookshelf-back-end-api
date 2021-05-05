const { nanoid } = require('nanoid');
const books = require('./books');
const validateAddBook = require('./validate');

const addBookHandler = (request, h) => {
  const { payload } = request;
  const error = validateAddBook(payload);

  if (error) {
    const response = h.response({
      status: 'fail',
      message: error,
    });

    response.code(400);
    return response;
  }

  const bookId = nanoid(16);
  const finished = false;
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newBook = {
    bookId,
    ...payload,
    finished,
    createdAt,
    updatedAt,
  };

  books.push(newBook);
  const isSuccess = books.filter((book) => book.bookId === bookId).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId,
      },
    });

    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });

  response.code(500);
  return response;
};

module.exports = addBookHandler;

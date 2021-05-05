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

  const id = nanoid(16);
  const finished = false;
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newBook = {
    id,
    ...payload,
    finished,
    createdAt,
    updatedAt,
  };

  books.push(newBook);
  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
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

const getAllBooksHandler = (request, h) => {
  const newBooks = books.map(({ id, name, publisher }) => ({
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

module.exports = { addBookHandler, getAllBooksHandler };

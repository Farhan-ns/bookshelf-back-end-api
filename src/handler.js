const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  const { payload } = request;

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

  const response = h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId,
    },
  });

  response.code(201);
  return response;
};

module.exports = addBookHandler;

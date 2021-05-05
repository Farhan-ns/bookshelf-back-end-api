const validateAddBook = (payload) => {
  const { readPage, pageCount } = payload;

  if ('name' in payload === false || payload.name <= 0) {
    return 'Gagal menambahkan buku. Mohon isi nama buku';
  }
  if (readPage > pageCount) {
    return 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount';
  }
  return '';
};

module.exports = validateAddBook;

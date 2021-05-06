const validateBookProps = (payload, method) => {
  const { readPage, pageCount } = payload;
  let verb = 'NONE';
  if (method === 'post') verb = 'menambahkan';
  if (method === 'put') verb = 'memperbarui';

  if ('name' in payload === false || payload.name <= 0) {
    return `Gagal ${verb} buku. Mohon isi nama buku`;
  }
  if (readPage > pageCount) {
    return `Gagal ${verb} buku. readPage tidak boleh lebih besar dari pageCount`;
  }
  return '';
};

module.exports = validateBookProps;

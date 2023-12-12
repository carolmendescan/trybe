const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute('SELECT * from products');
  return result;
};

const findById = async (id) => {
  const [result] = await connection.execute('SELECT * from products WHERE id = ?', [id]);
  return result[0];
};

const createProduct = async ({ name }) => {
  const [{ insertId }] = await connection.execute('INSERT INTO products (name) VALUE (?)', [name]);
  return { id: insertId, name };
};

const updateProduct = async (name, productId) => {
  await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
  [name, productId],
  );
};

module.exports = {
  findAll,
  findById,
  createProduct,
  updateProduct,
};

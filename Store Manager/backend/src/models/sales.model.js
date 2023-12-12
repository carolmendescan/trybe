const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT
    salesProduct.sale_id AS saleId,
    salesProduct.product_id AS productId,
    salesProduct.quantity,
    sales.date
    FROM sales_products AS salesProduct
    INNER JOIN products AS p
    ON salesProduct.product_id = p.id
    INNER JOIN sales
    ON salesProduct.sale_id = sales.id
    ORDER BY sale_id, product_id`,
    );
  return result;
};

const findById = async (id) => {
  const [result] = await connection.execute(
    `SELECT
    sales.date,
    salesProduct.product_id AS productId,
    salesProduct.quantity
   FROM sales_products AS salesProduct
   INNER JOIN products
   ON salesProduct.product_id = products.id
   INNER JOIN sales
   ON salesProduct.sale_id = sales.id
    WHERE salesProduct.sale_id = ?
    ORDER BY sale_id, product_id`,
    [id],
    );
  return result;
};

const createSalesId = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales () VALUE ()',
    );
  return insertId;
};

const createSalesProduct = async (insertId, productId, quantity) => {
  await connection.execute(
    `INSERT INTO sales_products
    (sale_id, product_id, quantity) VALUE (?, ?, ?)`,
     [insertId, productId, quantity],
     );
  return { productId, quantity };
};

module.exports = {
  findAll,
  findById,
  createSalesId,
  createSalesProduct,
};

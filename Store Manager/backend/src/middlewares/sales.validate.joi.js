const saleMiddleware = async (req, res, next) => {
  const data = req.body;
  const quantityReqs = data.every(({ quantity }) => quantity || typeof quantity === 'number');
  const quantityMins = data.every(({ quantity }) => quantity >= 1);
  const productReqs = data.every(({ productId }) => productId);
  console.log(productReqs);
  if (!quantityReqs) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (!quantityMins) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
if (!productReqs) {
  return res.status(400).json({ message: '"productId" is required' });
}

next();
};

module.exports = saleMiddleware;
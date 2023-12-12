const { putPostIdService } = require('../services/putPostIdService');

const putPostIdController = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const { userId } = req;

  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

    const putId = await putPostIdService(title, content, userId, id);
    if (putId.message) return res.status(401).json({ message: putId.message });
    return res.status(200).json(putId);
};

module.exports = {
  putPostIdController,
};

// const update = async (req, res) => {
//   const { id } = req.params;
//   const { title, content } = req.body;

//   const updated = await BookService.update(id, { title, author, pageQuantity, publisher });

//   if (!updated) return res.status(404).json({ message: 'Book not found' });

//   res.status(200).json({ message: 'Book updated' });
// };
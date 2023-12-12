const dataRegex = /^\d{2}\/\d{2}\/\d{4}$/;
const rateCheck = (rate) => Number.isInteger(rate) && rate >= 1 && rate <= 5;

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  
    if (!talk) {
      return res.status(400).json({
        message: 'O campo "talk" é obrigatório',
      });
    } if (!talk.watchedAt) {
      return res.status(400).json({
        message: 'O campo "watchedAt" é obrigatório',
      });
    } if (!dataRegex.test(talk.watchedAt)) {
      return res.status(400).json({
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
      });
    } 
    next();
  };

    const validateTalkRate = (req, res, next) => {
      const { talk } = req.body;

    if (!talk.rate && talk.rate !== 0) {
      return res.status(400).json({
        message: 'O campo "rate" é obrigatório',
      });
    } if (!rateCheck(talk.rate)) {
      return res.status(400).json({
        message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
      });
    }
    next();
  };
  
  module.exports = {
    validateTalk,
    validateTalkRate,
  };

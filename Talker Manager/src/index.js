const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
const validateEmail = require('./Middlewares/validateEmail');
const validatePassword = require('./Middlewares/validatePassword');
const validateToken = require('./Middlewares/validateToken');
const validateName = require('./Middlewares/validateName');
const validateAge = require('./Middlewares/validateAge');
const { validateTalk, validateTalkRate } = require('./Middlewares/validateTalk');

const pathFile = 'talker.json';

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_ERR_STATUS = 404;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  const palestrantes = await fs.readFile(path.resolve(__dirname, pathFile));
  const data = JSON.parse(palestrantes);
  return response.status(HTTP_OK_STATUS).json(data);
});

// REQUISITO 8:
app.get('/talker/search', validateToken, async (req, res) => {
  const { q, rate, date } = req.query;
  const palestrantes = await fs.readFile(path.resolve(__dirname, pathFile), 'utf-8');
  const data = JSON.parse(palestrantes);
  const personTalker = data.filter((person) => person.name.includes(q));
  if (!q) {
    return res.status(HTTP_OK_STATUS).json(data);
  }
    return res.status(HTTP_OK_STATUS).json(personTalker);
  });

app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;
  const palestrantes = await fs.readFile(path.resolve(__dirname, pathFile));
  const data = JSON.parse(palestrantes);
  const personTalker = data.find((person) => person.id === +id);
  if (!personTalker) { 
    return response.status(HTTP_ERR_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return response.status(HTTP_OK_STATUS).json(personTalker);
});

app.post('/login', validateEmail, validatePassword, async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const token = crypto.randomBytes(8).toString('hex');
      return res.status(HTTP_OK_STATUS).json({ token });
  }
});

app.post('/talker',
validateToken,
validateName,
validateAge,
validateTalk,
validateTalkRate,
 async (req, res) => {
const { name, age, talk } = req.body;
const data = await fs.readFile(path.resolve(__dirname, pathFile));
const talkers = JSON.parse(data);
const newTalker = {
  name,
  age,
  id: talkers.at(-1).id + 1,
  talk,
};
const updatedTalkers = [...talkers, newTalker];
  await fs.writeFile(path.resolve(__dirname, pathFile), JSON.stringify(updatedTalkers), 'utf-8');
  return res.status(201).json(newTalker);
});

// REQUISITO 6:
app.put('/talker/:id',
validateToken,
validateName,
validateAge,
validateTalk,
validateTalkRate,
async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
const data = await fs.readFile(path.resolve(__dirname, pathFile));
const talkers = JSON.parse(data);
const talkerIndex = talkers.findIndex((person) => person.id === Number(id));
if (talkerIndex === -1) {
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
}
talkers[talkerIndex] = {
  name,
  age,
  id: Number(id),
  talk,
};
  
    await fs.writeFile(path.resolve(__dirname, pathFile), JSON.stringify(talkers), 'utf-8');
    return res.status(200).json(talkers[talkerIndex]);
  });

app.delete('/talker/:id', validateToken, async (req, res) => {
const { id } = req.params;
const data = await fs.readFile(path.resolve(__dirname, pathFile));
const talkers = JSON.parse(data);
const talkersFiltered = talkers.filter((person) => person.id !== +id);

  await fs.writeFile(path.resolve(__dirname, pathFile), JSON.stringify(talkersFiltered), 'utf-8');
  return res.status(204).end();
});

app.listen(PORT, () => {
  console.log('Online');
});
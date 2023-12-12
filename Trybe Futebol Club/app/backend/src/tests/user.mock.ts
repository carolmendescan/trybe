import * as bcrypt from 'bcryptjs';

const password = 'my_secret';
const validEmail = 'carol@gmail.com.br';
const invalidEmail = 'invalid';

const user1 = {
  id: 1,
  username: 'Carol',
  role: 'GOLEIRO',
  email: validEmail,
  password: bcrypt.hashSync(password, 10),
};

const user2 = {
  id: 2,
  username: 'Bernardo',
  role: 'ATACANTE',
  email: validEmail,
  password: bcrypt.hashSync(password, 10),
};

const users = [user1, user2];

const loginBody = {
  email: validEmail,
  password: password,
};

const invalidLoginEmailBody = {
  email: invalidEmail,
  password: password,
};

const invalidLoginPasswordBody = {
  email: validEmail,
  password: '123',
};

export {
  user1,
  user2,
  users,
  loginBody,
  invalidLoginEmailBody,
  invalidLoginPasswordBody,
};
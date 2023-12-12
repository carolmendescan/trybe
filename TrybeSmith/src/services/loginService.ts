import bcrypt from 'bcryptjs';
import userModel from '../database/models/user.model';
import { Token } from '../types/Token';
import { Login } from '../types/Login';
import { ServiceResponse } from '../types/ServiceResponse';
import createTokens from '../utils/JWT';

async function loginService(login: Login): Promise<ServiceResponse<Token>> {
  if (!login.username || !login.password) {
    return {
      status: 'INVALID_DATA',
      data: { message: '"username" and "password" are required' } };
  }
  const user = await userModel.findOne({ where: { username: login.username } });

  if (!user || !bcrypt.compareSync(login.password, user.dataValues.password)) {
    return {
      status: 'UNAUTHORIZED',
      data: { message: 'Username or password invalid' } };
  }

  const { id, username } = user.dataValues;

  const token = createTokens.createToken({ id, username });

  return { status: 'SUCCESS', data: { token } };
}

export default {
  loginService,
};
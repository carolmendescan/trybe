import * as bcrypt from 'bcryptjs';
import UserModel from '../models/user.model';

import { ServiceResponse } from '../Interfaces/services';
import { IUser } from '../Interfaces/user';

import JwtUtils from '../utils/JwtUtils';

export default class UserService {
  private jwtUtils = new JwtUtils();
  private _userModel: UserModel;

  constructor() {
    this._userModel = new UserModel();
  }

  async login(body: IUser): Promise<ServiceResponse<string>> {
    const user = await this._userModel.findOne(body);

    return !user || !bcrypt.compareSync(body.password, user.password)
      ? {
        status: 'UNAUTHORIZED',
        data: { message: 'Invalid email or password1' },
      } : {
        status: 'SUCCESS',
        data: this.jwtUtils.sign({
          id: user.id,
          username: user.username,
          role: user.role,
          email: user.email,
        }),
      };
  }

  async role(decodedToken: Partial<IUser>): Promise<ServiceResponse<string>> {
    const user = await this._userModel.findByPk(decodedToken.id as number);
    return !user
      ? { status: 'NOT_FOUND', data: { message: 'Something went wrong' } }
      : { status: 'SUCCESS', data: user.role };
  }
}

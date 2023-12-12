import { IUser, TypeUserModel } from '../Interfaces/user';
import SequelizeUserModel from '../database/models/user';

export default class UserModel implements TypeUserModel {
  private model = SequelizeUserModel;

  async findOne(payload: IUser): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email: payload.email } });
    return !user ? null : user;
  }

  async findByPk(id: IUser['id']): Promise<IUser | null> {
    return this.model.findByPk(id, { raw: true });
  }
}

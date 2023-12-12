import { IModelReader } from './crud';

export default interface IUser {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string,
}

type TypeUserModel = IModelReader<IUser>;

export { TypeUserModel, IUser };

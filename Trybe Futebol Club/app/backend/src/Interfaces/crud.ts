export interface IModelCreator<T> {
  create(data: Partial<T>): Promise<T>,
}

export interface IModelReader<T> {
  findAll?(): Promise<T[]>,
  findByPk?(id: number): Promise<T | null>,
  findOne?(data: Partial<T>): Promise<T | null>,
}

export interface IModelUpdater<T> {
  update(id: number, data: Partial<T>): Promise<T | null>,
}

export interface IModelDeleter {
  delete(id: number): Promise<number>,
}

export interface ICRUDModel<T>
  extends IModelCreator<T>, IModelReader<T>, IModelUpdater<T>,
  IModelDeleter { }

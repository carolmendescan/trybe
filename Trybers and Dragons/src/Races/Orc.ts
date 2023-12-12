import Race from './Race';

export default class Orc extends Race {
  _maxLifePoints: number;
  static _OrcInstances = 0;

  constructor(name: string, dexterity: number, maxLifePoints = 74) {
    super(name, dexterity);
    this._maxLifePoints = maxLifePoints;
    Orc._OrcInstances += 1;
  }

  get maxLifePoints(): number {
    return this._maxLifePoints;
  }

  static createdRacesInstances() {
    return Orc._OrcInstances;
  }
}
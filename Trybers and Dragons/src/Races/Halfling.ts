import Race from './Race';

export default class Halfling extends Race {
  _maxLifePoints: number;
  static _HalflingInstances = 0;

  constructor(name: string, dexterity: number, maxLifePoints = 60) {
    super(name, dexterity);
    this._maxLifePoints = maxLifePoints;
    Halfling._HalflingInstances += 1;
  }

  get maxLifePoints(): number {
    return this._maxLifePoints;
  }

  static createdRacesInstances() {
    return Halfling._HalflingInstances;
  }
}
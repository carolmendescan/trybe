import Race from './Race';

export default class Dwarf extends Race {
  _maxLifePoints: number;
  static _dwarfInstances = 0;

  constructor(name: string, dexterity: number, maxLifePoints = 80) {
    super(name, dexterity);
    this._maxLifePoints = maxLifePoints;
    Dwarf._dwarfInstances += 1;
  }

  get maxLifePoints(): number {
    return this._maxLifePoints;
  }

  static createdRacesInstances() {
    return Dwarf._dwarfInstances;
  }
}

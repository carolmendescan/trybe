import Race from './Race';

export default class Elf extends Race {
  _maxLifePoints: number;
  static _ElfInstances = 0;

  constructor(name: string, dexterity: number, maxLifePoints = 99) {
    super(name, dexterity);
    this._maxLifePoints = maxLifePoints;
    Elf._ElfInstances += 1;
  }

  get maxLifePoints(): number {
    return this._maxLifePoints;
  }

  static createdRacesInstances() {
    return Elf._ElfInstances;
  }
}
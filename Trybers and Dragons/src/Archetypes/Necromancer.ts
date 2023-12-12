import { EnergyType } from '../Energy';
import Archetype from './Archetype';

export default class Necromancer extends Archetype {
  _energyType: EnergyType;
  static _damageHabilityInstances = 0;

  constructor(name: string) {
    super(name);
    this._energyType = 'mana';
    Necromancer._damageHabilityInstances += 1;
  }

  get energyType(): EnergyType {
    return this._energyType;
  }

  static createdArchetypeInstances(): number {
    return Necromancer._damageHabilityInstances;
  }
}

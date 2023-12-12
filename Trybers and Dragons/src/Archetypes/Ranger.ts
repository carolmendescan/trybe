import { EnergyType } from '../Energy';
import Archetype from './Archetype';

export default class Ranger extends Archetype {
  _energyType: EnergyType;
  static _damageHabilityInstances = 0;

  constructor(name: string) {
    super(name);
    this._energyType = 'stamina';
    Ranger._damageHabilityInstances += 1;
  }

  get energyType(): EnergyType {
    return this._energyType;
  }

  static createdArchetypeInstances(): number {
    return Ranger._damageHabilityInstances;
  }
}

import { gameObject } from './gameObject.js';

export class Zombie extends gameObject {

  constructor(row, column) {
    super(row, column);
    this.enabledPowerup = true;
    this.startTimePowerup = 0;
    this.endTimePowerup = 0;
    this.MAX_TIME_POWER_UP  = 10000;
  }
  toString() {
    console.log( `zombie at row ${this.rowNumber}
    and column ${this.columnObjectNumber}
    and is:  ${this.enabled} `);
  }
}

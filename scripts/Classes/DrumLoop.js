import { Tone } from 'tone/build/esm/core/Tone';
import { Loop } from './Loop.js';
import { Row } from './Row.js';

/**
 * Creates and controls the drum loop, overwrites the convertPattern() method
 */
export class DrumLoop extends Loop {
  /**
   * @param {string} tagId 
   * @param {object} data 
   * @param {Tone.Sampler} source 
   */
  constructor(tagId, data, source) {
    super(tagId, data, source);
  }

  makeRows() {
    var names = ["Kick drum", "Snare drum", "Hi hat", "Cowbell", "Clave", "L bongo", "H bongo", "Bell", "Tom"];
    for (let i = 0; i < this.parts.length; i++) {
      let row = new Row(this.source, this.parts[i], this.scale[i], names[i]);
      this.domObject.appendChild(row.domObject);
      this.rows.push(row);
    }
  }
}
import { Loop } from './Loop.js';
import { Row } from './Row.js';

export class DrumLoop extends Loop {
  constructor(tagId, data, source) {
    super(tagId, data, source);
  }

    /**
   * Used by the overwritten setUpLoop() to convert an array
   * of numbers into note names
   * @param { Object } part Part object that includes an array of numbers in `part.pattern`
   * @return { Object } Part object with the pattern converted into notes
   */
  convertPattern() {
    var newPartsArray = [];
    this.parts.forEach(part => {
      for (let i = 0; i < part.pattern.length; i++) {
        if (part.pattern[i] == 0) {
          part.pattern[i] = null
        } else {
          part.pattern[i] = part.note;
        }
      }
      newPartsArray.push(part);
    })
    this.parts = newPartsArray;
  }

  makeRows() {
    var rows = 0;
    for (let i = 0; i < this.parts.length; i++) {
      let row = new Row(this.parts[i].name, this.parts[i].pattern);
      this.domObject.appendChild(row.domObject);
      this.rows.push(row);
      rows++;
    }
  }

  /**
   * Create loops, overwrites `Loop.setUpLoop()` to convert
   * an array of numbers into notes, as used by the drum sampler
   * @return { Array } An array of sequence objects
   */
  setUpLoop() {
    var sequences = [];
    for (let i = 0; i < this.parts.length; i++) {
      sequences.push(this.createLoop(i));
    }
  
    return sequences;
  }
}
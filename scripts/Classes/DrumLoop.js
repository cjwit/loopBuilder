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
}
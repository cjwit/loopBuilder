import { Loop } from './Loop.js';

export class DrumLoop extends Loop {
  constructor(tagId, data, source) {
    super(tagId, data, source);
  }

  /**
   * Create loops, overwrites `Loop.setUpLoop()` to convert
   * an array of numbers into notes, as used by the drum sampler
   * @return { Array } An array of sequence objects
   */
  setUpLoop() {
    var sequences = [];
    for (let i = 0; i < this.parts.length; i++) {
      this.parts[i] = this.convertPatternToNotes(this.parts[i]);
      sequences.push(this.createLoop(i));
    }
  
    return sequences;
  }

  /**
   * Used by the overwritten setUpLoop() to convert an array
   * of numbers into note names
   * @param { Object } part Part object that includes an array of numbers in `part.pattern`
   * @return { Object } Part object with the pattern converted into notes
   */
  convertPatternToNotes(part) {
    for (let i = 0; i < part.pattern.length; i++) {
      if (part.pattern[i] == 0) {
        part.pattern[i] = null
      } else {
        part.pattern[i] = part.note;
      }
    }
    return part;
  }
}
import { Tone } from 'tone/build/esm/core/Tone';
import { Loop } from './Loop.js';

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

    /**
   * Used by the overwritten setUpLoop() to convert an array
   * of numbers into note names
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
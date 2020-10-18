import { Tone } from 'tone/build/esm/core/Tone';
import { Loop } from './Loop.js';

/**
 * Defines the scale for a melody loop graphical interface and the pattern
 * conversion method used by this and other melodic loops
 */
export class MelodyLoop extends Loop {
  /**
   * 
   * @param {string} tagId 
   * @param {object} data 
   * @param {Tone.Synth} source 
   */
  constructor(tagId, data, source) {
    super(tagId, data, source);
  }

  /**
   * @return {Array} Scale members as strings with note names and octaves
   */
  setScale() {
    return ["G2", "A3", "Bb3", "C3", "D3", "Eb3", "F3", "G3", "A4", "Bb4", "C4", "D4", "Eb4", "F4", "G4", "A5", "Bb5", "C5"];
  }

  /**
   * Convert an array of note names into a series of patterns for use by `makeRows()`
   */
  convertPattern() {
    var melody = this.parts[0].pattern;
    var newPartsArray = [];

    for (let i = this.scale.length - 1; i >= 0; i--) {
      let currentNotePattern = [];
      let currentNote = this.scale[i];
      melody.forEach(melodyNote => {
        if (melodyNote == currentNote) {
          currentNotePattern.push(currentNote)
        } else {
          currentNotePattern.push(null);
        }
      })
      newPartsArray.push({ note: currentNote, pattern: currentNotePattern });
    }

    this.parts = newPartsArray;
  }

}
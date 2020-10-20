import { Tone } from 'tone/build/esm/core/Tone';
import { Loop } from './Loop.js';
import { Row } from './Row.js';

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
  setScale(scale) {
    switch (scale) {
      case "dorian": return ["C6", "Bb5", "A5", "G5", "F5", "Eb5", "D5", "C5", "Bb4", "A4", "G4", "F4", "Eb4", "D4", "C4"];
    }
    throw "Unknown scale";
  }

  /**
   * Convert an array of note names into a series of patterns for use by `makeRows()`
   */
  convertPattern() {
    var newPartsArray = [];

    for (let i = 0; i < this.scale.length; i++) {
      let currentNote = this.scale[i];
      let currentPart = this.parts[i];
      let convertedPart = [];
      currentPart.forEach(note => {
        if (note == 1) { convertedPart.push(currentNote); }
        else { convertedPart.push(null) }
      });
      newPartsArray.push(convertedPart);
    }
    console.log(newPartsArray);
    this.parts = newPartsArray;
  }

  makeRows() {
    for (let i = 0; i < this.parts.length; i++) {
      let row = new Row(this.source, this.parts[i], this.scale[i]);
      this.domObject.appendChild(row.domObject);
      this.rows.push(row);
    }
  }
}
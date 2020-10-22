import { Tone } from 'tone/build/esm/core/Tone';
import { Row } from './Row.js';

/**
 * Parent interface for MelodyLoop, BassLoop, and DrumLoop
 */
export class Loop {
  /**
   * Synthesizer loop structure and graphical representation
   * @param {string} tagId 
   * @param {object} data 
   * @param {Tone.Synth} source 
   */
  constructor(tagId, data, source) {
    /**
     * @type {string}
     */
    this.tagId = tagId;
    /**
     * @type {Tone.synth}
     */
    this.source = source;
    /**
     * @type {Array}
     */
    this.parts = data.parts;
    /**
     * @type {number}
     */
    this.tempo = data.tempo;
    /**
     * @type {Array}
     */
    this.rows = [];
    /**
     * @type {HTMLElement}
     */
    this.domObject = document.getElementById(tagId);

    /**
     * @type {Array}
     */
    this.scale = this.setScale(data.scale);
    this.convertPattern();
    this.makeRows();
  }

  /**
   * @return {Array} Scale members as strings with note names and octaves
   */
  setScale(scale) {
    switch (scale) {
      case "dorianMelody": return ["C6", "Bb5", "A5", "G5", "F5", "Eb5", "D5", "C5", "Bb4", "A4", "G4", "F4", "Eb4", "D4", "C4"];
      case "dorianBass": return ["C4", "Bb3", "A3", "G3", "F3", "Eb3", "D3", "C3", "Bb2", "A2", "G2", "F2", "Eb2", "D2", "C2"];

      case "majorMelody": return ["C6", "B5", "A5", "G5", "F5", "E5", "D5", "C5", "B4", "A4", "G4", "F4", "E4", "D4", "C4"];
      case "majorBass": return ["C4", "B3", "A3", "G3", "F3", "E3", "D3", "C3", "B2", "A2", "G2", "F2", "E2", "D2", "C2"];
      
      case "minorMelody": return ["C6", "B5", "Ab5", "G5", "F5", "Eb5", "D5", "C5", "B4", "Ab4", "G4", "F4", "Eb4", "D4", "C4"];
      case "minorBass": return ["C4", "B3", "Ab3", "G3", "F3", "Eb3", "D3", "C3", "B2", "Ab2", "G2", "F2", "Eb2", "D2", "C2"];

      case "drumSet": return ["C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4", "D4"];
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
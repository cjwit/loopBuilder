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
    this.scale = this.setScale();
    this.convertPattern();
    this.makeRows();
  }

  /**
   * Overridden by subclasses to set individual scales
   * @return {Array} Scale members as strings with note names and octaves
   */
  setScale() { return [] }

  /**
   * Overridden by subclasses to process incoming pattern arrays and
   * save them to `this.pattern`
   */
  convertPattern() { }

  /**
   * Uses `this.parts` to create and store new row class objects and
   * add them to the DOM
   */
  makeRows() {
    this.parts.forEach(part => {
      let row = new Row(part, this.source);
      this.domObject.appendChild(row.domObject);
      this.rows.push(row);
    })
  }
}
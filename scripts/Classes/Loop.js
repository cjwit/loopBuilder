import * as Tone from 'tone';
import { Row } from './Row.js';

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
    this.makeRows();
    /**
     * @type {Array}
     */
    this.sequences = this.setUpLoop(source);
  }

  makeRows() {
    var notes = ["G2", "A3", "Bb3", "C3", "D3", "Eb3", "F3", "G3", "A4", "Bb4", "C4", "D4", "Eb4", "F4", "G4", "A5", "Bb5", "C5"];
    var melody = this.parts[0].pattern;
    var newPartsArray = [];

    for (let i = notes.length - 1; i >= 0; i--) {
      let currentNotePattern = [];
      let currentNote = notes[i];
      melody.forEach(melodyNote => {
        if (melodyNote == currentNote) {
          currentNotePattern.push(currentNote)
        } else {
          currentNotePattern.push(null);
        }
      })
      let row = new Row (currentNote, currentNotePattern)
      this.domObject.appendChild(row.domObject);
      this.rows.push(row);
      newPartsArray.push({ note: currentNote, pattern: currentNotePattern });
    }

    this.parts = newPartsArray;
  }

  setUpLoop() {
    var sequences = [];
    for (let i = 0; i < this.parts.length; i++) {
      sequences.push(this.createLoop(i));
    }
    return sequences;
  }

  createLoop(partNumber) {
    var sequence = new Tone.Sequence((time, note) => {
      this.rows[partNumber].flashActiveBox();
      this.source.triggerAttackRelease(note, "8n", time);
    }, this.parts[partNumber].pattern).start(0);
    return sequence;
  }
}
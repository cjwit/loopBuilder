import * as Tone from 'tone';
import { Row } from './Row.js';

export class Loop {
  constructor(tagId, data, source) {
    this.tagId = tagId;
    this.source = source;
    this.parts = data.parts;
    this.tempo = data.tempo;
    this.rows = [];
    this.domObject = document.getElementById(tagId);
    this.makeRows();
    this.sequences = this.setUpLoop(source);
  }

  makeRows() {
    var rows = 0;
    for (let i = 0; i < this.parts.length; i++) {
      let row = new Row(this.parts[i]);
      this.domObject.appendChild(row.domObject);
      this.rows.push(row);
      rows++;
    }
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
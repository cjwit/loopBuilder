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
    this.setUpLoop(source);
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
    var needsConverting = false;
    if (typeof this.parts[0].pattern[0] == "number") {
      needsConverting = true;
    }
  
    var sequences = [];
    for (let i = 0; i < this.parts.length; i++) {
      let part = this.parts[i];
      if (needsConverting) {
        part = this.convertPatternToNotes(part);
      }
      sequences.push(this.createLoop(i));
    }
  
    return sequences;
  }

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
  
  createLoop(partNumber) {
    var sequence = new Tone.Sequence((time, note) => {
      this.visualCallback(partNumber);
      this.source.triggerAttackRelease(note, "8n", time);
    }, this.parts[partNumber].pattern).start(0);
    return sequence;
  }

  visualCallback(partNumber) {
    var row = this.rows[partNumber];
    var filledBoxes = row.boxes.filter(box => box.domObject.classList.contains("filled-box"));
  
    var activeBoxIndex = 0;
    for (let i = 0; i < filledBoxes.length; i++) {
      if (filledBoxes[i].domObject.classList.contains("active-box")) {
        filledBoxes[i].domObject.classList.remove("active-box");
        activeBoxIndex = (i + 1) % filledBoxes.length;
        break;
      }
    }
    
    var activeBox = filledBoxes[activeBoxIndex];
    activeBox.domObject.classList.add("active-box");
    activeBox.flash();
  }
}
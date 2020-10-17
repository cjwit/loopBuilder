import { Loop } from './Loop.js';

export class DrumLoop extends Loop {
  constructor(tagId, data, source) {
    super(tagId, data, source);
  }

  setUpLoop() {
    var sequences = [];
    console.log("setup drum loop")
    for (let i = 0; i < this.parts.length; i++) {
      this.parts[i] = this.convertPatternToNotes(this.parts[i]);
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
}
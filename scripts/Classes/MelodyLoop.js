import { Loop } from './Loop.js';
import { Row } from './Row.js';

export class MelodyLoop extends Loop {
  constructor(tagId, data, source) {
    super(tagId, data, source);
  }

  convertPattern() {
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
      newPartsArray.push({ note: currentNote, pattern: currentNotePattern });
    }

    this.parts = newPartsArray;
  }

}
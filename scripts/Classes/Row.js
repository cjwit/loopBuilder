import * as Tone from 'tone';
import { Box } from './Box.js';

/**
 * Creates and controls DOM objects for individual loop rows
 */
export class Row {
  /**
   * @param {object} part
   * @param {string} name
   * @param {string} note
   * @param {Tone.Synth} source 
   */
  constructor(source, pattern, note, name = note) {
    /**
     * @type {number}
     */
    this.labelWidth = 6.0;
    /**
     * @type {string}
     */
    this.name = name;
    /**
     * @type {array}
     */
    this.note = note;
    /**
     * @type {array}
     */
    this.pattern = pattern;
    /**
    * @type {Tone.synth}
    */
    this.source = source;
    this.createLoop();
    /**
     * @type {HTMLElement}
     */
    this.domObject = document.createElement("div");
    this.domObject.classList.add("row-of-boxes");
    this.domObject.appendChild(this.makeRowLabel(this.name));
    /**
     * @type {array}
     */
    this.boxes = this.createBoxes();
  }

  /**
   * 
   * @param {string} label Name of the row, to be added to the DOM object before any boxes
   * @return {HTMLSpanElement} HTML span element with the row name
   */
  makeRowLabel(label) {
    var rowName = document.createElement("span");
    rowName.classList.add("row-label");
    rowName.innerText = label;
    rowName.style.width = this.labelWidth + "em";
    return rowName;
  }

  /**
   * Build and store the series of boxes in the row
   */
  createBoxes() {
    var boxes = [];
    let widthString = this.calculateBoxWidth();
    for (let i = 0; i < this.pattern.length; i++) {
      let box = new Box(this.pattern[i]);
      box.domObject.style.width = widthString;

      // add event listeners
      box.domObject.addEventListener("click", () => {
        this.switchFilledStatus(box);
        this.updateSequencePattern(i, box.filled);
        this.createLoop();
      })

      // display and store the box
      this.domObject.appendChild(box.domObject);
      boxes.push(box);
    };
    return boxes;
  }

  /**
   * Called by `createBoxes`, uses the number of boxes in
   * a row to calculate and set the CSS width property
   */
  calculateBoxWidth() {
    let percent = 100.0 / this.pattern.length + "%";
    let padding = this.labelWidth / this.pattern.length + 0.1;
    return "calc(" + percent + " - " + padding + "em)";
  }

  /**
   * Used by the constructor and click event callbacks to remove the
   * previous loop and replace it with an updated version
   */
  createLoop() {
    // clear the previous sequence if one exists
    if (this.sequence) {
      this.sequence.dispose();
    }

    // create the new sequence for this row
    this.sequence = new Tone.Sequence((time, note) => {
      this.flashActiveBox();
      this.source.triggerAttackRelease(note, "8n", time);
    }, this.pattern).start(0);
  }

  /**
   * Called in the Tone.Sequencer callback to determine which
   * box to animate
   */
  flashActiveBox() {
    var [beat, sixteenth] = Tone.Transport.position.split(/\.|:/).slice(1,3);
    beat = Number(beat);
    sixteenth = Number(sixteenth);
    var currentPosition = beat * 2 + sixteenth / 2, beat, sixteenth;
    if (this.boxes[currentPosition].filled && this.boxes[currentPosition].filled) {
      this.boxes[currentPosition].flash();
    }
  }

  /**
   * Switch the status of a box as filled and not filled
   * @param {Box} box
   */
  switchFilledStatus(box) {
    var filled = false;
    if (box.domObject.classList.contains("filled-box")) {
      box.domObject.classList.remove("filled-box");
      box.domObject.classList.add("empty-box");
    } else {
      box.domObject.classList.add("filled-box");
      box.domObject.classList.remove("empty-box");
      filled = true;
    }
    box.filled = filled;
  }

  /**
   * Update the sequence object passed by Row whenever a user clicks
   * a box. This is part of the Box click event listener
   */
  updateSequencePattern(positionNumber, filled) {
    var pattern = this.sequence._eventsArray;
    if (filled) {
      pattern[positionNumber] = this.note;
    } else {
      pattern[positionNumber] = null;
    }
    this.pattern = pattern;
  }
}

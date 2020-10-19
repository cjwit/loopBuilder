import * as Tone from 'tone';
import { Box } from './Box.js';

/**
 * Creates and controls DOM objects for individual loop rows
 */
export class Row {
  /**
   * @param {object} part
   * @param {Tone.Synth} source 
   */
  constructor(part, source) {
    /**
     * @type {number}
     */
    this.labelWidth = 6.0;
    /**
     * @type {string}
     */
    this.name = part.name;
    /**
     * @type {array}
     */
    this.note = part.note;
    /**
     * @type {array}
     */
    this.pattern = part.pattern;
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
      let box = new Box(this.pattern[i], i);
      box.domObject.style.width = widthString;

      // add event listeners
      box.domObject.addEventListener("click", () => {
        this.sequence.dispose();
        this.switchFilledBox(box);
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
   * Used by `setUpLoop()` to create individual `Tone.Sequence` objects
   * and assign visual callbacks
   * @param {number} partNumber 
   */
  createLoop() {
    this.sequence = new Tone.Sequence((time, note) => {
      // this.flashActiveBox();
      this.source.triggerAttackRelease(note, "8n", time);
    }, this.pattern).start(0);
  }

  /**
   * Called in the Tone.Sequencer callback to determine which
   * box to animate
   */
  flashActiveBox() {
    var filledBoxes = this.boxes.filter(box => box.domObject.classList.contains("filled-box"));
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

  /**
 * Switch the status of a box as filled and not filled
 */
  switchFilledBox(box) {
    var filled = false;
    if (box.domObject.classList.contains("filled-box")) {
      box.domObject.classList.remove("filled-box");
      box.domObject.classList.add("empty-box");
    } else {
      box.domObject.classList.add("filled-box");
      box.domObject.classList.remove("empty-box");
      filled = true;
    }
    this.updateSequence(box.positionNumber, filled)
  }

  /**
   * Update the sequence object passed by Row whenever a user clicks
   * a box. This is part of the Box click event listener
   */
  updateSequence(positionNumber, filled) {
    var pattern = this.sequence._eventsArray;
    if (filled) {
      pattern[positionNumber] = this.note;
    } else {
      pattern[positionNumber] = null;
    }
    this.pattern = pattern;
    this.createLoop();
  }
}

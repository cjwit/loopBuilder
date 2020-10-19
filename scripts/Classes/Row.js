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
    /**
     * @type {array}
     */
    this.sequence = this.createLoop();
    /**
     * @type {array}
     */
    this.boxes = [];
    /**
     * @type {HTMLElement}
     */
    this.domObject = document.createElement("div");
    this.domObject.classList.add("row-of-boxes");
    this.domObject.appendChild(this.makeRowLabel(this.name));

    for (let i = 0; i < this.pattern.length; i++) {
      let box = new Box(i, this.pattern[i], this.note, this.sequence, this.source);
      box.calculateWidth(this.pattern.length, this.labelWidth);
      
      // add event listeners
      box.domObject.addEventListener("click", () => {
        this.sequence.dispose();
        this.switchFilledBox(box);
      })  
      this.domObject.appendChild(box.domObject);
      this.boxes.push(box);
    }
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
   * Used by `setUpLoop()` to create individual `Tone.Sequence` objects
   * and assign visual callbacks
   * @param {number} partNumber 
   */
  createLoop() {
    var sequence = new Tone.Sequence((time, note) => {
      // this.flashActiveBox();
      this.source.triggerAttackRelease(note, "8n", time);
    }, this.pattern).start(0);
    return sequence;
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
    this.updateSequence(box, filled)
  }

  /**
   * Update the sequence object passed by Row whenever a user clicks
   * a box. This is part of the Box click event listener
   */
  updateSequence(box, filled) {
    var pattern = this.sequence._eventsArray;
    if (filled) {
      pattern[box.positionNumber] = this.note;
    } else {
      pattern[box.positionNumber] = null;
    }
    console.log(pattern);
    this.sequence = new Tone.Sequence((time, note) => {
      // this.flashActiveBox();
      this.source.triggerAttackRelease(note, "8n", time);
    }, pattern).start(0);
  }

}

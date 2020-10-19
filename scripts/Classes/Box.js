import * as Tone from "tone";

/**
 * Creates and handles Box object data and
 * DOM interactions, including visual callbacks
 */
export class Box {
  /**
   * @param {number} positionNumber 
   * @param {number} value 
   */
  constructor(positionNumber, value, note, sequence, source) {
    /**
     * @type {number}
     */
    this.value = value;
    /**
     * @type {number}
     */
    this.positionNumber = positionNumber;
    /**
     * @type {string}
     */
    this.note = note;
    /**
     * @type {string} A string in the format of 0:0 showing beat:sixteenth
     */
    this.position = this.getTransportPosition(this.positionNumber);
    /**
     * @type {Tone.Sequence} Parent row's sequence object
     */
    this.sequence = sequence
    /**
    * @type {Tone.synth}
    */
   this.source = source;
    /**
     * @type {HTMLElement}
     */
    this.domObject = document.createElement("span");
    /**
     * @type {boolean}
     */
    this.filled = this.isFilled();
    this.domObject.classList.add("box");
  }

  /**
   * Called by the parent `Row` using the number of boxes
   * to calculate and set the CSS width property
   * @param {number} numberOfBoxes - The number of boxes in the row
   * @param {number} labelWidth - The row name with, to subtract from the calculation
   */
  calculateWidth(numberOfBoxes, labelWidth) {
    let percent = 100.0 / numberOfBoxes + "%";
    let padding = labelWidth / numberOfBoxes + 0.1;
    this.domObject.style.width = "calc(" + percent + " - " + padding + "em)";
  }

  /**
   * Used to calculate the position for Tone.Transport
   * @param {number} positionNumber - This box's place in the row 
   */
  getTransportPosition(positionNumber) {
    var beat = Math.floor(positionNumber / 2);
    var sixteenth = positionNumber % 2;
    return `${beat}:${sixteenth}`;
  }

  /**
   * Iterate through `this.parts` to create and store sequence objects
   */
  setUpLoop() {
    var sequences = [];
    for (let i = 0; i < this.parts.length; i++) {
      sequences.push(this.createLoop(i));
    }
    return sequences;
  }

  /**
   * Used by `setUpLoo()` to create individual `Tone.Sequence` objects
   * and assign visual callbacks
   * @param {number} partNumber 
   */
  createLoop(partNumber) {
    var sequence = new Tone.Sequence((time, note) => {
      this.rows[partNumber].flashActiveBox();
      this.source.triggerAttackRelease(note, "8n", time);
    }, this.parts[partNumber].pattern).start(0);
    return sequence;
  }

  /**
   * Determine whether the current box has an event associated with it
   * and sets the appropriate css class
   */
  isFilled() {
    let filled = false;
    if (this.value != null && this.value != 0) {
      filled = true;
    }
    this.domObject.classList.add(filled ? "filled-box" : "empty-box");
    return filled;
  }

  /**
   * `Box.flash()` is called by a `Row` object to animate 
   * a block as part of the `Tone.Sequencer` callback
   */
  flash() {
    var box = this.domObject;
    var bgColor = window.getComputedStyle(box, null).getPropertyValue("background-color");
    box.style.backgroundColor = "#0a4f2d";
    setTimeout(function () {
      box.animate({ backgroundColor: bgColor }, 1000);
    });
    setTimeout(function () {
      box.style.backgroundColor = bgColor;
    }, 1000);
  }
}
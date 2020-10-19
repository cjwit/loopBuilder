import * as Tone from "tone";

/**
 * Creates and handles Box object data and
 * DOM interactions, including visual callbacks
 */
export class Box {
  /**
   * @param {string} note 
   * @param {number} positionNumber 
   */
  constructor(note, positionNumber) {
    /**
     * @type {number}
     */
    this.note = note;
    /**
     * @type {string} A string in the format of 0:0 showing beat:sixteenth
     */
    this.positionNumber = positionNumber;
    /**
     * @type {string} A string in the format of 0:0 showing beat:sixteenth
     */
    this.positionString = this.getTransportPositionString();
    /**
     * @type {HTMLElement}
     */
    this.domObject = document.createElement("span");
    /**
     * @type {boolean}
     */
    this.filled = this.setFilledStatus();
    this.domObject.classList.add("box");
  }

  /**
   * Used to calculate the position for Tone.Transport
   * @param {number} positionNumber - This box's place in the row 
   */
  getTransportPositionString() {
    var beat = Math.floor(this.positionNumber / 2);
    var sixteenth = this.positionNumber % 2;
    return `${beat}:${sixteenth}`;
  }

  /**
   * Determine whether the current box has an event associated with it
   * and sets the appropriate css class
   */
  setFilledStatus() {
    let filled = false;
    if (this.note != null) {
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
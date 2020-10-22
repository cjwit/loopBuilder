/**
 * Creates and handles Box object data and
 * DOM interactions, including visual callbacks
 */
export class Box {
  /**
   * @param {string} note 
   */
  constructor(note) {
    /**
     * @type {number}
     */
    this.note = note;
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
    $(box).addClass("active-box");
    $(box).removeClass("filled-box");
    $(box).addClass("filled-box", 500, "swing");
    $(box).removeClass("active-box", 500, "swing");
  }
}
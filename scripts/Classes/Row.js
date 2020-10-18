import { Box } from './Box.js';

/**
 * Creates and controls DOM objects for individual loop rows
 */
export class Row {
  /**
   * @param {string} note 
   * @param {array} pattern 
   */
  constructor(note, pattern) {
    /**
     * @type {number}
     */
    this.labelWidth = 6.0;
    /**
     * @type {string}
     */
    this.name = note;
    /**
     * @type {array}
     */
    this.pattern = pattern;
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

    for (let i = 0; i < pattern.length; i++) {
      let box = new Box(i, pattern[i]);
      box.calculateWidth(pattern.length, this.labelWidth);
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
}

export class Box {
  constructor(positionNumber, value) {
    this.value = value;
    this.positionNumber = positionNumber;
    this.position = this.getTransportPosition(this.positionNumber);
    this.domObject = document.createElement("span");
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
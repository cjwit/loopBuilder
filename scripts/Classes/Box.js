export class Box {
  constructor(partName, value, positionNumber) {
    this.value = value;
    this.positionNumber = positionNumber;
    this.position = this.getTransportPosition(this.positionNumber);
    this.domObject = document.createElement("span");
    this.filled = this.isFilled();

    // for identification from the draw command
    let className = partName.toLowerCase().replace(" ", "-") + "-box";
    this.domObject.classList.add(className);
    this.domObject.classList.add("box");
  }

  // called by Row
  calculateWidth(numberOfBoxes, labelWidth) {
    let percent = 100.0 / numberOfBoxes + "%";
    let padding = labelWidth / numberOfBoxes + 0.1;
    this.domObject.style.width = "calc(" + percent + " - " + padding + "em)";
  }

  getTransportPosition(positionNumber) {
    var beat = Math.floor(positionNumber / 2);
    var sixteenth = positionNumber % 2;
    return `${beat}:${sixteenth}`;
  }

  isFilled() {
    let filled = false;
    if (this.value != null && this.value != 0) {
      filled = true;
    }
    this.domObject.classList.add(filled ? "filled-box" : "empty-box");
    return filled;
  }
}
export class Box {
  constructor(partName, value, positionNumber) {
    this.value = value;
    this.positionNumber = positionNumber;
    this.position = this.getTransportPosition(this.positionNumber);
    this.domObject = document.createElement("span");
    this.filled = this.isFilled();
    this.domObject.classList.add("box");
  }

  // called by Row after the box is created
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

  // called by Loop.visualCallback()
  flash() {
    var box = this.domObject;
    box.style.backgroundColor = "#2875a1";
    setTimeout(function () { }, 100);
    setTimeout(function () {
      box.animate({
        backgroundColor: "#570E51"
      }, 1000);
    });
    setTimeout(function () {
      box.style.backgroundColor = "#570E51";
    }, 1000);
  }
}
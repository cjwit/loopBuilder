export class Box {
  constructor(partName, value) {
    this.domObject = document.createElement("span");
    this.domObject.classList.add("box");

    // filled or not
    let status = "empty-box";
    if (value != null && value != 0) {
      status = "filled-box";
    }
    this.domObject.classList.add(status);

    // for identification from the draw command
    let className = partName.toLowerCase().replace(" ", "-") + "-box";
    this.domObject.classList.add(className);
  }

  calculateWidth(numberOfBoxes, labelWidth) {
    let percent = 100.0 / numberOfBoxes + "%";
    let padding = labelWidth / numberOfBoxes + 0.1;
    this.domObject.style.width = "calc(" + percent + " - " + padding + "em)";
  }
}
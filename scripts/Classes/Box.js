export class Box {
  constructor(partName, value) {
    let box = document.createElement("span");
    box.classList.add("box");

    // filled or not
    let status = "empty-box";
    if (value != null && value != 0) {
      status = "filled-box";
    }
    box.classList.add(status);

    // for identification from the draw command
    let className = partName.toLowerCase().replace(" ", "-") + "-box";
    box.classList.add(className);
    this.box = box;
  }

  calculateWidth(numberOfBoxes, labelWidth) {
    let percent = 100.0 / numberOfBoxes + "%";
    let padding = labelWidth / numberOfBoxes + 0.1;
    this.box.style.width = "calc(" + percent + " - " + padding + "em)";
  }
}
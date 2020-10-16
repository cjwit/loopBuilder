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
}
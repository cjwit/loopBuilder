import { Box } from './Box.js';

export class Row {
  constructor(part) {
    this.labelWidth = 6.0;
    this.name = part.name;
    this.boxes = [];
    this.domObject = document.createElement("div");
    this.domObject.classList.add("row-of-boxes");
    this.domObject.appendChild(this.makeRowLabel(part.name));

    for (let i = 0; i < part.pattern.length; i++) {
      let box = new Box(part.name, part.pattern[i], i);
      box.calculateWidth(part.pattern.length, this.labelWidth);
      this.domObject.appendChild(box.domObject);
      this.boxes.push(box);
    }
  }

  makeRowLabel(label) {
    var rowName = document.createElement("span");
    rowName.classList.add("row-label");
    rowName.innerText = label;
    rowName.style.width = this.labelWidth + "em";
    return rowName;
  }
}

import { Box } from './Box.js';

export class Row {
  constructor(part) {
    this.labelWidth = 6.0;

    var row = document.createElement("div");
    row.classList.add("row-of-boxes");
    row = this.makeRowLabel(row, part.name);

    for (let i = 0; i < part.pattern.length; i++) {
      let box = new Box(part.name, part.pattern[i]);
      box.calculateWidth(part.pattern.length, this.labelWidth);
      row.appendChild(box.box);
    }
    return row;
  }

  makeRowLabel(row, label) {
    // add name to the row of boxes
    var rowName = document.createElement("span");
    rowName.classList.add("row-label");
    rowName.innerText = label;
    rowName.style.width = this.labelWidth + "em";
    row.appendChild(rowName);
    return row;
  }
}
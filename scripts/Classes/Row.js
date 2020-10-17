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

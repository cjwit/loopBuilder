import { Row } from './Row.js';

export class Loop {
  constructor(tagId, data) {
    this.tagId = tagId;
    this.parts = data.parts;
    this.source = data.source;
    this.tempo = data.tempo;
    this.domObject = document.getElementById(tagId);
    this.makeRows();
  }

  makeRows() {
    var rows = 0;
    for (let i = 0; i < this.parts.length; i++) {
      let row = new Row(this.parts[i]);
      this.domObject.appendChild(row.domObject);
      rows++;
    }
  }


  // visualCallback(name) {
  //   var name = name.toLowerCase().replace(" ", "-");
  //   var row = Array.from(this.example.getElementsByClassName(name + "-box"));
  //   row = row.filter(box => box.classList.contains("filled-box"));
  //   var numBoxes = row.length;

  //   // determine the active box
  //   var active = 0;
  //   for (let i = 0; i < row.length; i++) {
  //     if (row[i].classList.contains("active-box")) {
  //       row[i].classList.remove("active-box");
  //       active = (i + 1) % numBoxes;
  //       break;
  //     }
  //   }

  //   // style the fade animation for the active box
  //   var activeBox = row[active];
  //   activeBox.style.backgroundColor = "#2875a1";
  //   setTimeout(function () { }, 100);
  //   setTimeout(function () {
  //     activeBox.animate({
  //       backgroundColor: "#570E51"
  //     }, 1000);
  //   });
  //   setTimeout(function () {
  //     activeBox.style.backgroundColor = "#570E51";
  //   }, 1000);

  //   // increment which box is active for the next iteration
  //   activeBox.classList.add("active-box");
  // }
}
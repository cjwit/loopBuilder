export class Loop {
  constructor(tagId, data) {
    this.tagId = tagId;
    this.parts = data.parts;
    this.source = data.source;
    this.tempo = data.tempo;
    this.labelWidth = 6.0;
    this.domObject = document.getElementById(tagId);
    this.makeRows();
  }

  makeRows() {
    var rows = 0;
    for (let i = 0; i < this.parts.length; i++) {
      let row = this.makeBoxes(this.parts[i]);
      this.domObject.appendChild(row);
      rows++;
    }
  }

  makeBoxes(part) {
    var row = document.createElement("div");
    row.classList.add("row-of-boxes");
    row = this.makeRowLabel(row, part.name);

    for (let i = 0; i < part.pattern.length; i++) {
      let box = document.createElement("span");
      box.classList.add("box");

      // filled or not
      let status = "empty-box";
      if (part.pattern[i] != null && part.pattern[i] != 0) {
        status = "filled-box";
      }
      box.classList.add(status);

      // style box width
      let percent = 100.0 / part.pattern.length + "%";
      let padding = this.labelWidth / part.pattern.length + 0.1;
      box.style.width = "calc(" + percent + " - " + padding + "em)"

      // for identification from the draw command
      let className = part.name.toLowerCase().replace(" ", "-") + "-box";
      box.classList.add(className);

      row.appendChild(box);
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
import { Row } from './Row.js';

export class Loop {
  constructor(tagId, data) {
    this.tagId = tagId;
    this.parts = data.parts;
    this.source = data.source;
    this.tempo = data.tempo;
    this.rows = [];
    this.domObject = document.getElementById(tagId);
    this.makeRows();
  }

  makeRows() {
    var rows = 0;
    for (let i = 0; i < this.parts.length; i++) {
      let row = new Row(this.parts[i]);
      this.domObject.appendChild(row.domObject);
      this.rows.push(row);
      rows++;
    }
  }
}
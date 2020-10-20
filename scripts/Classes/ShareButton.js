/**
 * Create share button
 */
export class ShareButton {
  /**
   * Get element and create share button
   */
  constructor() {
    /**
     * @type {HTMLElement}
     */
    this.domObject = document.getElementById("shareButton");
    this.domObject.innerText = "Share";
    this.domObject.addEventListener("click", this.listener.bind(this));
  }

  /**
   * create URL with encoded loops object
   */
  listener() { 
    // get melody rows
    var melodyRows = [];
    var bassRows = [];
    var drumsRows = [];

    var rows = document.getElementsByClassName("row-of-boxes");
    for (let i = 0; i < rows.length; i++) {
      let row = rows[i];
      let rowData = [];
      // iterate through each box in the row
      for (let j = 1; j < row.childNodes.length - 1; j++) {
        // push box status
        let filled = row.childNodes[j].classList.contains("filled-box")
        filled ? rowData.push(1) : rowData.push(0);
      }
      if (i < 15) { melodyRows.push(rowData) }
      else if (i < 30) { bassRows.push(rowData) }
      else { drumsRows.push(rowData) }
    }

    // get tempo
    var tempo = document.getElementById("bpm-span").innerText;

    // get scale (coming later);
    var scale = "dorian";

    var result = {
      melodyLoop: {
        scale: scale + "Melody",
        parts: melodyRows
      },
      bassLoop: {
        scale: scale + "Bass",
        parts: bassRows
      },
      drumLoop: {
        scale: "drumSet",
        parts: drumsRows
      },
      tempo: tempo
    }

    console.log(result);
  }
}
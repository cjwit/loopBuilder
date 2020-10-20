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
      var rowData = this.getLoopArray(rows[i]);
      if (i < 15) { melodyRows.push(rowData) }
      else if (i < 30) { bassRows.push(rowData) }
      else { drumsRows.push(rowData) }
    }

    // get tempo
    var tempo = document.getElementById("bpm-span").innerText;

    // get scale (coming later);
    var scale = "dorian";

    // get effects values

    // compile result
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

    this.copyUrlToClipboard(result);
    this.domObject.innerText = "URL copied to the clipboard";
  }

  getLoopArray(row) {
    let rowData = [];
    // iterate through each box in the row
    for (let j = 1; j < row.childNodes.length - 1; j++) {
      // push box status
      let filled = row.childNodes[j].classList.contains("filled-box")
      filled ? rowData.push(1) : rowData.push(0);
    }
    return rowData;
  }

  /**
   * Create a URL and copy it to the clipboard
   * @param {object} loops Current state of the sequencer loops
   */
  copyUrlToClipboard(loops) {
    // create url string
    var url = new URL(document.URL);
    var urlString = url.host + url.pathname + "?loops=" + JSON.stringify(loops);

    // create dummy object for clipboard copy
    var urlStringDomHolder = document.createElement("input");
    this.domObject.appendChild(urlStringDomHolder);
    urlStringDomHolder.value = urlString;
    urlStringDomHolder.select();
    document.execCommand("copy");
  }
}
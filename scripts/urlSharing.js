import { defaultLoops } from './loops.js';

/**
 * Parse loop from URL
 */
export function parseLoopFromURL() {
  var loops;
  const url = new URL(document.URL);
  if (url.searchParams != "") {
    const decodedString = decodeURIComponent(url.searchParams).replace("loops=", "");
    loops = JSON.parse(decodedString)
    console.log("decoded", loops)
  } else {
    loops = defaultLoops;
    console.log("using default loops", loops)
  }
  return loops;
}

/**
 * Create a URL and copy it to the clipboard
 */
export function copyUrlToClipboard() {
  var loops = getRowData();
  // create url string
  var url = new URL(document.URL);
  var urlString = url.host + url.pathname + "?loops=" + encodeURIComponent(JSON.stringify(loops));

  // create dummy object for clipboard copy
  var urlStringDomHolder = document.createElement("input");
  document.getElementById("shareButton").appendChild(urlStringDomHolder);
  urlStringDomHolder.value = urlString;
  urlStringDomHolder.select();
  document.execCommand("copy");
}

/**
 * Get current sequencer state by scanning DOM objects
 */
function getRowData() {
  // get melody rows
  var melodyRows = [];
  var bassRows = [];
  var drumRows = [];

  var rows = document.getElementsByClassName("row-of-boxes");
  for (let i = 0; i < rows.length; i++) {
    var rowData = getLoopArray(rows[i]);
    if (i < 15) { melodyRows.push(rowData) }
    else if (i < 30) { bassRows.push(rowData) }
    else { drumRows.push(rowData) }
  }

  // get tempo
  var tempo = document.getElementById("bpm-span").innerText;

  // get scale (coming later);
  var scale = "dorian";

  // get effects values
  var melodyEffectValueSpans = document.getElementById("melodyEffects").getElementsByClassName("effectValue");
  var bassEffectValueSpans = document.getElementById("bassEffects").getElementsByClassName("effectValue");
  var melodyEffectLevels = [melodyEffectValueSpans[0].innerText, melodyEffectValueSpans[1].innerText]
  var bassEffectLevels = [bassEffectValueSpans[0].innerText, bassEffectValueSpans[1].innerText]

  // compile result
  var result = {
    melodyLoop: {
      scale: scale + "Melody",
      parts: melodyRows,
      effectLevels: melodyEffectLevels
    },
    bassLoop: {
      scale: scale + "Bass",
      parts: bassRows,
      effectLevels: bassEffectLevels
    },
    drumLoop: {
      scale: "drumSet",
      parts: drumRows
    },
    tempo: tempo
  }

  return result;
}

/**
 * Create array of 1s and 0s based on current box status in a row
 * @param {HTMLElement} row
 * @return {array}
 */
function getLoopArray(row) {
  let rowData = [];
  // iterate through each box in the row
  for (let j = 1; j < row.childNodes.length; j++) {
    // push box status
    let filled = row.childNodes[j].classList.contains("filled-box")
    filled ? rowData.push(1) : rowData.push(0);
  }
  return rowData;
}

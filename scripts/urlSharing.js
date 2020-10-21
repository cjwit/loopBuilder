import { defaultLoops } from './loops.js';

/**
 * Parse loop from URL
 */
export function parseLoopFromURL() {
  const url = new URL(document.URL);
  if (url.searchParams != "") {
    const decodedString = decodeURIComponent(url.searchParams).replace("l=", "");
    var parsedLoops = JSON.parse(decodedString)
    console.log("decoded", parsedLoops)

    var populatedLoops = {
      melodyLoop: {
        scale: parsedLoops.m.s,
        parts: parseLoops(parsedLoops.m.p),
        effectLevels: parsedLoops.m.e
      },
      bassLoop: {
        scale: parsedLoops.b.s,
        parts: parseLoops(parsedLoops.b.p),
        effectLevels: parsedLoops.b.e
      },
      drumLoop: {
        scale: parsedLoops.d.s,
        parts: parseLoops(parsedLoops.d.p)
      },
      tempo: parsedLoops.t
    }
    return populatedLoops

  } else {
    console.log("using default loops")
    return defaultLoops;
  }
}

/**
 * Replace long binary strings with an array of loops
 * @param {string} string 
 * @return {array} Array of loops representing the parsed loop string
 */
function parseLoops(string) {
  // split loop string into substrings of a given length
  var loopArray = string.split("Z")

  // create loops of binary numbers
  var result = [];
  loopArray.forEach(part => {
    // parse the hex representation back to an 8 digit binary string
    part = parseInt(part, 16).toString(2).padStart(8, "0").split("")
    
    // convert strings to integers
    let parsedPart = [];
    part.forEach(value => { parsedPart.push(Number(value)) });
    result.push(parsedPart);
  })

  return result;
}

/**
 * Create a URL and copy it to the clipboard
 */
export function copyUrlToClipboard() {
  var loops = getLoopData();
  // create url string
  var url = new URL(document.URL);
  var urlString = url.host + url.pathname + "?l=" + encodeURIComponent(JSON.stringify(loops));
  console.log(urlString)

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
function getLoopData() {
  // get melody rows
  var melodyRows = "";
  var bassRows = "";
  var drumRows = "";

  var rows = document.getElementsByClassName("row-of-boxes");
  for (let i = 0; i < rows.length; i++) {
    if (i < 15) { melodyRows += getLoopArray(rows[i]) }
    else if (i < 30) { bassRows += getLoopArray(rows[i]) }
    else { drumRows += getLoopArray(rows[i]) }
  }

  // remove trailing split markers
  melodyRows = melodyRows.substr(0, melodyRows.length - 1)
  bassRows = bassRows.substr(0, bassRows.length - 1)
  drumRows = drumRows.substr(0, drumRows.length - 1)

  // get tempo
  var tempo = document.getElementById("bpm-span").innerText;

  // get scale (coming later);
  var scale = "dorian";

  // compile result
  var result = {
    m: {
      s: scale + "Melody",
      p: melodyRows,
      e: getEffectValues("melodyEffects")
    },
    b: {
      s: scale + "Bass",
      p: bassRows,
      e: getEffectValues("bassEffects")
    },
    d: {
      s: "drumSet",
      p: drumRows
    },
    t: tempo
  }

  return result;
}

/**
 * Create array of 1s and 0s based on current box status in a row
 * @param {HTMLElement} row
 * @return {array}
 */
function getLoopArray(row) {
  let rowData = "";
  // iterate through each box in the row
  for (let j = 1; j < row.childNodes.length; j++) {
    // convert row box status to a long binary string
    let filled = row.childNodes[j].classList.contains("filled-box")
    filled ? rowData += "1" : rowData += "0";
  }

  // convert to hex string, add Z for splitting later
  return parseInt(rowData, 2).toString(16) + "Z";
}

function getEffectValues(tag) {
  var melodyEffectValueSpans = document.getElementById(tag).getElementsByClassName("effectValue");
  return [melodyEffectValueSpans[0].innerText, melodyEffectValueSpans[1].innerText]
}
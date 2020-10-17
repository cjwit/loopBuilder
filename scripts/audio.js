import * as Tone from 'tone';

import hihat from "../audio/hihat.mp3";
import snare from "../audio/snare.mp3";
import kick from "../audio/kick.mp3";
import clave from "../audio/clave.mp3";
import ding from "../audio/ding.mp3";
import bongo1 from "../audio/bongo1.mp3";
import bongo2 from "../audio/bongo2.mp3";
import tom3 from "../audio/tom3.mp3";
import cowbell from "../audio/cowbell.mp3";

export function createDrumSampler() {
  const drumSampler = new Tone.Sampler({
    urls: {
      A1: hihat,
      A2: snare,
      A3: kick,
      A4: clave,
      A5: ding,
      A6: bongo1,
      A7: bongo2,
      A8: tom3,
      A9: cowbell,
    },
  }).toDestination();

  return drumSampler;
}

export function createSynth() {
  const synth = new Tone.Synth().toDestination();
  return synth;
}

function convertPatternToNotes(part) {
  for (let i = 0; i < part.pattern.length; i++) {
    if (part.pattern[i] == 0) {
      part.pattern[i] = null
    } else {
      part.pattern[i] = part.note;
    }
  }
  return part;
}

function createLoop(loop, partNumber, source) {
  var sequence = new Tone.Sequence((time, note) => {
    visualCallback(loop, partNumber);
    source.triggerAttackRelease(note, "8n", time);
  }, loop.parts[partNumber].pattern).start(0);
  return sequence;
}

export function setUpLoop(loop, source) {
  var needsConverting = false;
  if (typeof loop.parts[0].pattern[0] == "number") {
    needsConverting = true;
  }

  var sequences = [];
  for (let i = 0; i < loop.parts.length; i++) {
    let part = loop.parts[i];
    if (needsConverting) {
      part = convertPatternToNotes(part);
    }
    sequences.push(createLoop(loop, i, source));
  }

  return sequences;
}

// uses the name of the part to find the row within an example dom object
function visualCallback(loop, partNumber) {
  var name = loop.parts[partNumber].name;

  var row = loop.rows[partNumber];
  var numBoxes = row.boxes.length;

  var filledBoxes = row.boxes.filter(box => box.domObject.classList.contains("filled-box"));

  var activeBoxIndex = 0;
  for (let i = 0; i < filledBoxes.length; i++) {
    if (filledBoxes[i].domObject.classList.contains("active-box")) {
      filledBoxes[i].domObject.classList.remove("active-box");
      activeBoxIndex = (i + 1) % filledBoxes.length;
      break;
    }
  }

  // // style the fade animation for the active box
  var activeBox = filledBoxes[activeBoxIndex];
  activeBox.domObject.style.backgroundColor = "#2875a1";
  setTimeout(function () { }, 100);
  setTimeout(function () {
    activeBox.domObject.animate({
      backgroundColor: "#570E51"
    }, 1000);
  });
  setTimeout(function () {
    activeBox.domObject.style.backgroundColor = "#570E51";
  }, 1000);

  // // increment which box is active for the next iteration
  activeBox.domObject.classList.add("active-box");
}

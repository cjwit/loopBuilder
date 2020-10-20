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
      C3: kick,
      D3: snare,
      E3: hihat,
      F3: cowbell,
      G3: clave,
      A3: bongo1,
      B3: bongo2,
      C4: ding,
      D4: tom3,
    },
  }).toDestination();

  return drumSampler;
}

export function createSynth() {
  const synth = new Tone.PolySynth().toDestination();
  return synth;
}

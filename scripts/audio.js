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

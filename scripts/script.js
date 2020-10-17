import * as Tone from 'tone';
import { Loop } from './Classes/Loop.js';
import { DrumLoop } from './Classes/DrumLoop.js';
import { PlayButton } from './Classes/PlayButton.js';
import { EffectsUI } from './Classes/EffectsUI.js';
import { loops } from './loops.js';
import { createDrumSampler, createSynth } from './audio.js';

// create sources
const drumSampler = createDrumSampler();
// const drumVolumeNode = new Tone.Volume(-6).toDestination();
// drumSampler.connect(drumVolumeNode);

const melodySynth = createSynth();
// const melodyVolumeNode = new Tone.Volume(0).toDestination();
// melodySynth.connect(melodyVolumeNode);

const bassSynth = createSynth();
// const bassVolumeNode = new Tone.Volume(-20).toDestination();
// bassSynth.connect(bassVolumeNode);

// add effects
const melodyEffect1 = new Tone.Distortion({
  distortion: 10,
  wet: 0.5,
})

const melodyEffect2 = new Tone.FeedbackDelay({
  delayTime: "8n",
  feedback: 0.7,
  maxDelay: "4n",
  wet: 0.5
}).toDestination();

melodySynth.chain(melodyEffect1, melodyEffect2);

const bassEffect1 = new Tone.BitCrusher({ 
  bits: 2,
  wet: 0.5
}).toDestination();

const bassEffect2 = new Tone.Chorus({
  depth: 1,
  delayTime: 700,
  feedback: 0.4,
  wet: 0.5,
}).toDestination();

bassSynth.chain(bassEffect1, bassEffect2);

// set up loops
const Play = new PlayButton();
const melodyLoop = new Loop("melodyLoop", loops.melodyLoop, melodySynth);
const bassLoop = new Loop("bassLoop", loops.bassLoop, bassSynth);
const drumLoop = new DrumLoop("drumLoop", loops.drumLoop, drumSampler);

// set up filter listeners
const synthEffects = new EffectsUI("synthEffects", melodyEffect1, melodyEffect2);
const bassEffects = new EffectsUI("bassEffects", bassEffect1, bassEffect2);
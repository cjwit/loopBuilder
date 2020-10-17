import * as Tone from 'tone';
import { Loop } from './Classes/Loop.js';
import { PlayButton } from './Classes/PlayButton.js';
import { EffectsUI } from './Classes/EffectsUI.js';
import { loops } from './loops.js';
import { createDrumSampler, createSynth } from './audio.js';

// create sources
const drumSampler = createDrumSampler();
const drumGainNode = new Tone.Gain(0.5).toDestination();
drumSampler.connect(drumGainNode);

const melodySynth = createSynth();
const melodyGainNode = new Tone.Gain(1).toDestination();
melodySynth.connect(melodyGainNode);

const bassSynth = createSynth();
const bassGainNode = new Tone.Gain(0.8).toDestination();
bassSynth.connect(bassGainNode);

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

// set up graphical elements and loops
const Play = new PlayButton();
const melodyLoop = new Loop("melodyLoop", loops.melodyLoop, melodySynth);
const bassLoop = new Loop("bassLoop", loops.bassLoop, bassSynth);
const drumLoop = new Loop("drumLoop", loops.drumLoop, drumSampler);

// create filter listeners
const synthEffects = new EffectsUI("synthEffects", melodyEffect1, melodyEffect2);
const bassEffects = new EffectsUI("bassEffects", bassEffect1, bassEffect2);
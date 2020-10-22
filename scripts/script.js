import * as Tone from 'tone';
import { Loop } from './Classes/Loop.js';
import { DrumLoop } from './Classes/DrumLoop.js';
import { PlayButton } from './Classes/PlayButton.js';
import { ShareButton } from './Classes/ShareButton.js';
import { ScaleButtons } from './Classes/ScaleButtons.js';
import { TempoSlider } from './Classes/TempoSlider.js';
import { EffectsUI } from './Classes/EffectsUI.js';
import { parseLoopFromURL } from './urlSharing.js';
import { createDrumSampler, createSynth } from './audio.js';

/**
 * 
 * Create sampler and synth instruments
 * and connect volume nodes
 * 
 */
const drumSampler = createDrumSampler();
const drumVolumeNode = new Tone.Volume(-6).toDestination();
drumSampler.connect(drumVolumeNode);

const melodySynth = createSynth();
const melodyVolumeNode = new Tone.Volume(0).toDestination();
melodySynth.connect(melodyVolumeNode);

const bassSynth = createSynth();
const bassVolumeNode = new Tone.Volume(-20).toDestination();
bassSynth.connect(bassVolumeNode);

/**
 * Get the imported loop or set the default
 */
var loops = parseLoopFromURL();

/**
 * 
 * Create effects and link them to the instruments
 * 
 */
const melodyEffect1 = new Tone.Distortion({
  distortion: 10,
  wet: loops.melodyLoop.effectLevels[0]
})

const melodyEffect2 = new Tone.FeedbackDelay({
  delayTime: "8n",
  feedback: 0.7,
  maxDelay: "4n",
  wet: loops.melodyLoop.effectLevels[1]
}).toDestination();

melodySynth.chain(melodyEffect1, melodyEffect2);

const bassEffect1 = new Tone.BitCrusher({ 
  bits: 2,
  wet: loops.bassLoop.effectLevels[0]
}).toDestination();

const bassEffect2 = new Tone.Chorus({
  depth: 1,
  delayTime: 700,
  feedback: 0.4,
  wet: loops.bassLoop.effectLevels[1]
}).toDestination();

bassSynth.chain(bassEffect1, bassEffect2);

/**
 * 
 * Set up loop objects and effects interfaces
 * (needs to be done before creating the scale buttons)
 * 
 */
const melodyLoop = new Loop("melodyLoop", loops.melodyLoop, melodySynth);
const bassLoop = new Loop("bassLoop", loops.bassLoop, bassSynth);
const drumLoop = new DrumLoop("drumLoop", loops.drumLoop, drumSampler);
const synthEffects = new EffectsUI("melodyEffects", loops.melodyLoop.effectLevels, melodyEffect1, melodyEffect2);
const bassEffects = new EffectsUI("bassEffects", loops.bassLoop.effectLevels, bassEffect1, bassEffect2);

/**
 * 
 * Set up interface buttons
 * 
 */
const Play = new PlayButton();
const Share = new ShareButton();
const Scales = new ScaleButtons(loops.melodyLoop.scale.split("M")[0], melodyLoop, bassLoop);
const TempoSliderObject = new TempoSlider(loops.tempo);

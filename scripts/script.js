import * as Tone from 'tone';
import { Loop } from './Classes/Loop.js';
import { DrumLoop } from './Classes/DrumLoop.js';
import { PlayButton } from './Classes/PlayButton.js';
import { ShareButton } from './Classes/ShareButton.js';
import { EffectsUI } from './Classes/EffectsUI.js';
import { defaultLoops } from './loops.js';
import { createDrumSampler, createSynth } from './audio.js';

const drumSampler = createDrumSampler();
const drumVolumeNode = new Tone.Volume(-6).toDestination();
drumSampler.connect(drumVolumeNode);

const melodySynth = createSynth();
const melodyVolumeNode = new Tone.Volume(0).toDestination();
melodySynth.connect(melodyVolumeNode);

const bassSynth = createSynth();
const bassVolumeNode = new Tone.Volume(-20).toDestination();
bassSynth.connect(bassVolumeNode);

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

// get shared loop
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

// default: ?loops=%7B%22drumLoop%22%3A%7B%22scale%22%3A%22drumSet%22%2C%22parts%22%3A%5B%5B1%2C0%2C0%2C0%2C1%2C0%2C0%2C0%5D%2C%5B0%2C0%2C1%2C1%2C0%2C0%2C1%2C0%5D%2C%5B0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B0%2C0%2C1%2C0%2C0%2C1%2C0%2C0%5D%2C%5B0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%5D%7D%2C%22melodyLoop%22%3A%7B%22scale%22%3A%22dorianMelody%22%2C%22parts%22%3A%5B%5B0%2C1%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B0%2C0%2C0%2C1%2C0%2C0%2C0%2C0%5D%2C%5B0%2C0%2C0%2C0%2C0%2C1%2C0%2C0%5D%2C%5B0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B1%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B0%2C0%2C0%2C0%2C0%2C0%2C1%2C0%5D%2C%5B0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%5D%7D%2C%22bassLoop%22%3A%7B%22scale%22%3A%22dorianBass%22%2C%22parts%22%3A%5B%5B0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B0%2C0%2C0%2C0%2C1%2C0%2C0%2C0%5D%2C%5B0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B0%2C0%2C0%2C0%2C0%2C0%2C1%2C0%5D%2C%5B0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B1%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B0%2C0%2C0%2C1%2C0%2C0%2C0%2C0%5D%2C%5B0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%5D%7D%2C%22tempo%22%3A108%7D
// set loop share
// var params = encodeURIComponent(JSON.stringify(loops));

// set up loops
const Play = new PlayButton();
const Share = new ShareButton();
const melodyLoop = new Loop("melodyLoop", loops.melodyLoop, melodySynth);
const bassLoop = new Loop("bassLoop", loops.bassLoop, bassSynth);
const drumLoop = new DrumLoop("drumLoop", loops.drumLoop, drumSampler);

// set up filter listeners
const synthEffects = new EffectsUI("melodyEffects", melodyEffect1, melodyEffect2);
const bassEffects = new EffectsUI("bassEffects", bassEffect1, bassEffect2);

// tempo slider
var slider = document.getElementById("tempo-slider");
var bpmSpan = document.getElementById("bpm-span");
Tone.Transport.bpm.value = loops.tempo;
slider.value = loops.tempo;
bpmSpan.innerText = slider.value;

slider.oninput = function() {
  Tone.Transport.bpm.value = this.value;
  bpmSpan.innerText = slider.value;
}

---
title: Loop Builder
author: "<a href='https://cwitulski.com'>Christopher Witulski</a>"
---
<main>

>Note: This is a thing to see if I can do it. It's only the second thing I've worked on using <a href="https://tonejs.github.io/">Tone.js</a>, but I think I like it so far. It may be the beginning of a few other things, but that will depend.

<div id="playButton">Start (click or use the space bar)</div>

<div id="shareButton">Share</div>

<div class="loop">

<span class = "title">Tempo: <span id = "bpm-span"></span> beats per minute. Use the slider to change it.</span>

<div id="tempo-container">
  <input type="range" min="80" max="200" value="108" class="slider" id="tempo-slider">
</div>
</div>

<div id="melodyLoop" class="loop"><span class = "title">Melody synthesizer</span></div>

<div id="melodyEffects" class="effects"><span class = "title">Drag the circle for effects: &#11013; &#10145; Distortion (<span class = "effectValue"></span>) | &#11014; &#11015; Delay (<span class = "effectValue"></span>)</span></div>

<div id="bassLoop" class="loop"><span class = "title">Bass synthesizer</span></div>

<div id="bassEffects" class="effects"><span class = "title">Drag the circle for effects: &#11013; &#10145; BitCrusher (<span class = "effectValue"></span>) | &#11014; &#11015; Chorus (<span class = "effectValue"></span>)</span></div>

<div id="drumLoop" class="loop"><span class = "title">Drum sampler</span></div>

</main>

  <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  <script src="main.js"></script>

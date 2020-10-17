---
title: Loop Builder
author: "<a href='https://cwitulski.com'>Christopher Witulski</a>"
---
<main>

>Note: This is a thing to see if I can do it. It's only the second thing I've worked on using <a href="https://tonejs.github.io/">Tone.js</a>, but I think I like it so far. It may be the beginning of a few other things, but that will depend.

## Try it yourself

The large boxes under the melody and bass loops control the timbre of those sounds. They are connected to filters: drag the circle to the right or left to change one effect, up and down to change another. Click **Start** or press the **Space Bar** to play and pause the loop.

<div id="playButton">Start</div>

<div id="melodyLoop" class="loop"></div>

Drag the circle to add or remove distortion and delay.

<div id="melodyEffects" class="effects"></div>

<div id="bassLoop" class="loop"></div>

Drag the circle to add or remove "BitCrusher" and "Chorus" effects.

<div id="bassEffects" class="effects"></div>

<div id="drumLoop" class="loop"></div>

</main>

  <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  <script src="main.js"></script>

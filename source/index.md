---
title: Loop Builder
author: Christopher Witulski
---
<main>

## Testing

>Note: this is a draft for a project that spans multiple pages. The layout and look of the page will change depending on where it is published. In its current state, this draft is not intended to represent visual or interactive elements in their final form.

## Try it yourself

The large boxes under the melody and bass loops control the timbre of those sounds. They are connected to filters: drag the circle to the right or left to change one effect, up and down to change another. Click **Start** or press the **Space Bar** to play and pause the loop.

<div id="playButton">Start</div>

<div id="melodyLoop" class="loop"></div>

Drag the circle to add or remove distortion and delay.

<div id="synthEffects" class="effects"></div>

<div id="bassLoop" class="loop"></div>

Drag the circle to add or remove "BitCrusher" and "Chorus" effects.

<div id="bassEffects" class="effects"></div>

<div id="drumLoop" class="loop"></div>

</main>

  <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  <script src="main.js"></script>

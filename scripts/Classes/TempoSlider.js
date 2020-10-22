import * as Tone from 'tone';

/**
 * Create tempo slider object and assign listener
 */
export class TempoSlider {
  /**
   * 
   * @param {number} tempo 
   */
  constructor(tempo) {
    var slider = document.getElementById("tempo-slider");
    var bpmSpan = document.getElementById("bpm-span");
    Tone.Transport.bpm.value = tempo;
    slider.value = tempo;
    bpmSpan.innerText = slider.value;

    slider.oninput = function () {
      Tone.Transport.bpm.value = this.value;
      bpmSpan.innerText = slider.value;
    }
  }
}
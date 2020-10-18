import { Tone } from 'tone/build/esm/core/Tone';
import { MelodyLoop } from './MelodyLoop.js';

/**
 * Defines the scale for a bass loop graphical interface
 */
export class BassLoop extends MelodyLoop {
  /**
   * @param {string} tagId 
   * @param {Object} data 
   * @param {Tone.Sampler} source 
   */
  constructor(tagId, data, source) {
    super(tagId, data, source);
  }

  /**
   * @return {Array} Scale members as strings with note names and octaves
   */
  setScale() {
    return ["G2", "A3", "Bb3", "C3", "D3", "Eb3", "F3", "G3", "A4", "Bb4", "C4"];
  }
}
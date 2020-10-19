import * as Tone from "tone";

/**
 * Create master play button to start Tone.js and control play/pause events
 */
export class PlayButton {
  /**
   * Get element and create play button
   */
  constructor() {
    /**
     * @type {HTMLElement}
     */
    this.domObject = document.getElementById("playButton");
    this.domObject.innerText = "Start";
    this.domObject.start = this.start;
    this.domObject.stop = this.stop;
    this.domObject.addEventListener("click", this.listener.bind(this));
    document.addEventListener("keydown", e => {
      if (e.code === "Space") {
        e.preventDefault();
        this.listener();
      }
    });
  }

  /**
   * Activate Tone.js and control start/stop functionality
   */
  async listener() { 
    if (this.domObject.innerText == "Start") {
      await Tone.start();
      this.start();
    } else {
      this.stop();
    }
  }

  /**
   * Start Tone.Transport
   */
  start() {
    this.domObject.innerText = "Stop";
    Tone.Transport.start("+0.01")
  }

  /**
   * Stop Tone.Transport
   */
  stop() {
    Tone.Transport.stop();
    this.domObject.innerText = "Start";
  }
}
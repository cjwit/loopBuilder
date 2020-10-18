import * as Tone from "tone";

export class PlayButton {
  constructor() {
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

  async listener(e) { 
    if (this.domObject.innerText == "Start") {
      await Tone.start();
      this.start();
    } else {
      this.stop();
    }
  }

  start() {
    this.domObject.innerText = "Stop";
    Tone.Transport.start("+0.01")
  }

  stop() {
    Tone.Transport.stop();
    this.domObject.innerText = "Start";
  }
}
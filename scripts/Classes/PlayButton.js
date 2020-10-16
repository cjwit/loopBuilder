import * as Tone from "tone";

export class PlayButton {
  constructor() {
    this.domObject = document.getElementById("playButton");
    this.domObject.innerText = "Start";
    this.domObject.addEventListener("click", async () => {
      if (this.domObject.innerText == "Start") {
        await Tone.start();
        this.start();
      } else {
        this.stop();
      }
    });
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
import * as Tone from "tone";

/**
 * Create scale button group to change scalar patterns
 */
export class ScaleButtons {
  /**
   * Get element and create play button
   */
  constructor(currentScale, melodyLoop, bassLoop) {
    this.currentScale = currentScale;
    /**
     * @type {HTMLElement}
     */
    this.domObject = document.getElementById("scaleSelector");
    this.melodyLoop = melodyLoop;
    this.bassLoop = bassLoop;

    var scales = ["Minor", "Major", "Dorian", "Pentatonic"];
    this.buttons = []
    for (let i = 0; i < scales.length; i++) {
      var button = document.createElement("span");
      button.innerText = scales[i];
      if (scales[i].toLowerCase() == this.currentScale) {
        button.classList.add("active");
      }
      button.classList.add("scaleButton");
      button.style.marginRight = i != scales.length - 1 ? "1em" : "0em";
      
      this.domObject.appendChild(button)
      this.buttons.push(button);
    }

    this.buttons.forEach(button => {
      button.addEventListener("click", this.listener.bind(this));
    });
  }

  /**
   * Rebuild loops using the selected scale
   */
  listener(e) {
    Tone.Transport.stop();
    this.buttons.forEach(button => {
      button.classList.remove("active");
    })
    e.target.classList.add("active");
    this.currentScale = e.target.innerText.toLowerCase();
    this.melodyLoop.updateRows(this.currentScale + "Melody");
    this.bassLoop.updateRows(this.currentScale + "Bass");
  }
}
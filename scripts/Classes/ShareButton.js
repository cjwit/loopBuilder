import { copyUrlToClipboard } from '../urlSharing.js';

/**
 * Create share button
 */
export class ShareButton {
  /**
   * Get element and create share button
   */
  constructor() {
    /**
     * @type {HTMLElement}
     */
    this.domObject = document.getElementById("shareButton");
    this.domObject.innerText = "Share";
    this.domObject.addEventListener("click", this.listener.bind(this));
  }

  /**
   * create URL with encoded loops object
   */
  listener() {
    copyUrlToClipboard();
    this.domObject.innerText = "URL copied to the clipboard";
    setTimeout(() => {
      this.domObject.innerText = "Share";
    }, 5000)
  }
}
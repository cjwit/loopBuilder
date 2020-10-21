/**
 * Create and handle effects user interaction objects
 */
export class EffectsUI {
  /**
   * @param {string} tagId 
   * @param {array} effectLevels
   * @param {*} effect1 
   * @param {*} effect2 
   */
  constructor(tagId, effectLevels, effect1 = null, effect2 = null) {
    /**
     * @type {string}
     */
    this.tagId = tagId;
    /**
     * @type {HTMLElement}
     */
    this.domObject = document.getElementById(this.tagId);
    /**
     * @type {*}
     */
    this.effect1 = effect1;
    /**
     * @type {*}
     */
    this.effect2 = effect2;
    /**
     * @type {number}
     */
    this.effect1Value = effectLevels[0];
    /**
     * @type {number}
     */
    this.effect2Value = effectLevels[1];
    
    this.valueSpans = this.domObject.getElementsByClassName("effectValue")
    this.valueSpans[0].innerText = this.effect1Value;
    this.valueSpans[1].innerText = this.effect2Value;
    
    this.createHandle();
  }

  /**
   * Create handle for user interactions
   */
  createHandle() {
    var handle = document.createElement("span");
    handle.classList.add("handle");
    this.domObject.appendChild(handle);

    var parent = $(handle).parent();
    var parentWidth = parent.width();
    var parentHeight = parent.height();

    var handle = $(handle); // switch to jQuery
    var handleWidth = handle.outerWidth();
    var handleHeight = handle.outerHeight();

    // calculate the corners of the handle, add a small buffer because of an error/negative result
    handle.offset({ 
      left: parent.offset().left - handleWidth * 0.5 + parentWidth * this.effect1Value,
      top: parent.offset().top - handleHeight * 0.5 + parentHeight * this.effect2Value
    })

    var self = this;
    handle.draggable({ 
      containment: "parent",
      drag: function() {
        var handleOffset = handle.offset();        
        var left = (handleOffset.left - parent.offset().left) / parentWidth;
        var top = (handleOffset.top - parent.offset().top) / parentHeight;

        // guard against GUI issues where handle leaves the lower bound
        self.effect1Value = left > 0 ? left : 0;
        self.effect2Value = top > 0 ? top : 0;
        self.updateEffects();
      }
    });
  }

  /**
   * Read handle location and update effect levels
   */
  updateEffects() {
    if (this.effect1) {
      this.effect1.wet.value = this.effect1Value;
    }
    if (this.effect2) {
      this.effect2.wet.value = this.effect2Value;
    }
    this.valueSpans[0].innerText = Math.round(this.effect1Value * 10) / 10;
    this.valueSpans[1].innerText = Math.round(this.effect2Value * 10) / 10;
  }
}
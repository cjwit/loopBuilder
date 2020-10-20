/**
 * Create and handle effects user interaction objects
 */
export class EffectsUI {
  /**
   * @param {string} tagId 
   * @param {*} effect1 
   * @param {*} effect2 
   */
  constructor(tagId, effectLevels, effect1 = null, effect2 = null) {
    /**
     * @type {string}
     */
    this.tagId = tagId;
    /**
     * @type {*}
     */
    this.effect1 = effect1;
    /**
     * @type {*}
     */
    this.effect2 = effect2;
    this.effect1Value = effectLevels[0];
    this.effect2Value = effectLevels[1];
    /**
     * @type {HTMLElement}
     */
    this.domObject = document.getElementById(this.tagId);

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

    console.log(this.effect1Value, this.effect2Value);

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
        self.effect1Value = left;
        self.effect2Value = top;
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
  }
}
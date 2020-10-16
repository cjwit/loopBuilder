export class EffectsUI {
  constructor(tagId, effect1 = null, effect2 = null) {
    this.tagId = tagId;
    this.effect1 = effect1;
    this.effect2 = effect2;
    this.domObject = document.getElementById(this.tagId);

    this.createHandle();
  }

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

    handle.offset({ 
      left: parent.offset().left + parentWidth / 2 - handleWidth / 2,
      top: parent.offset().top + parentHeight / 2 - handleHeight / 2
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

  updateEffects() {
    if (this.effect1) {
      this.effect1.wet.value = this.effect1Value;
    }
    if (this.effect2) {
      this.effect2.wet.value = this.effect2Value;
    }
  }
}
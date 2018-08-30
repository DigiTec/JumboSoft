"use strict";

function RandomEventManager(game) {
  this.game = game;
  this.randomEvents = null;
  this.appliedEvents = [];

  return Object.seal(this);
}

Object.defineProperties(RandomEventManager.prototype, {
  init: {
    value: function init() {
      this.randomEvents = [new BugEvent(this), new StockEvent(this)];
      this.eventTicks = JumbosoftGame.TicksPerGameYear / 12;
    }
  },

  update: {
    value: function update() {
      if (this.currentEvent) {
        if (!this.currentEvent.update()) {
          // Clear it out, the event was activated.
          this.currentEvent = null;

          // Set up for the next event.
          this.eventTicks = JumbosoftGame.TicksPerGameYear / 12;
        }
      } else {
        this.eventTicks--;
        if (this.eventTicks === 0) {
          this.currentEvent = this.randomEvents.choose();
          this.currentEvent.init();
        }
      }
    }
  },

  addAfterEffect: {
    value: function addAfterEffect(afterAffect) {
      this.appliedEvents.push(afterAffect);
    }
  },

  applyEventEffects: {
    value: function applyEventAffects() {
      if (this.currentEvent) {
        this.currentEvent.applyEventEffects(this.game);
      }
      this.appliedEvents = this.appliedEvents.filter(function(event) {
        return event.applyEventAfterEffects(this.game);
      }, this);
    }
  }
});

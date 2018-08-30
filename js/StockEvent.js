"use strict";

function StockEvent(eventManager) {
  RandomEvent.call(this, eventManager);

  this.activated = false;
}

StockEvent.prototype = Object.create(RandomEvent.prototype);
StockEvent.prototype.constructor = StockEvent;

Object.defineProperties(StockEvent.prototype, {
  activate: {
    value: function activate() {
      this.activated = true;
    }
  },

  init: {
    value: function init() {
      this.eventTicks = JumbosoftGame.TicksPerSecond * 60;
      this.activated = false;
    }
  },

  update: {
    value: function update() {
      // Update the event and determine of it is over
      this.eventTicks--;
      if (this.activated || this.eventTicks === 0) {
        return false;
      }

      return true;
    }
  },

  applyEventEffects: {
    value: function applyEventEffects(game) {
      // Bleed away up to 25% of their production over the course of the minute unless they stop the stock crash.
      game.stockTicker *= 1 - 0.25 / this.eventTicks;
    }
  }
});

"use strict";

function RandomEvent(eventManager) {
    this.eventManager = eventManager;
}

RandomEvent.prototype = Object.create(null);
RandomEvent.prototype.constructor = RandomEvent;

Object.defineProperties(RandomEvent.prototype, {
    applyEventAffects: {
        value: function applyEventAffects(game) {
        }
    }
});
"use strict";

function BugEvent(eventManager) {
    RandomEvent.call(this, eventManager);

    this.activated = false;
}

BugEvent.prototype = Object.create(RandomEvent.prototype);
BugEvent.prototype.constructor = BugEvent;

(function () {
    function BugEventAfterEffect() {
        this.effectTicks = JumbosoftGame.TicksPerSecond * 60 * 3;
    }
    Object.defineProperties(BugEventAfterEffect.prototype, {
        applyEventAfterEffects: {
            value: function applyEventAfterEffects(game) {
                game.stockTicker *= 3;

                this.effectTicks--;
                if (this.effectTicks <= 0) {
                    return false;
                }
                else {
                    return true;
                }
            }
        }
    });

    Object.defineProperties(BugEvent.prototype, {
        activate: {
            value: function activate() {
                this.eventManager.addAfterEffect(new BugEventAfterEffect());
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
                if (this.activated || this.eventTicks <= 0) {
                    return false;
                }

                return true;
            }
        },
    });
})();
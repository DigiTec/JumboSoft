"use strict";

function Achievement(name, description, triggers) {
    TriggerableObject.call(this);

    this.name = name;
    this.description = description;
    this.triggers = triggers;
}

Achievement.prototype = Object.create(TriggerableObject.prototype);
Achievement.prototype.constructor = Achievement;

Object.defineProperties(Achievement.prototype, {
    save: {
        value: function save(rootObject) {
            if (this.triggered) {
                rootObject.achievements[this.name] = 1;
            }
        }
    },
    load: {
        value: function load(rootObject) {
            if (rootObject.achievements.hasOwnProperty(this.name)) {
                this.triggered = true;
            }
        }
    }
});
"use strict";

function TriggerableObject() {
    this.triggered = false;
    this.triggers = null;
    this.subObjects = null;

    this.lastSubObjectTriggered = null;
}

TriggerableObject.prototype = Object.create(null);
TriggerableObject.prototype.constructor = TriggerableObject;

Object.defineProperties(TriggerableObject.prototype, {
    notify: {
        value: function notify(triggeredObject) {
            this.lastSubObjectTriggered = triggeredObject;
        }
    },

    save: {
        value: function save(rootObject) {
            // Saves nothing and passes through to its subObjects
            if (this.trigger) {
                throw new Error("Object has triggers but doesn't support saving.");
            }
            if (this.subObjects) {
                this.subObjects.forEach(function _saveSubObjects(subObject) {
                    subObject.save(rootObject);
                }, this);
            }
        }
    },
    load: {
        value: function load(rootObject) {
            // Loads nothing and passes everything through to its subObjects
            if (this.trigger) {
                throw new Error("Object has triggers but doesn't support loading.");
            }
            if (this.subObjects) {
                this.subObjects.forEach(function _saveSubObjects(subObject) {
                    subObject.save(rootObject);
                }, this);
            }
        }
    },
});
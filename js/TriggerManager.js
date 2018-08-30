"use strict";

Object.defineProperties(this, {
    TriggerManager: {
        value: (function _initTriggerManager() {
            var _triggerObjects = {};
            var _triggerableObjects = [];
            var _triggerManager = {};

            function _evaluateTrigger(trigger) {
                var triggerObject = _triggerObjects[trigger.name];
                if (triggerObject.getTriggerValue(trigger.name) >= trigger.value) {
                    return true;
                }
                else {
                    return false;
                }
            }

            function _evaluateTriggersInternal(triggerParent, triggerableObjects) {
                triggerableObjects.forEach(function (triggerableObject) {
                    if (!triggerableObject.triggered) {
                        var triggerSatisfied = true;
                        if (triggerableObject.triggers !== null) {
                            var triggers = triggerableObject.triggers;
                            for (var i = 0; i < triggers.length; i++) {
                                if (!_evaluateTrigger(triggers[i])) {
                                    triggerSatisfied = false;
                                    break;
                                }
                            }

                        }
                        if (triggerSatisfied) {
                            triggerableObject.triggered = true;
                            triggerParent.notify(triggerableObject);
                        }
                    }

                    if (triggerableObject.subObjects && triggerableObject.subObjects.length > 0) {
                        _evaluateTriggersInternal(triggerableObject, triggerableObject.subObjects);
                    }
                }, this);
            }

            Object.defineProperties(_triggerManager, {
                addTriggerableObject: {
                    value: function addTriggerableObject(triggerableObject) {
                        if (!(triggerableObject instanceof TriggerableObject)) {
                            throw new Error("Parameter triggerableObject is not an instance of TriggerableObject");
                        }
                        if (_triggerableObjects.indexOf(triggerableObject) >= 0) {
                            throw new Error("Parameter triggerableObject has already been registered with this TriggerManager");
                        }
                        _triggerableObjects.push(triggerableObject);
                    }
                },
                addTriggers: {
                    value: function addTriggers(triggerObject) {
                        var triggers = triggerObject.triggerNames;
                        if (!Array.isArray(triggers)) {
                            throw new Error("Parameter triggerObject does not contain a property triggerNames which is an array");
                        }
                        triggers.forEach(function (triggerName) {
                            if (triggerName in _triggerObjects) {
                                throw new Error("The trigger " + triggerName + " is already supported by another object");
                            }
                            _triggerObjects[triggerName] = triggerObject;
                        }, this);
                    }
                },
                evaluateTriggers: {
                    value: function evaluateTriggers() {
                        _evaluateTriggersInternal(this, _triggerableObjects);
                    }
                },
                notify: {
                    value: function notify() {
                        // The manager doesn't care about triggered objects. Lists are expected to manage their own trigger behavior.
                    }
                },
                save: {
                    value: function save(rootObject) {
                        _triggerableObjects.forEach(function _saveSubObjects(triggerableObject) {
                            triggerableObject.save(rootObject);
                        }, this);
                    }
                },
                load: {
                    value: function load(rootObject) {
                        _triggerableObjects.forEach(function _loadSubObjects(triggerableObject) {
                            triggerableObject.load(rootObject);
                        }, this);
                    }
                }
            });

            return Object.seal(_triggerManager);
        })()
    }
});
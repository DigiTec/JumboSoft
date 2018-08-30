"use strict";

function Upgrade(name, description, triggers, price, stockBase, stockMult) {
  TriggerableObject.call(this);

  this.name = name;
  this.description = description;
  this.triggers = triggers;
  this.price = price;
  this.stockBase = stockBase;
  this.stockMult = stockMult;
  this.unlocked = false;
  this.unit = null;

  // Total hack to quickly hook things up to the UI.
  this.uiCategory = triggers[0].name;
}

Upgrade.prototype = Object.create(TriggerableObject.prototype);
Upgrade.prototype.constructor = Upgrade;

Object.defineProperties(Upgrade.prototype, {
  unlock: {
    value: function unlock() {
      if (!this.triggered) {
        throw new Error(
          "You can't unlock an object which has not yet been triggered."
        );
      }
      this.unlocked = true;
      this.unit.changeUpgrades(this);
    }
  },
  applyUpgrade: {
    value: function applyUpgrade(stockPower) {
      stockPower.base += this.stockBase;
      stockPower.mult += this.stockMult;
      return stockPower;
    }
  },

  save: {
    value: function save(rootObject) {
      if (this.unlocked) {
        rootObject.upgrades[this.name] = 1;
      }
    }
  },

  load: {
    value: function load(rootObject) {
      if (rootObject.upgrades.hasOwnProperty(this.name)) {
        this.triggered = true;
        this.unlocked = true;
      }
    }
  }
});

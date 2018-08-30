"use strict";

function Unit(
  unitList,
  name,
  trigger,
  description,
  initialPrice,
  scaleFactor,
  stockPower,
  upgrades
) {
  TriggerableObject.call(this);

  this.unitList = unitList;
  this.name = name;
  this.triggerNames = [trigger];
  this.description = description;
  this.initialPrice = initialPrice;
  this.scaleFactor = scaleFactor;
  this.stockPower = stockPower;
  this.subObjects = upgrades;
  this.owned = 0;
  this.upgradesChanged = true;

  this.subObjects.forEach(function _setUnitForUpgrade(upgrade) {
    upgrade.unit = this;
  }, this);

  TriggerManager.addTriggers(this);
}

Unit.prototype = Object.create(TriggerableObject.prototype);
Unit.prototype.constructor = Unit;

Object.defineProperties(Unit.prototype, {
  computePurchasePrice: {
    value: function computePurchasePrice() {
      return Math.floor(
        Math.geometricSeriesValue(
          this.initialPrice,
          this.scaleFactor,
          this.owned
        )
      );
    }
  },
  buy: {
    value: function buy() {
      this.owned++;
      this.unitList.changeUnits();
    }
  },
  getTriggerValue: {
    value: function getTriggerValue(triggerName) {
      if (triggerName === this.triggerNames[0]) {
        return this.owned;
      }
      throw new Error(
        "Unexpected value for parameter triggerName of " + triggerName
      );
    }
  },

  notify: {
    value: function notify(triggeredObject) {
      this.changeUpgrades(triggeredObject);
    }
  },
  changeUpgrades: {
    value: function changeUpgrades(triggeredObject) {
      this.upgradesChanged = true;
      this.unitList.changeUpgrades(triggeredObject);
    }
  },
  computeTotalUpgrades: {
    value: function computeTotalUpgrades() {
      if (this.upgradesChanged) {
        this.upgradesChanged = false;
        this.totalUpgrades = this.subObjects.reduce(
          function _reduceUnitUpgrades(prev, curr) {
            if (curr.unlocked) {
              return prev + 1;
            } else {
              return prev;
            }
          },
          0
        );
      }
      return this.totalUpgrades;
    }
  },
  computeStockValue: {
    value: function computeStockValue() {
      var stockValue = this.subObjects.reduce(
        function _reduceUpgrades(prev, curr) {
          if (curr.unlocked) {
            return curr.applyUpgrade(prev);
          } else {
            return prev;
          }
        },
        { base: this.stockPower, mult: 1 }
      );

      return this.owned * stockValue.base * stockValue.mult;
    }
  },

  save: {
    value: function save(rootObject) {
      var units = rootObject.units;
      units[this.name] = this.owned;

      this.subObjects.forEach(function _saveUpgrades(upgrade) {
        upgrade.save(rootObject);
      }, this);
    }
  },
  load: {
    value: function load(rootObject) {
      var units = rootObject.units;
      if (units.hasOwnProperty(this.name)) {
        this.owned = units[this.name];
      }

      this.subObjects.forEach(function _loadUpgrades(upgrade) {
        upgrade.load(rootObject);
      }, this);
    }
  }
});

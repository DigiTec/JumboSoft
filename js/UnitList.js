"use strict";

function UnitList(game) {
  TriggerableObject.call(this);

  this.game = game;
  this.unitsChanged = true;
  this.triggeredUpgrades = [];
  this.unlockedUpgrades = [];

  TriggerManager.addTriggers(this);
}

UnitList.prototype = Object.create(TriggerableObject.prototype);
UnitList.prototype.constructor = UnitList;

Object.defineProperties(UnitList.prototype, {
  triggerNames: {
    value: ["totalUnits", "totalUpgrades"]
  },
  changeUnits: {
    value: function changeUnits() {
      this.unitsChanged = true;
    }
  },
  changeUpgrades: {
    value: function changeUpgrades(triggeredObject) {
      this.upgradesChanged = true;
      if (triggeredObject.unlocked) {
        var triggerIndex = this.triggeredUpgrades.indexOf(triggeredObject);
        if (triggerIndex > -1) {
          this.triggeredUpgrades.splice(triggerIndex, 1);
        }
        this.unlockedUpgrades.push(triggeredObject);
      } else {
        if (!triggeredObject.triggered) {
          throw new Error(
            "Object was used in an upgrades notification but was not unlocked or triggered."
          );
        }
        this.triggeredUpgrades.push(triggeredObject);
      }
      this.game.notifyPropertyChanged("upgrades");
    }
  },
  getTriggerValue: {
    value: function getTriggerValue(triggerName) {
      switch (triggerName) {
        case "totalUnits":
          if (this.unitsChanged) {
            this.unitsChanged = false;
            this.totalUnits = this.stockValueObjects.reduce(
              function _reduceUnitListUnits(prev, curr) {
                return prev + curr.owned;
              },
              0
            );
          }
          return this.totalUnits;

        case "totalUpgrades":
          if (this.upgradesChanged) {
            this.upgradesChanged = false;
            this.totalUpgrades = this.subObjects.reduce(
              function _reduceUnitListUpgrades(prev, curr) {
                return prev + curr.computeTotalUpgrades();
              },
              0
            );
          }
          return this.totalUpgrades;
      }
      throw new Error("Unexpected trigger name " + triggerName);
    }
  },
  init: {
    value: function init() {
      if (this.subObjects) {
        throw new Error(
          "The subObjects field must be empty when calling init."
        );
      }

      this.manualTesting = new Unit(
        this,
        "Manual Testing",
        "manual",
        "",
        0,
        0,
        1,
        Upgrades.clickUpgrades.concat(Upgrades.handMadeUpgrades)
      );
      this.manualTesting.buy();
      this.stockValueObjects = [
        new Unit(
          this,
          "Automation Software",
          "automation",
          "",
          20,
          1.15,
          0.2,
          Upgrades.automationUpgrades
        ),
        new Unit(
          this,
          "Contractor",
          "contractor",
          "",
          120,
          1.15,
          1,
          Upgrades.contractorUpgrades
        ),
        new Unit(
          this,
          "New Hardware",
          "hardware",
          "",
          600,
          1.17,
          6,
          Upgrades.hardwareUpgrades
        ),
        new Unit(
          this,
          "Blue Badge",
          "blueBadge",
          "",
          4000,
          1.17,
          32,
          Upgrades.blueBadgeUpgrades
        ),
        new Unit(
          this,
          "Computer Lab",
          "labs",
          "",
          24000,
          1.18,
          128,
          Upgrades.labsUpgrades
        ),
        new Unit(
          this,
          "Architect",
          "architect",
          "",
          75000,
          1.18,
          512,
          Upgrades.architectUpgrades
        ),
        new Unit(
          this,
          "Acquisition",
          "acquisition",
          "",
          300000,
          1.19,
          2048,
          Upgrades.acquisitionUpgrades
        ),
        new Unit(
          this,
          "The Cloud",
          "cloud",
          "",
          2000000,
          1.22,
          16384,
          Upgrades.cloudUpgrades
        )
      ];
      this.subObjects = [this.manualTesting].concat(this.stockValueObjects);
    }
  },
  computeManualStockPower: {
    value: function computeManualStockPower() {
      return this.manualTesting.computeStockValue();
    }
  },
  computeStockValue: {
    value: function computeStockValue() {
      return this.stockValueObjects.reduce(function _reduceUnitsStockValue(
        prev,
        curr
      ) {
        return prev + curr.computeStockValue();
      },
      0);
    }
  },

  save: {
    value: function save(rootObject) {
      rootObject.units = rootObject.units || {};
      rootObject.upgrades = rootObject.upgrades || {};

      this.subObjects.forEach(function _saveUnits(unit) {
        unit.save(rootObject);
      }, this);
    }
  },
  load: {
    value: function load(rootObject) {
      this.subObjects.forEach(function _loadUnits(unit) {
        unit.load(rootObject);
      }, this);

      this.upgradesChanged = true;
      this.unitsChanged = true;
    }
  }
});

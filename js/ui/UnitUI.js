"use strict";

function UnitUI(gameUI, baseName) {
  this.gameUI = gameUI;
  this.baseName = baseName;
  this.unitList = this.gameUI.game.units;
  this.uiElements = [];
}

(function _initUnitUI() {
  function _clickUnit() {
    var purchasePrice = this.unit.computePurchasePrice();
    if (this.list.gameUI.game.buy(purchasePrice)) {
      this.unit.buy();
    }
  }

  Object.defineProperties(UnitUI.prototype, {
    init: {
      value: function init() {
        var units = this.unitList.stockValueObjects;
        var unitCount = units.length;
        for (var i = 0; i < unitCount; i++) {
          var unit = units[i];

          // More strongly bind them later
          var uiElement = Object.create(null);
          uiElement.root = document.getElementById(this.baseName + (i + 1));
          if (uiElement.root) {
            uiElement.root.addEventListener(
              "click",
              _clickUnit.bind({ list: this, unit: unit })
            );
            uiElement.name = uiElement.root.querySelector(".skillName");
            uiElement.cost = uiElement.root.querySelector(".skillCost");
            uiElement.unitCount = uiElement.root.querySelector(".skillUnit");
            uiElement.unit = unit;

            uiElement.name.textContent = uiElement.unit.name;

            this.uiElements.push(uiElement);
          }
        }
      }
    },

    update: {
      value: function update() {
        this.uiElements.forEach(function(uiElement) {
          var purchasePrice = uiElement.unit.computePurchasePrice();

          if (purchasePrice > Math.floor(this.gameUI.game.stocks)) {
            uiElement.root.classList.remove("active");
          } else {
            uiElement.root.classList.add("active");
          }

          if (uiElement.lastPurchasePrice !== purchasePrice) {
            uiElement.lastPurchasePrice = purchasePrice;
            uiElement.cost.textContent = purchasePrice;
          }
          if (uiElement.lastOwned !== uiElement.unit.owned) {
            uiElement.lastOwned = uiElement.unit.owned;
            uiElement.unitCount.textContent = "x" + uiElement.unit.owned;
          }
        }, this);
      }
    }
  });
})();

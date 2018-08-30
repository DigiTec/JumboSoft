"use strict";

function UpgradeUI(gameUI) {
  this.gameUI = gameUI;
  this.units = this.gameUI.game.units;
  this.upgradesChanged = true;

  this.upgradeSlots = [];
  this.usedSlots = [];
  this.usedSlotsMap = [];

  return Object.seal(this);
}

(function _initUpgradeUI() {
  function _attachUpgrade(uiElement, upgrade) {
    uiElement.upgrade = upgrade;
    uiElement.root.upgradeUI = uiElement;
    uiElement.root.classList.add(upgrade.uiCategory);
    uiElement.name.textContent = upgrade.name;
    uiElement.desc.textContent = upgrade.description;
    uiElement.cost.textContent = upgrade.price;

    uiElement.listener = _clickUpgradeButton.bind({
      ui: this,
      uiElement: uiElement
    });
    uiElement.ubtn.addEventListener("click", uiElement.listener);
  }
  function _detachUpgrade(uiElement, upgrade) {
    uiElement.upgrade = null;
    uiElement.root.upgradeUI = null;
    uiElement.root.classList.remove(upgrade.uiCategory);
    uiElement.ubtn.removeEventListener("click", uiElement.listener);
    uiElement.cost.textContent = "";
  }
  function _clickUpgradeButton(evt) {
    var upgrade = this.uiElement.upgrade;
    var game = this.ui.gameUI.game;

    if (upgrade.price <= game.stocks) {
      game.stocks -= upgrade.price;
      upgrade.unlock();
    }
  }

  Object.defineProperties(UpgradeUI.prototype, {
    notifyPropertyChanged: {
      value: function notifyPropertyChanged(property) {
        switch (property) {
          case "upgrades":
            this.upgradesChanged = true;
            break;

          default:
            throw new Error(
              "Unexpected property sent to UpgradeUI: " + property
            );
        }
      }
    },

    init: {
      value: function init() {
        // First get available upgrade slots and stash them off.
        var upgradePanel = document.getElementById("leftPanel");
        var upgradeItem = upgradePanel.firstElementChild;
        while (upgradeItem) {
          var uiElement = Object.seal({
            root: upgradeItem,
            name: upgradeItem.querySelector(".itemName"),
            desc: upgradeItem.querySelector(".itemDesc"),
            cost: upgradeItem.querySelector(".itemCost"),
            ubtn: upgradeItem.querySelector(".itemUpgrade"),
            // Set the upgrade to null, this means this slot has no currently set upgrade
            upgrade: null,
            listener: null
          });
          uiElement.name.textContent = "";
          this.upgradeSlots.push(uiElement);
          upgradeItem = upgradeItem.nextElementSibling;
        }
      }
    },

    update: {
      value: function update() {
        if (this.upgradesChanged) {
          // Clear out any unlocked entries from the UI
          this.units.unlockedUpgrades.forEach(function(upgrade) {
            var upgradeIndex = this.usedSlotsMap.indexOf(upgrade);
            if (upgradeIndex > -1) {
              // Clear out the consumed uiElement
              var uiElement = this.usedSlots[upgradeIndex];
              if (uiElement.upgrade !== upgrade) {
                throw new Error("Something went wrong in our object map.");
              }

              _detachUpgrade.call(this, uiElement, upgrade);

              this.usedSlotsMap.splice(upgradeIndex, 1);
              this.usedSlots.splice(upgradeIndex, 1);

              this.upgradeSlots.push(uiElement);

              // Update the unlocked list
            }
          }, this);

          // If we have some space opened up we should try to fit in some new elements
          if (
            this.upgradeSlots.length > 0 &&
            this.units.triggeredUpgrades.length > 0
          ) {
            this.units.triggeredUpgrades
              .sort(function(upgradeA, upgradeB) {
                return upgradeA.price - upgradeB.price;
              })
              .forEach(function(upgrade) {
                if (this.upgradeSlots.length > 0) {
                  if (this.usedSlotsMap.indexOf(upgrade) === -1) {
                    var uiElement = this.upgradeSlots.take();

                    _attachUpgrade.call(this, uiElement, upgrade);

                    this.usedSlotsMap.push(upgrade);
                    this.usedSlots.push(uiElement);
                  }
                }
              }, this);
          }

          this.upgradesChanged = false;
        }
      }
    }
  });
})();

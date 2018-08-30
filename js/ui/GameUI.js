"use strict";

function GameUI(game) {
  this.game = game;

  this.uiStocks = null;
  this.uiTicker = null;
  this.uiTitle = null;
  this.uiYear = null;
  this.uiDigitAnimationHolder = null;

  this.unitUI = null;
  this.newsUI = null;
  this.upgradeUI = null;
  this.achievementUI = null;

  // Cache variables
  this.lastStockTicker = -1;
  this.lastLevel = null;

  return Object.seal(this);
}

Object.defineProperties(GameUI.prototype, {
  notifyPropertyChanged: {
    value: function notifyPropertyChanged(property) {
      switch (property) {
        case "upgrades":
          this.upgradeUI.notifyPropertyChanged(property);
          break;

        default:
          throw new Error("Unexpected property sent to GameUI: " + property);
      }
    }
  },
  init: {
    value: function init() {
      this.uiStocks = document.getElementById("stockCount");
      this.uiTicker = document.getElementById("SPSCount");
      this.uiTitle = document.getElementById("titleName");
      this.uiYear = document.getElementById("yearCount");
      this.uiDigitAnimationHolder = document.getElementById("digitFallHolder");

      this.uiTitle.textContent = "Unemployed";

      this.unitUI = new UnitUI(this, "Right");
      this.unitUI.init();

      this.newsUI = new NewsUI(this);
      this.newsUI.init();

      this.upgradeUI = new UpgradeUI(this);
      this.upgradeUI.init();

      this.achievementUI = new AchievementUI(this);
      this.achievementUI.init();
    }
  },
  update: {
    value: function update() {
      this.uiStocks.textContent = Math.floor(this.game.stocks);

      if (this.lastStockTicker !== this.game.stockTicker) {
        var SPSCount = this.game.stockTicker.toFixed(1);
        /*
                if (SPSCount <= 0) {
                    this.uiDigitAnimationHolder.classList.remove("digitFallSlow");
                    this.uiDigitAnimationHolder.classList.remove("digitFallMedium");
                    this.uiDigitAnimationHolder.classList.remove("digitFallFast");
                    this.uiDigitAnimationHolder.classList.remove("digitFallSuperFast");
                }
                else if (SPSCount > 1) {
                    this.uiDigitAnimationHolder.classList.add("digitFallSlow");
                }
                else if (SPSCount >= 10 && SPSCount < 100) {
                    this.uiDigitAnimationHolder.classList.add("digitFallMediumdigitFallSuperFast");
                }
                else if (SPSCount >= 100 && SPSCount < 500) {
                    this.uiDigitAnimationHolder.classList.add("digitFallFast");
                }
                else if (SPSCount > 500) {
                    this.uiDigitAnimationHolder.classList.add("digitFallSuperFast");
                }
                */

        this.lastStockTicker = this.game.stockTicker;
        this.uiTicker.textContent = SPSCount;
      }

      var level = this.game.achievements.totalStockTrigger;
      if (this.lastLevel !== level) {
        this.lastLevel = level;
        this.uiTitle.textContent = level.name;
      }

      this.uiYear.innerText = Math.floor(
        this.game.gameTime / JumbosoftGame.TicksPerGameYear
      );

      this.unitUI.update();
      this.newsUI.update();
      this.upgradeUI.update();
      this.achievementUI.update();
    }
  }
});

"use strict";

function JumbosoftGame() {
  TriggerableObject.call(this);

  // Saveable values
  this.stocks = 0;
  this.handMadeStocks = 0;
  this.totalStocks = 0;
  this.clicks = 0;
  this.gameTime = 0;

  // Computed values
  this.stockTicker = 0;

  // UI Elements
  this.gameUI = null;
  this.units = null;
  this.achievements = null;
  this.news = null;

  this.randomEvents = null;

  return Object.seal(this);
}

JumbosoftGame.prototype = Object.create(TriggerableObject.prototype);
JumbosoftGame.prototype.constructor = JumbosoftGame;

Object.defineProperties(JumbosoftGame, {
  TicksPerSecond: { value: 30 },
  TicksPerGameYear: { value: 30 * 60 * 60 },
  TickInterval: { value: 1000 / 30 },
  TicksPerSave: { value: 30 * 60 }
});

Object.defineProperties(JumbosoftGame.prototype, {
  triggerNames: {
    value: [
      "totalStocks",
      "handMadeStocks",
      "stockTicker",
      "clicks",
      "gameYears"
    ]
  },
  getTriggerValue: {
    value: function getTriggerValue(triggerName) {
      switch (triggerName) {
        case "stockTicker":
          return this.stockTicker;
        case "totalStocks":
          return this.totalStocks;
        case "handMadeStocks":
          return this.handMadeStocks;
        case "clicks":
          return this.clicks;
        case "gameYears":
          return Math.floor(this.gameTime / JumbosoftGame.TicksPerGameYear);
      }
      throw new Error("Unexpected trigger name " + triggerName);
    }
  },
  notifyPropertyChanged: {
    value: function notifyPropertyChanged(property) {
      this.gameUI.notifyPropertyChanged(property);
    }
  },
  init: {
    value: function init() {
      TriggerManager.addTriggerableObject(this);
      TriggerManager.addTriggers(this);

      this.subObjects = [];
      this.initUnits();
      this.initAchievements();
      this.initNews();

      this.randomEvents = new RandomEventManager(this);

      this.initUI();
    }
  },
  initUI: {
    value: function initUI() {
      this.gameUI = new GameUI(this);
      this.gameUI.init();
    }
  },
  initUnits: {
    value: function initUnits() {
      this.units = new UnitList(this);
      this.units.init();
      this.subObjects.push(this.units);
    }
  },
  initAchievements: {
    value: function initAchievements() {
      this.achievements = new AchievementList(this);
      this.achievements.init();
      this.subObjects.push(this.achievements);
    }
  },
  initNews: {
    value: function initNews() {
      this.news = new NewsList(this);
      this.news.init();
      this.subObjects.push(this.news);
    }
  },

  click: {
    value: function click() {
      var stockPower = this.units.computeManualStockPower();
      this.handMadeStocks += stockPower;
      this.clicks++;
      this.applyStocks(stockPower);
    }
  },
  applyStocks: {
    value: function applyStocks(stocks) {
      this.stocks += stocks;
      this.totalStocks += stocks;
    }
  },
  buy: {
    value: function buy(price) {
      if (price <= this.stocks) {
        this.stocks -= price;
        return true;
      }
      return false;
    }
  },
  update: {
    value: function update() {
      // Update the current stock ticker. Mainly for UI and Upgrades.
      this.stockTicker = this.units.computeStockValue();

      // Potentially provide modifications based on random events occuring.
      this.randomEvents.applyEventEffects();

      // Compute the actual stock increase for this update.
      var stockIncrease = this.stockTicker / JumbosoftGame.TicksPerSecond;

      this.applyStocks(stockIncrease);
      if (this.gameTime % JumbosoftGame.TicksPerSecond == 0) {
        TriggerManager.evaluateTriggers();
      }
      this.gameUI.update();
      this.gameTime++;

      if (this.gameTime % JumbosoftGame.TicksPerSave === 0) {
        this.saveGame();
      }
    }
  },
  save: {
    value: function save(rootObject) {
      if (rootObject.hasOwnProperty("game")) {
        throw new Error(
          "Property game is already present during save. Duplicate save."
        );
      }

      rootObject.game = {};

      var game = rootObject.game;
      game.stocks = this.stocks;
      game.handMadeStocks = this.handMadeStocks;
      game.totalStocks = this.totalStocks;
      game.clicks = this.clicks;
      game.gameTime = this.gameTime;

      // Users need their units to unlock so they don't have to rebuy things.
      this.units.save(rootObject);
      // Achievements would "re-unlock" and so they would present UI, let's stop that.
      this.achievements.save(rootObject);
      // Skip "news" because it'll automatically unlock and it doesn't have an UI updates that it presents.
    }
  },
  load: {
    value: function load(rootObject) {
      var game = rootObject.game;

      this.stocks = game.stocks;
      this.handMadeStocks = game.handMadeStocks;
      this.totalStocks = game.totalStocks;
      this.clicks = game.clicks;
      this.gameTime = game.gameTime;

      this.units.load(rootObject);
      this.achievements.load(rootObject);
    }
  },
  saveGame: {
    value: function saveGame() {
      var rootObject = {};
      this.save(rootObject);
      window.localStorage["saveGame"] = window.btoa(JSON.stringify(rootObject));
    }
  },
  loadGame: {
    value: function load() {
      if (window.localStorage["saveGame"]) {
        var rootObject = JSON.parse(
          window.atob(window.localStorage["saveGame"])
        );
        this.load(rootObject);
      }
    }
  },
  resetGame: {
    value: function resetGame() {
      window.localStorage.removeItem("saveGame");
      window.location.reload();
    }
  }
});

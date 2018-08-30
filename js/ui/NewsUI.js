"use strict";

function NewsUI(gameUI) {
  this.gameUI = gameUI;
  this.newsList = this.gameUI.game.news;

  this.newsTicksRemaining = 0;
  this.lastNewsItem = null;

  this.uiNews = null;

  return Object.seal(this);
}

Object.defineProperties(NewsUI, {
  NewsTicks: {
    value: 15 * JumbosoftGame.TicksPerSecond
  }
});

Object.defineProperties(NewsUI.prototype, {
  init: {
    value: function init() {
      this.uiNews = document.getElementById("news");
    }
  },

  update: {
    value: function update() {
      if (this.newsTicksRemaining == 0) {
        if (
          this.lastNewsItem !== this.newsList.perLevelNewsItem &&
          Math.randomBoolean()
        ) {
          this.lastNewsItem = this.newsList.perLevelNewsItem;
        } else {
          this.lastNewsItem = this.newsList.unlockedNews.choose();
        }

        this.uiNews.innerHTML = "<p>" + this.lastNewsItem.headline + "</p>";
        this.newsTicksRemaining = NewsUI.NewsTicks;
      }
      this.newsTicksRemaining--;
    }
  }
});

"use strict";

function AchievementUI(gameUI) {
    this.gameUI = gameUI;
    this.achievements = this.gameUI.game.achievements;

    this.uiPanel = null;
    this.uiLeft = null;
    this.uiRight = null;
    this.uiFocus = null;
    this.focusElement = null;
    this.uiElements = [];
}

(function () {
    function _scrollIntoFocus(uiElement) {
        this.uiPanel.scrollLeft = uiElement.uiRoot.offsetLeft - this.uiLeft.offsetWidth;
        this.focusElement = uiElement;

        this.uiName.textContent = this.focusElement.achievement.name;

        if (this.focusElement.achievement.triggered) {
            this.uiDesc.textContent = this.focusElement.achievement.description;
        }
        else {
            this.uiDesc.textContent = "???";
        }
        window.clearTimeout(_scrollTimer);
    }
    function _clickUIElement(evt) {
        var ui = this.ui;
        var uiElement = this.uiElement;

        _scrollIntoFocus.call(ui, uiElement);
    }

    var _scrollTimer;
    function _scrollArbiter(evt) {
        _scrollTimer = setTimeout(_finalizeScroll.bind(this), 300);
    }
    function _finalizeScroll(evt) {
        var uiOffset = Math.clamp(Math.round(this.uiPanel.scrollLeft / this.uiElements[0].uiRoot.offsetWidth), 0, this.uiElements.length - 1);
        _scrollIntoFocus.call(this, this.uiElements[uiOffset]);
    }

    Object.defineProperties(AchievementUI.prototype, {
        init: {
            value: function init() {
                this.uiPanel = document.getElementById("achievementPanel");
                this.uiLeft = this.uiPanel.querySelector(".leftBump");
                this.uiRight = this.uiPanel.querySelector(".rightBump");
                var descPanel = document.getElementById("bottomDescriptionPanel");
                this.uiDesc = descPanel.querySelector(".description");
                this.uiName = descPanel.querySelector(".name");

                this.uiLeft.addEventListener("click", _clickThrough);
                this.uiRight.addEventListener("click", _clickThrough);

                this.uiPanel.addEventListener("scroll", _scrollArbiter.bind(this));

                this.achievements.subObjects.forEach(function _setupAchievementUI(achievement) {
                    var uiElement = {
                        uiRoot: document.createElement("div"),
                        achievement: achievement
                    };
                    this.uiElements.push(uiElement);

                    uiElement.uiRoot.classList.add("achievement");
                    uiElement.uiRoot.addEventListener("click", _clickUIElement.bind({ ui: this, uiElement: uiElement }));
                    this.uiPanel.insertBefore(uiElement.uiRoot, this.uiRight);
                }, this);
                _scrollIntoFocus.call(this, this.uiElements[0]);
            }
        },
        update: {
            value: function update() {
                if (this.achievements.triggeredAchievements.length > 0) {
                    // Show them as pop-ups and then clear them out.
                    this.achievements.triggeredAchievements.length = 0;

                    // For any newly unlocked achievements update the UI.
                }

                if (this.achievements.achievementsChanged) {
                    var newAchievement;
                    this.achievements.achievementsChanged = false;

                    var achievementList = this.achievements.subObjects;
                    var achievementCount = achievementList.length;
                    for (var i = 0; i < achievementCount; i++) {
                        var achievement = achievementList[i];
                        var uiElement = this.uiElements[i];
                        if (achievement != uiElement.achievement) {
                            throw new Error("The achievements lists and UI lists are out of sync :-(");
                        }

                        if (achievement.triggered) {
                            var cl = uiElement.uiRoot.classList;
                            if (!newAchievement) {
                                if (!cl.contains("unlocked")) {
                                    newAchievement = uiElement;
                                }
                            }
                            cl.add("unlocked");
                        }
                    }

                    if (newAchievement) {
                        _scrollIntoFocus.call(this, newAchievement);
                    }
                }
            }
        },
    });
})();
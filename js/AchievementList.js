"use strict";

function AchievementList(game) {
    TriggerableObject.call(this);

    this.game = game;
    this.totalStock = null;
    this.totalStockTrigger = null;
    this.achievementsChanged = false;
    this.triggeredAchievements = [];

    TriggerManager.addTriggers(this);

    return Object.seal(this);
}

AchievementList.prototype = Object.create(TriggerableObject.prototype);
AchievementList.prototype.constructor = AchievementList;

(function () {
    function _createAchievementList(trigger, names, values, description) {
        var achievements = [];

        for (var i = 0; i < names.length; i++) {
            var name = names[i];
            var value = values[i];
            var formattedDescription = description.replace("%d", value);
            achievements.push(new Achievement(name, formattedDescription, [{ name: trigger, value: value }]));
        }

        return achievements;
    };

    Object.defineProperties(AchievementList.prototype, {
        triggerNames: {
            value: ["achievements"]
        },
        getTriggerValue: {
            value: function getTriggerValue(triggerName) {
                if (triggerName === this.triggerNames[0]) {
                    return this.subObjects.reduce(function (prev, curr) {
                        if (curr.triggered) {
                            return prev + 1;
                        }
                        else {
                            return prev;
                        }
                    }, 0);
                }
                throw new Error("Unexpected value for parameter triggerName of " + triggerName);
            }
        },
        notify: {
            value: function notify(triggeredObject) {
                TriggerableObject.prototype.notify.call(this, triggeredObject);

                if (this.totalStock.indexOf(triggeredObject) > -1) {
                    this.totalStockTrigger = triggeredObject;
                }
                this.triggeredAchievements.push(triggeredObject);
                this.achievementsChanged = true;
            }
        },

        init: {
            value: function init() {
                if (this.subObjects) {
                    throw new Error("The subObjects field must be empty when calling init.");
                }

                this.totalStock = _createAchievementList("totalStocks",
                    [
                        "Intern", "SDE", "Experienced SDE", "SDE II", "Experienced SDE II", "Senior SDE",
                        "Experienced Senior SDE", "Principal", "Experienced Principal", "Expert Principal",
                        "Partner", "Experienced Partner", "Expert Partner", "Distinguished Engineer",
                        "Corporate Vice President", "Vice President", "President", "CEO"
                    ],
                    [
                        1, 100, 1000, 10000, 50000, 100000,
                        500000, 2000000, 10000000, 50000000,
                        200000000, 500000000, 1000000000, 10000000000,
                        100000000000, 500000000000, 1000000000000, 5000000000000
                    ],
                    "Earn %d stock");
                var _stockPerSecond = _createAchievementList("stockTicker",
                    [
                        "Wet Feet", "Dabbler", "Training Wheels", "Invested", "Day Trader", "Broker", "Minority Shareholder",
                        "Board Member", "Inner Circle", "Hostile Takeover", "Controlling Interest", "Eggs In One Basket", "Lonely At The Top"
                    ],
                    [
                        1, 10, 50, 250, 1000, 5000, 50000,
                        200000, 500000, 1000000, 10000000, 100000000, 1000000000
                    ],
                    "Earn %d stock per second");
                var _totalManualStock = _createAchievementList("handMadeStocks",
                    [
                        "Janitor", "Working Hard", "Lead By Example", "Printing Money", "Long Hours", "Nose To The Grindstone", "Personal Investment",
                    ],
                    [
                        10, 100, 5000, 100000, 500000, 2000000, 50000000
                    ],
                    "Personally Earned %d Stocks");
                var _totalManualClicks = _createAchievementList("clicks",
                    [
                        "Love That Sound", "Serious Clicks", "Finger Olympics", "Buy A New Mouse", "One Man Army", "Depressed!?!, Get it?", "Overclick"
                    ],
                    [
                        5, 100, 5000, 25000, 100000, 250000, 750000
                    ],
                    "Clicked %d times");
                var _individualUnitCounts = [].concat(
                        _createAchievementList("automation", ["Auto Mate", "No Complaints", "Robots Rights", "Sky Net"], [1, 20, 50, 100], "Acquired %d Automation Assets"),
                        _createAchievementList("contractor", ["Hired Help", "Disposable Army", "Redundancy", "Office Space"], [1, 20, 50, 100], "Acquired %d Contractors"),
                        _createAchievementList("hardware",   ["Beep Beep", "Warming Up In Here", "Super Computer", "Artficially Intelligent"], [1, 20, 50, 100], "Acquired %d Hardware Assets"),
                        _createAchievementList("blueBadge",  ["First Employee", "Company Picnic", "IPO Time", "Downhill From Here"], [1, 20, 50, 100], "Acquired %d Full Timers"),
                        _createAchievementList("labs", ["No Rats Here", "Global Warming", "Power Overwhelming", "A Lab On Every Desktop"], [1, 20, 50, 100], "Acquired %d Lab Spaces"),
                        _createAchievementList("architect", ["I Assert!", "Refactored", "Patterned", "Slipped"], [1, 20, 50, 100], "Acquired %d Software Architects"),
                        _createAchievementList("acquisition", ["That Was Easy!", "Stick Em Up!", "Like Eating Tic-Tacs", "Corporate Boogeyman"], [1, 20, 50, 100], "Acquired %d Companies"),
                        _createAchievementList("cloud", ["For A Rainy Day", "A Storm Is Brewing", "Hurricane Steve", "Solar Winds"], [1, 20, 50, 100], "Acquired %d Clouds, Whatever The Hell That Means")
                    );
                var _totalUnitCounts = _createAchievementList("totalUnits",
                    [
                        "Started in a Garage", "Startup", "Small Company", "Medium Company", "Large Company",
                        "Monopoly", "Conglomerate", "International Organization", "Jumbosoft!"
                    ],
                    [
                        1, 5, 25, 50, 100, 250, 500, 750, 1000
                    ],
                    "Have %d Corporate Assets");
                var _upgradeCounts = _createAchievementList("totalUpgrades",
                    [
                        "I know Kung Fu", "Hardware Enthusiast", "Tech Addict!", "The Borg"
                    ],
                    [
                        1, 5, 25, 50
                    ],
                    "Install %d upgrades.");
                var _yearMilestones = _createAchievementList("gameYears",
                    [
                        "Stock Vest", "Red Annivesary", "Green Anniversary", "Blue Anniversary", "Oversized Crystal", "Monstrously Large Crystal", "Absurdly Large Crystal", "Indentured Servitude", "Ain't Dead Yet!"
                    ],
                    [
                        1, 5, 10, 15, 20, 25, 30, 50, 100
                    ],
                    "Worked %d years at Jumbosoft");

                this.subObjects = [].concat(this.totalStock, _stockPerSecond, _totalManualStock, _totalManualClicks,
                    _individualUnitCounts, _totalUnitCounts, _upgradeCounts, _yearMilestones);
            }
        },

        save: {
            value: function save(rootObject) {
                rootObject.achievements = {};
                this.subObjects.forEach(function _saveAchievements(achievement) {
                    achievement.save(rootObject);
                }, this);
            }
        },
        load: {
            value: function load(rootObject) {
                this.subObjects.forEach(function _loadAchievements(achievement) {
                    achievement.load(rootObject);
                }, this);
                this.totalStock.forEach(function _resetTitle(achievement) {
                    if (achievement.triggered) {
                        this.totalStockTrigger = achievement;
                    }
                }, this);
                this.achievementsChanged = true;
            }
        },
    });
})();
"use strict";

function NewsItem(headline, author, triggers) {
    TriggerableObject.call(this);

    this.headline = headline;
    this.author = author;
    this.triggers = triggers;
}

NewsItem.prototype = Object.create(TriggerableObject.prototype);
NewsItem.prototype.constructor = NewsItem;

Object.defineProperties(NewsItem.prototype, {
});

function LevelAppropriateNewsItem(game) {
    TriggerableObject.call(this);

    this.game = game;
    this.author = "Jiminy";
}

LevelAppropriateNewsItem.prototype = Object.create(TriggerableObject.prototype);
LevelAppropriateNewsItem.prototype.constructor = LevelAppropriateNewsItem;

Object.defineProperties(LevelAppropriateNewsItem.prototype, {
    headline: {
        get: function get_headline() {
            var stockLevels = [
                1, 100, 1000, 10000, 50000, 100000,
                500000, 2000000, 10000000, 50000000,
                200000000, 500000000, 1000000000, 10000000000,
                100000000000, 500000000000, 1000000000000, 5000000000000
            ];

            var maxStockLevel = 0;
            for (var i = 0; i < stockLevels.length; i++) {
                var stockLevel = stockLevels[i];
                if (this.game.totalStocks >= stockLevel) {
                    maxStockLevel = stockLevel;
                }
                else {
                    break;
                }
            }
            switch (maxStockLevel) {
                // Unemployed and Intern
                case 0: return "You were voted most likely to drop out of your college, and you did.";
                case 1: return "Even the other interns pick on you. Maybe you should have tried Goopple?";

                // SDE
                case 100: return "People burst out in laughter when they see you write code.";
                case 1000: return "You now write code every day. You even get to check in sometimes.";

                // SDE II
                case 10000: return "You get to design features for the team. Then you work on something else.";
                case 50000: return "They trust you to interview candidates. You want to tell them to run for their lives.";

                // Senior SDE
                case 100000: return "They let you check in all the code you wrote. Welcome to BUG JAIL!!!!";
                case 500000: return "You are still working through bugs introduced by your former self.";

                // Principal SDE
                case 2000000: return "You've learned some design patterns. Careful, they might think you are an architect.";
                case 10000000: return "You've found that writing the fewest lines of code possible reduces your bug counts.";
                case 50000000: return "You now spend days commenting code you already wrote. What does that do again?";

                // Partner SDE
                case 200000000: return "You signed your life to the company. Holy crap things are worse than you thought.";
                case 500000000: return "Code, what is code? Products, ah, yes, products. And features, yes, features!";
                case 1000000000: return "Your products are loved and admired worldwide. Until people start really using them.";

                // DE, CVP, VP, President, CEO
                case 10000000000: return "You find out you had more than one life to sign away. What do they think you are, a cat?";
                case 100000000000: return "You are a walking, talking puppet for Jumbosoft. Ready to be the guy pulling the strings?";
                case 500000000000: return "Your products now dominate the market. Those above you feel threatended in your presence.";
                case 1000000000000: return "Your presidency is assured after the previous President lost to Goopple.";
                case 5000000000000: return "What does the CEO say? What is your sound? Will we ever know?";
                default: return "You broke the stock market. How did you do it? You also lost all your stock :-(";
            }
        }
    },
});

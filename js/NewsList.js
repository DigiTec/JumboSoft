"use strict";

function NewsList(game) {
    TriggerableObject.call(this);

    this.game = game;
    this.unlockedNews = [];
}

NewsList.prototype = Object.create(TriggerableObject.prototype);
NewsList.prototype.constructor = NewsList;

(function () {
    Object.defineProperties(NewsList.prototype, {
        notify: {
            value: function notify(triggeredObject) {
                TriggerableObject.prototype.notify.call(this, triggeredObject);

                this.unlockedNews.push(triggeredObject);
            }
        },

        init: {
            value: function init() {
                if (this.subObjects) {
                    throw new Error("The subObjects field must be empty when calling init.");
                }

                this.perLevelNewsItem = new LevelAppropriateNewsItem(this.game);

                this.unlockedNews.push(new NewsItem("The software industry is poised to overtake soft drinks in the business category of soft.", "Blurbs Magazine", []));
                this.unlockedNews.push(new NewsItem("Who needs computers. Anyone can figure out 2 + 2 is 5.", "Ran Guy", []));
                this.unlockedNews.push(new NewsItem("We put the soft in business. Drinks are on everyone's mind, who needs these 'wares' things.", "Soft-Drink Advocacy Group", []));
                this.unlockedNews.push(new NewsItem("There are 10 types of people in the world. Those who understand binary and those who don't.", "1337 Zines", []));

                this.subObjects = [
                    // Automation
                    new NewsItem("Automation Software is one of the greatest advancements in history.", "Test E Wan", [{ name: "automation", value: 1}]),
                    new NewsItem("New forms of software automation continue to increase profits for world's largest companies.", "Blurbs Magazine", [{ name: "automation", value: 15 }]),
                    new NewsItem("Automation Software is causing cancer in sea animals. And destroying the rain forest. And, uhm, also puppies. Cute puppies.", "Union of Contract Workers", [{ name: "automation", value: 60 }]),
                    new NewsItem("We are tools, just like most humans. Similar rights requested.", "Automation Software Union", [{ name: "automation", value: 85 }]),

                    // Contractors
                    new NewsItem("Contract Workers are the future of the industry. Quality work for less.", "Union of Contract Workers", [{ name: "contractor", value: 1 }]),
                    new NewsItem("Company goes bankrupt in the aftermath of a Contract Worker strike. Keep your contractors happy.", "Anonymous (contracted by Union of Contract Workers)", [{ name: "contractor", value: 5 }]),
                    new NewsItem("Unemployment rises as companies relieve their full-time employees from their jobs in favor of cheaper more durable Contract Workers.", "Bureau of Unemployement", [{ name: "contractor", value: 15 }]),
                    new NewsItem("3 out of the top 10 most profitable companies in the world now specialize in delivering Contract Workers.", "Blurbs Magazine", [{ name: "contractor", value: 60 }]),
                    new NewsItem("Riots erupt at top companies as Contract Workers demand to be allowed to sublet their positions to other Contract Workers.", "Faux News", [{ name: "contractor", value: 85 }]),

                    // Hardware
                    new NewsItem("128-bit computers are the future. How else will we sell more memory?", "RAM Weekly", [{ name: "hardware", value: 1 }]),
                    new NewsItem("Advancements in GPU performance have made CPUs irrelevant. Move to image based computing imminent.", "DVIDIOT", [{ name: "hardware", value: 15 }]),
                    new NewsItem("Re Moore's Law. Every 2 years you will regret not having bought the latest hardware.", "Gordon Re Moore", [{ name: "hardware", value: 60 }]),
                    new NewsItem("Quantum computers are the savior of human kind. They are terminals to god.", "Bee Leever", [{ name: "hardware", value: 85 }]),

                    // Blue Badge
                    new NewsItem("From janitor to millionaire. The first Jumbosoft employee strikes it big after scribbling on a whiteboard.", "Blurbs Magazine", [{ name: "blueBadge", value: 1 }]),
                    new NewsItem("Your employees remembered your birthday and threw a big party with a cake. You were not invited.", "Jumbosoft Weekly", [{ name: "blueBadge", value: 15 }]),
                    new NewsItem("Your cubicle solution to overcrowding has increased productivity. You call it Agile.", "Jumbosoft Weekly", [{ name: "blueBadge", value: 60 }]),
                    new NewsItem("Jumbosoft declares itself a country. Increased hiring in milit..., erm, security positions.", "", [{ name: "blueBadge", value: 85 }]),

                    // Labs
                    new NewsItem("Our lab is broken, it keeps producing the same result. 42?", "R&D Department", [{ name: "labs", value: 1 }]),
                    new NewsItem("Your company has computed the quintillionth digit of PI. Still working on the preceding digits.", "R&D Department", [{ name: "labs", value: 15 }]),
                    new NewsItem("Jumbosoft recently acquired new labs. When asked why, they replied, 'Because we can!'", "Blurbs Magazine", [{ name: "labs", value: 60 }]),
                    new NewsItem("Jumbosoft labs have locked down access and are suspected to be self replicating. Quarantines necessary.", "Security Department", [{ name: "labs", value: 85 }]),

                    // Architects
                    new NewsItem("Is Jumbosoft going into the construction business? First architect hired!", "Blurbs Magazine", [{ name: "architect", value: 1 }]),
                    new NewsItem("Jumbosoft architects create a new virtual world. Call it Second Hell. Life is bad enough already.", "Blurbs Magazine", [{ name: "architect", value: 15 }]),
                    new NewsItem("Because you like design patterns so they created a new design pattern for designing design patterns.", "Xzibit", [{ name: "architect", value: 60 }]),
                    new NewsItem("Jumbosoft architects release new Inception operating system. Claims that it contains all other operating systems.", "Blurbs Magazine", [{ name: "architect", value: 85 }]),

                    // Acquisitions
                    new NewsItem("Jumbosoft makes news as a benefactor and shephard of small tech companies with big ideas.", "Investor Magazine", [{ name: "acquisition", value: 1 }]),
                    new NewsItem("Subsidiaries of Jumbosoft produce exponential results after geometric injections of technology.", "Blurbs Magazine", [{ name: "acquisition", value: 15 }]),
                    new NewsItem("FTC launches investigation into Jumbosoft regarding monopolistic practices. Stocks, however, soar!", "Investor Magazine", [{ name: "acquisition", value: 60 }]),
                    new NewsItem("Jumbosoft begins throwing back acquisitions. Claims catch and release practices will help sustain the ecosystem.", "Investor Magazine", [{ name: "acquisition", value: 85 }]),

                    // Cloud
                    new NewsItem("Jumbosoft buys largest umbrella company as it announces heavy investment into clouds.", "Blurbs Magazine", [{ name: "cloud", value: 1 }]),
                    new NewsItem("Jumbosoft moves to Seattle. When asked why, 'We hear Seattle is conducive to clouds'.", "Blurbs Magazine", [{ name: "cloud", value: 15 }]),
                    new NewsItem("Nigerian farmers confused by record rainfalls. Jumbosoft trumpets the results of cloud investment.", "UNICEF", [{ name: "cloud", value: 60 }]),
                    new NewsItem("Increases in public and private clouds significantly lowers the risk of skin cancer.", "Jumbosoft Medical Assocation", [{ name: "cloud", value: 85 }]),

                    /* Unit Templates
                    new NewsItem("", "", [{ name: "", value: 1 }]),
                    new NewsItem("", "", [{ name: "", value: 15 }]),
                    new NewsItem("", "", [{ name: "", value: 60 }]),
                    new NewsItem("", "", [{ name: "", value: 85 }]),
                    */
                ];
            }
        }
    });
})();
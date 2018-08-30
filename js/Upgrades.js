"use strict";

Object.defineProperties(this, {
  Upgrades: {
    value: (function _initUpgrades() {
      var _upgrades = {};

      function _createScaledUpgradeSet(
        upgradeNames,
        upgradeDescriptions,
        trigger,
        initialTriggerValue,
        triggerScale,
        initialPurchaseValue,
        purchaseScale,
        initialBase,
        baseScale,
        initialMult,
        multScale
      ) {
        var upgradeSet = [];

        for (var i = 0; i < upgradeNames.length; i++) {
          var upgradeName = upgradeNames[i];
          var upgradeDesc = upgradeDescriptions[i];

          upgradeSet.push(
            new Upgrade(
              upgradeName,
              upgradeDesc,
              [
                {
                  name: trigger,
                  value: Math.geometricSeriesValue(
                    initialTriggerValue,
                    triggerScale,
                    i
                  )
                }
              ],
              Math.geometricSeriesValue(initialPurchaseValue, purchaseScale, i),
              Math.geometricSeriesValue(initialBase, baseScale, i),
              Math.geometricSeriesValue(initialMult, multScale, i)
            )
          );
        }
        return Object.seal(upgradeSet);
      }

      _upgrades.clickUpgrades = _createScaledUpgradeSet(
        [
          "Manual Testing For Dummies",
          "Jumbosoft Optical Mouse",
          "CHK Builds",
          "Application Verifier",
          "Fault Injection",
          "Templates",
          "C++",
          "C#",
          "Lambdas"
        ],
        [
          "Has to be better than Yoga for Dummies right?",
          "You now find bugs because you click faster than everyone else.",
          "You gleefully assert you'll find more bugs this way.",
          "Now you can file bugs that nobody else can figure out how to fix.",
          "No more bugs? Go ahead and inject a few extras.",
          "You mean you don't have to write the same function for every type?",
          "C only better, because you know, + means good right?",
          "Everyone knows that is actually 4 pluses. And 4 is better than 2!",
          "An entire program in one single string of code. Lambdas ROCK!"
        ],
        "clicks",
        25,
        5,
        100,
        15,
        1,
        5,
        0,
        0
      );
      _upgrades.handMadeUpgrades = _createScaledUpgradeSet(
        [
          "Commemorative Wall Hanging",
          "BBQ Set",
          "401k",
          "ESPP",
          "Porsche Boxster",
          "College Fund",
          "Ameritrade",
          "Goopple",
          "Raise your Hand"
        ],
        [
          "You have just enough stock left over to hang one on the wall. Inspiration!",
          "Cash in those stocks for some good eats. Brain FOOOOOOOOD!",
          "A little bit of fun, a little bit of future. More like .401k, but its a start.",
          "Your company seems to be growing. Maybe you should make a bit more of it yours.",
          "Maybe save up for the Cayman next time? What's next? A goatee?",
          "You already bought your mid-life crisis. Now pony up for your dear children.",
          "You can no longer manage your own wealth. Get some 22 year old to do it for you.",
          "Funds crashed, put it all in Goopple, they seem to be unstoppable.",
          "Your new seat on the board means no more voting by proxy. Change the world!"
        ],
        "handMadeStocks",
        100,
        8,
        250,
        5,
        0,
        0,
        2,
        1
      );
      _upgrades.automationUpgrades = [
        new Upgrade(
          "Balancing Bird",
          "Stops working after a few hundred pecks...",
          [{ name: "automation", value: 1 }],
          Math.geometricSeriesValue(100, 5, 0),
          0.1,
          0
        ),
        new Upgrade(
          "Broken Keyboard",
          "What a sap your buddy is. If only he knew your intent...",
          [{ name: "automation", value: 15 }],
          Math.geometricSeriesValue(100, 5, 2),
          0,
          2
        ),
        new Upgrade(
          "Send Input",
          "You write one line of code, powered by rand()...",
          [{ name: "automation", value: 25 }],
          Math.geometricSeriesValue(100, 5, 4),
          0,
          2
        ),
        new Upgrade(
          "Dyson AC41",
          "Auto Clicker with Root CycloKey Technology.",
          [{ name: "automation", value: 50 }],
          Math.geometricSeriesValue(100, 5, 6),
          0,
          2
        )
      ];
      _upgrades.contractorUpgrades = [
        new Upgrade(
          "Red Goat",
          "Caffeine always worked for you, why not share the secret!",
          [{ name: "contractor", value: 1 }],
          Math.geometricSeriesValue(500, 5, 0),
          0.8,
          0
        ),
        new Upgrade(
          "Overtime",
          "Grind the gears and pay a lot for a little bit!",
          [{ name: "contractor", value: 15 }],
          Math.geometricSeriesValue(500, 5, 1),
          0,
          2
        ),
        new Upgrade(
          "Benefits",
          "Blurring the lines your new act inspires great output.",
          [{ name: "contractor", value: 25 }],
          Math.geometricSeriesValue(500, 5, 3),
          0,
          2
        ),
        new Upgrade(
          "Implants",
          "Is it REALLY unethical if they sign the paper!",
          [{ name: "contractor", value: 50 }],
          Math.geometricSeriesValue(500, 5, 6),
          0,
          2
        )
      ];
      _upgrades.hardwareUpgrades = [
        new Upgrade(
          "Quad Core Desktops",
          "Your software keeps getting slower, so buy faster hardware!",
          [{ name: "hardware", value: 1 }],
          Math.geometricSeriesValue(5000, 5, 0),
          4,
          0
        ),
        new Upgrade(
          "Multi Mon",
          "Now your employees can work and surf the web at the same time. Brilliant!",
          [{ name: "hardware", value: 15 }],
          Math.geometricSeriesValue(5000, 5, 1),
          0,
          2
        ),
        new Upgrade(
          "SSDs",
          "The decrease in space results in less personal crap on the machines!",
          [{ name: "hardware", value: 25 }],
          Math.geometricSeriesValue(5000, 5, 4),
          0,
          2
        ),
        new Upgrade(
          "Goopple Glass",
          "Now you can see EVERYTHING your employees see. Shhh!",
          [{ name: "hardware", value: 50 }],
          Math.geometricSeriesValue(5000, 5, 7),
          0,
          2
        )
      ];
      _upgrades.blueBadgeUpgrades = [
        new Upgrade(
          "Compete Theory",
          "Pit everyone against each other, rank them and pay them accordingly.",
          [{ name: "blueBadge", value: 1 }],
          Math.geometricSeriesValue(40000, 5, 0),
          10,
          0
        ),
        new Upgrade(
          "Jumbosoft Craptops",
          "You have leftover prototype units, turn it into a benefit.",
          [{ name: "blueBadge", value: 15 }],
          Math.geometricSeriesValue(40000, 5, 1),
          0,
          2
        ),
        new Upgrade(
          "Corporate Strategy",
          "Gut your competition and take their finest thinkers.",
          [{ name: "blueBadge", value: 25 }],
          Math.geometricSeriesValue(40000, 5, 4),
          0,
          2
        ),
        new Upgrade(
          "Stock Awards",
          "Shower your employees with stocks they won't get for years.",
          [{ name: "blueBadge", value: 50 }],
          Math.geometricSeriesValue(40000, 5, 7),
          0,
          2
        )
      ];
      _upgrades.labsUpgrades = [
        new Upgrade(
          "Fiber",
          "More than a breakfast necessity, fiber improves your lab efficiency.",
          [{ name: "labs", value: 1 }],
          Math.geometricSeriesValue(200000, 5, 0),
          50,
          0
        ),
        new Upgrade(
          "Node.js",
          "Unused servers, make it easier for developers to overload them.",
          [{ name: "labs", value: 15 }],
          Math.geometricSeriesValue(200000, 5, 1),
          0,
          2
        ),
        new Upgrade(
          "MOAR GPUs",
          "You cuda bought more servers, but your DVIDIOT investment could use a bump.",
          [{ name: "labs", value: 25 }],
          Math.geometricSeriesValue(200000, 5, 4),
          0,
          2
        ),
        new Upgrade(
          "Quantum Cores",
          "You have too much unsorted data. No worries, some blue guy has the solution.",
          [{ name: "labs", value: 50 }],
          Math.geometricSeriesValue(200000, 5, 7),
          0,
          2
        )
      ];
      _upgrades.architectUpgrades = [
        new Upgrade(
          "Soapbox",
          "Turns out architects spend a lot of time on these. Don't leave yours hanging.",
          [{ name: "architect", value: 1 }],
          Math.geometricSeriesValue(750000, 5, 0),
          150,
          0
        ),
        new Upgrade(
          "Nerf Guns",
          "Creative minds demand these sorts of, uhm, diversions.",
          [{ name: "architect", value: 15 }],
          Math.geometricSeriesValue(750000, 5, 1),
          0,
          2
        ),
        new Upgrade(
          "Design Patterns",
          "Your architects were running out so you bought them a few more to play with.",
          [{ name: "architect", value: 25 }],
          Math.geometricSeriesValue(750000, 5, 4),
          0,
          2
        ),
        new Upgrade(
          "Office in Maui",
          "A timely promotional benefit. Those brainiacs were ruining the company!",
          [{ name: "architect", value: 50 }],
          Math.geometricSeriesValue(750000, 5, 7),
          0,
          2
        )
      ];
      _upgrades.acquisitionUpgrades = [
        new Upgrade(
          "Startupalooza",
          "You host an event to promote startups. You then shut them down.",
          [{ name: "acquisition", value: 1 }],
          Math.geometricSeriesValue(2000000, 5, 0),
          1000,
          0
        ),
        new Upgrade(
          "Patent Troll",
          "Big, ugly and grey this guy really changes your bargaining position.",
          [{ name: "acquisition", value: 15 }],
          Math.geometricSeriesValue(2000000, 5, 1),
          0,
          2
        ),
        new Upgrade(
          "1 Meelion Dollars",
          "You just keep saying this at the negotiation table. You get some bites.",
          [{ name: "acquisition", value: 25 }],
          Math.geometricSeriesValue(2000000, 5, 4),
          0,
          2
        ),
        new Upgrade(
          "1 Beeeelion Dollars",
          "You are looking a bit pale, but this seems to attract even more bites.",
          [{ name: "acquisition", value: 50 }],
          Math.geometricSeriesValue(2000000, 5, 7),
          0,
          2
        )
      ];
      _upgrades.cloudUpgrades = [
        new Upgrade(
          "Flavor Flav",
          'You hire flavor flav to hype your new slogan, "To the CLOUD!"',
          [{ name: "cloud", value: 1 }],
          Math.geometricSeriesValue(20000000, 5, 0),
          5000,
          0
        ),
        new Upgrade(
          "GooTube!",
          "You release funny GooTube videos showing how awesome the cloud is!",
          [{ name: "cloud", value: 15 }],
          Math.geometricSeriesValue(20000000, 5, 1),
          0,
          2
        ),
        new Upgrade(
          "Executive Retreat",
          "People start building on your cloud. Time to figure out what it actually is.",
          [{ name: "cloud", value: 25 }],
          Math.geometricSeriesValue(20000000, 5, 4),
          0,
          2
        ),
        new Upgrade(
          "Moonshot",
          'How do you one up yourself on this cloud thing? "To the MOON!"',
          [{ name: "cloud", value: 50 }],
          Math.geometricSeriesValue(20000000, 5, 7),
          0,
          2
        )
      ];

      return Object.freeze(_upgrades);
    })()
  }
});

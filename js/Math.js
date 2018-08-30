"use strict";

Object.defineProperties(Math, {
    geometricSeries: {
        value: function geometricSeries(initialTerm, factor, termsToCompute) {
            return (initialTerm * (1 - Math.pow(factor, termsToCompute))) / (1 - factor);
        }
    },
    geometricSeriesValue: {
        value: function geometricSeriesValue(initialTerm, factor, termsToCompute) {
            return initialTerm * Math.pow(factor, termsToCompute);
        }
    },
    baseLog: {
        value: function baseLog(number, base) {
            return Math.log(number) / Math.log(base);
        }
    },
    distance2d: {
        value: function distance2d(x1, y1, x2, y2) {
            var diffX = x1 - x2;
            var diffY = y1 - y2;
            return Math.sqrt(diffX * diffX + diffY * diffY);
        }
    },
    clamp: {
        value: function clamp(value, low, high) {
            if (value < low) {
                return low;
            }
            else if (value > high) {
                return high;
            }
            else {
                return value;
            }
        }
    },
    randomBoolean: {
        value: function randomBoolean() {
            if (Math.random() > 0.5) {
                return true;
            }
            else {
                return false;
            }
        }
    }
});
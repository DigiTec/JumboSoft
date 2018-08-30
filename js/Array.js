"use strict";

Object.defineProperties(Array.prototype, {
    choose: {
        value: function choose() {
            var index = Math.floor(Math.random() * this.length);
            return this[index];
        }
    },
    take: {
        value: function take() {
            var index = Math.floor(Math.random() * this.length);
            return this.splice(index, 1)[0];
        }
    }
});
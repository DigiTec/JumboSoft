"use strict";

// IE supports duck typed classList so move it from HTMLElement to Element to support SVG.
// FireFox already has classList on Element so make sure not to tweak anything there.
// Chrome supports classList on every element, but as an instance property so no need to move anything there.
(function _initClassListPolyFill() {
  if (
    !Element.prototype.hasOwnProperty("classList") &&
    HTMLElement.prototype.hasOwnProperty("classList")
  ) {
    Object.defineProperty(
      Element.prototype,
      "classList",
      Object.getOwnPropertyDescriptor(HTMLElement.prototype, "classList")
    );
  }

  if (DOMTokenList) {
    (function _initDOMTokenListPolyFill() {
      function _argumentsToClasses(args) {
        var classes = {};
        Array.prototype.forEach.call(args, function _processArgs(arg) {
          if (Array.isArray(arg)) {
            arg.forEach(function _processArrayOfArgs(arrayArg) {
              classes[arrayArg] = null;
            });
          } else {
            classes[arg] = null;
          }
        });
        return Object.freeze(classes);
      }

      Object.defineProperties(DOMTokenList.prototype, {
        addAll: {
          value: function addAll() {
            var classes = _argumentsToClasses(arguments);
            for (var i in classes) {
              this.add(i);
            }
          }
        },
        removeAll: {
          value: function removeAll() {
            var classes = _argumentsToClasses(arguments);
            for (var i in classes) {
              this.remove(i);
            }
          }
        },
        containsAny: {
          value: function containsAny() {
            var classes = _argumentsToClasses(arguments);
            for (var i in classes) {
              if (this.contains(i)) {
                return true;
              }
            }
          }
        },
        containsAll: {
          value: function containsAll() {
            var classes = _argumentsToClasses(arguments);
            for (var i in classes) {
              if (!this.contains(i)) {
                return false;
              }
            }
            return true;
          }
        }
      });
    })();
  }
})();

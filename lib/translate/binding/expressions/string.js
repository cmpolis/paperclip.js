// Generated by CoffeeScript 1.6.3
var StringExpression, base;

base = require("../../base/expression");

StringExpression = (function() {
  /*
  */

  StringExpression.prototype._type = "string";

  /*
  */


  function StringExpression(value) {
    this.value = value;
    this._children = [];
  }

  /*
  */


  StringExpression.prototype.toString = function() {
    return "'" + (this.value.replace(/\'/g, "\\'").replace(/\n/g, "\\n")) + "'";
  };

  return StringExpression;

})();

module.exports = StringExpression;

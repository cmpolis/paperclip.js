// Generated by CoffeeScript 1.6.3
var TextStringExpression,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

TextStringExpression = (function(_super) {
  __extends(TextStringExpression, _super);

  TextStringExpression.prototype._type = "textString";

  /*
  */


  function TextStringExpression(value) {
    this.value = value;
    TextStringExpression.__super__.constructor.call(this);
  }

  /*
  */


  TextStringExpression.prototype.toString = function() {
    return "text(" + this.value + ")";
  };

  return TextStringExpression;

})(require("./base"));

module.exports = TextStringExpression;

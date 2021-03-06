// Generated by CoffeeScript 1.6.3
var ActionsExpression, CollectionExpression,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

CollectionExpression = require("../../base/collectionExpression");

ActionsExpression = (function(_super) {
  __extends(ActionsExpression, _super);

  /*
  */


  ActionsExpression.prototype._type = "scripts";

  /*
  */


  function ActionsExpression(items) {
    ActionsExpression.__super__.constructor.call(this, items);
    this.actions = items;
  }

  /*
  */


  ActionsExpression.prototype.toString = function() {
    var action, buffer, params, _i, _len, _ref;
    buffer = ["{"];
    params = [];
    _ref = this.actions;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      action = _ref[_i];
      params.push("'" + action.name + "': " + (action.toString()));
    }
    buffer.push(params.join(","), "}");
    return buffer.join("");
  };

  return ActionsExpression;

})(CollectionExpression);

module.exports = ActionsExpression;

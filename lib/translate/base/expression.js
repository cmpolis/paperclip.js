// Generated by CoffeeScript 1.6.3
var Expression;

Expression = (function() {
  /*
  */

  function Expression() {
    this._children = [];
  }

  /*
  */


  Expression.prototype.addChild = function() {
    var child, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = arguments.length; _i < _len; _i++) {
      child = arguments[_i];
      child._parent = this;
      _results.push(this._children.push(child));
    }
    return _results;
  };

  return Expression;

})();

exports.Expression = Expression;

// Generated by CoffeeScript 1.6.3
var FragmentWriter, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

FragmentWriter = (function(_super) {
  __extends(FragmentWriter, _super);

  function FragmentWriter() {
    this.write = __bind(this.write, this);
    _ref = FragmentWriter.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  /*
  */


  FragmentWriter.prototype.write = function(children) {
    if (children.length === 1) {
      return children[0];
    }
    return this.nodeFactory.createFragment(children);
  };

  return FragmentWriter;

})(require("./base"));

module.exports = FragmentWriter;

// Generated by CoffeeScript 1.6.2
var ChangeDecor, ValueAttrBinding, type, _, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_ = require("underscore");

ChangeDecor = require("./change");

type = require("type-component");

/*
 DEPRECATED - USE MODEL
*/


ValueAttrBinding = (function(_super) {
  __extends(ValueAttrBinding, _super);

  function ValueAttrBinding() {
    this._elementValue = __bind(this._elementValue, this);
    this._onChange = __bind(this._onChange, this);
    this._onElementChange = __bind(this._onElementChange, this);    _ref = ValueAttrBinding.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  /*
  */


  ValueAttrBinding.prototype.bind = function() {
    ValueAttrBinding.__super__.bind.call(this);
    (this.$element = $(this.element)).bind(ChangeDecor.events, this._onElementChange);
    return this._onChange(this.clip.get("value"));
  };

  /*
  */


  ValueAttrBinding.prototype._onElementChange = function(event) {
    var _this = this;

    event.stopPropagation();
    clearTimeout(this._changeTimeout);
    return this._changeTimeout = setTimeout((function() {
      var ref, value, _i, _len, _ref1, _results;

      value = _this._elementValue();
      if (_this.clip.get("bothWays")) {
        _ref1 = _this.refs;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          ref = _ref1[_i];
          _results.push(_this.context.set(ref, value));
        }
        return _results;
      }
    }), 5);
  };

  /*
  */


  ValueAttrBinding.prototype.dispose = function() {
    var _ref1;

    return (_ref1 = this.$element) != null ? _ref1.unbind(ChangeDecor.events, this._onElementChange) : void 0;
  };

  /*
  */


  ValueAttrBinding.prototype._onChange = function(value) {
    return this._elementValue(value);
  };

  /*
  */


  ValueAttrBinding.prototype._elementValue = function(value) {
    var isInput;

    if (value == null) {
      value = "";
    }
    isInput = Object.prototype.hasOwnProperty.call(this.element, "value") || /input|textarea|checkbox/.test(this.element.nodeName.toLowerCase());
    if (!arguments.length) {
      if (isInput) {
        return this._checkedOrValue();
      } else {
        return this.element.innerHTML;
      }
    }
    this.currentValue = value;
    if (isInput) {
      return this._checkedOrValue(value);
    } else {
      return this.element.innerHTML = value;
    }
  };

  /*
  */


  ValueAttrBinding.prototype._checkedOrValue = function(value) {
    var isCheckbox;

    isCheckbox = /checkbox/.test(this.element.type);
    if (!arguments.length) {
      if (isCheckbox) {
        return this.element.checked;
      } else {
        return this.element.value;
      }
    }
    if (isCheckbox) {
      return this.element.checked = value;
    } else {
      return this.element.value = value;
    }
  };

  return ValueAttrBinding;

})(require("./base"));

module.exports = ValueAttrBinding;
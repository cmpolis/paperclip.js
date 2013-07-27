// Generated by CoffeeScript 1.6.2
var CssDecor, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

CssDecor = (function(_super) {
  __extends(CssDecor, _super);

  function CssDecor() {
    this._updateCss = __bind(this._updateCss, this);    _ref = CssDecor.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  /*
  */


  CssDecor.prototype.bind = function() {
    CssDecor.__super__.bind.call(this);
    this._currentClasses = {};
    this.$element = $(this.element);
    return this.clip.bind("css").to(this._updateCss).now();
  };

  /*
  */


  CssDecor.prototype._updateCss = function(classes) {
    var className, useClass, _results;

    _results = [];
    for (className in classes) {
      useClass = classes[className];
      if (useClass) {
        if (!this._currentClasses[className]) {
          this._currentClasses[className] = 1;
          _results.push(this.$element.addClass(className));
        } else {
          _results.push(void 0);
        }
      } else {
        if (this._currentClasses[className]) {
          delete this._currentClasses[className];
          _results.push(this.$element.removeClass(className));
        } else {
          _results.push(void 0);
        }
      }
    }
    return _results;
  };

  return CssDecor;

})(require("./dataBind"));

module.exports = CssDecor;
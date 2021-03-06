// Generated by CoffeeScript 1.6.3
var EventDecor, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

EventDecor = (function(_super) {
  __extends(EventDecor, _super);

  function EventDecor() {
    this._onEvent = __bind(this._onEvent, this);
    _ref = EventDecor.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  /*
  */


  EventDecor.prototype.watch = false;

  /*
  */


  EventDecor.prototype.propagateEvent = true;

  /*
  */


  EventDecor.prototype.preventDefault = false;

  /*
  */


  EventDecor.prototype.bind = function() {
    var ev, event, name, prop, _i, _len, _ref1;
    EventDecor.__super__.bind.apply(this, arguments);
    event = (this.event || this.name).toLowerCase();
    name = this.name.toLowerCase();
    if (name.substr(0, 2) === "on") {
      name = name.substr(2);
    }
    if (event.substr(0, 2) === "on") {
      event = event.substr(2);
    }
    if (name === "click" || name === "mouseup" || name === "mousedown" || name === "submit") {
      this.preventDefault = true;
      this.propagateEvent = false;
    }
    this._pge = "propagateEvent." + name;
    this._pde = "preventDefault." + name;
    _ref1 = [this._pge, this._pde];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      ev = _ref1[_i];
      prop = ev.split(".").shift();
      if ((this.clip.get(ev) == null) && (this.clip.get(prop) == null) && (this[prop] != null)) {
        this.clip.set(ev, this[prop]);
      }
    }
    return (this.$node = $(this.node)).bind(this._event = event, this._onEvent);
  };

  /*
  */


  EventDecor.prototype.unbind = function() {
    EventDecor.__super__.unbind.call(this);
    return this.$node.unbind(this._event, this._onEvent);
  };

  /*
  */


  EventDecor.prototype._onEvent = function(event) {
    if (this.clip.get("propagateEvent") !== true && this.clip.get(this._pge) !== true) {
      event.stopPropagation();
    }
    if (this.clip.get("preventDefault") === true || this.clip.get(this._pde) === true) {
      event.preventDefault();
    }
    if (this.clip.get("disable")) {
      return;
    }
    this.clip.data.set("event", event);
    return this._update(event);
  };

  /*
  */


  EventDecor.prototype._update = function(event) {
    return this.script.update();
  };

  return EventDecor;

})(require("./base"));

module.exports = EventDecor;

// Generated by CoffeeScript 1.6.2
var AttributeBinding, NodeBinding, async, base,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

async = require("async");

base = require("./base");

AttributeBinding = (function(_super) {
  __extends(AttributeBinding, _super);

  /*
  */


  function AttributeBinding(name, bindings) {
    this.name = name;
    this.bindings = bindings;
  }

  /*
  */


  AttributeBinding.prototype.write = function(info, callback) {
    info.buffer.push(" " + this.name + "=\"value\"");
    return callback();
  };

  return AttributeBinding;

})(require("./base"));

NodeBinding = (function(_super) {
  __extends(NodeBinding, _super);

  /*
  */


  function NodeBinding(name, options) {
    var attrs, attrsArray, key;

    this.name = name;
    if (options == null) {
      options = {};
    }
    NodeBinding.__super__.constructor.call(this);
    attrs = options.attrs || {};
    attrsArray = [];
    for (key in attrs) {
      attrsArray.push(new AttributeBinding(key, attrs[key]));
    }
    this.attrs = attrsArray;
    this.addChild.apply(this, options.children || []);
  }

  /*
  */


  NodeBinding.prototype._writeHead = function(info, callback) {
    NodeBinding.__super__._writeHead.call(this, info);
    info.buffer.push("<" + this.name);
    console.log(this.attrs);
    return base.writeEachItem(this.attrs, info, function() {
      info.buffer.push(">");
      return callback();
    });
  };

  /*
  */


  NodeBinding.prototype._writeTail = function(info, callback) {
    info.buffer.push("</" + this.name + ">");
    NodeBinding.__super__._writeTail.call(this, info);
    return callback();
  };

  return NodeBinding;

})(require("./bindable"));

module.exports = NodeBinding;
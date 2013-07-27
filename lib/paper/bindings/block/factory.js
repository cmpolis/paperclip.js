// Generated by CoffeeScript 1.6.2
var BindingCollection, Factory, bindingClasses;

BindingCollection = require("../collection");

bindingClasses = {
  html: require("./html"),
  when: require("./when"),
  value: require("./value")
};

Factory = (function() {
  function Factory() {}

  /*
  */


  Factory.prototype.getBindings = function(section, clip, nodeFactory) {
    var bd, bindings, scriptName, _i, _len, _ref;

    bindings = [];
    _ref = clip.scripts.names;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      scriptName = _ref[_i];
      if (bd = bindingClasses[scriptName]) {
        bindings.push(new bd(section, clip, nodeFactory, scriptName));
      }
    }
    return bindings;
  };

  return Factory;

})();

module.exports = new Factory();
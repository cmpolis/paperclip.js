// Generated by CoffeeScript 1.6.2
(function() {
  var DecoratorFactory, ElementDecorator, TextDecorator;

  TextDecorator = require("./text");

  ElementDecorator = require("./element");

  DecoratorFactory = (function() {
    /*
    */
    function DecoratorFactory() {}

    /*
    */


    DecoratorFactory.prototype.attach = function(data, element) {
      var DecoratorClass;

      if (element.nodeName === "#text") {
        if (TextDecorator.test(element)) {
          DecoratorClass = TextDecorator;
        }
      } else {
        if (ElementDecorator.test(element)) {
          DecoratorClass = ElementDecorator;
        }
      }
      if (!DecoratorClass) {
        return;
      }
      return element._paperclipDecorator = new DecoratorClass(data, element);
    };

    return DecoratorFactory;

  })();

  module.exports = DecoratorFactory;

}).call(this);
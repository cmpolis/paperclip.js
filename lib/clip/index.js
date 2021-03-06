// Generated by CoffeeScript 1.6.3
var Clip, ClipScript, ClipScripts, PropertyChain, bindable, dref, events, type,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

dref = require("dref");

events = require("events");

bindable = require("bindable");

type = require("type-component");

/*
 Reads a property chain
*/


PropertyChain = (function() {
  /*
  */

  PropertyChain.prototype.__isPropertyChain = true;

  /*
  */


  function PropertyChain(watcher) {
    this.watcher = watcher;
    this._commands = [];
    this.clip = this.watcher.clip;
  }

  /*
  */


  PropertyChain.prototype.ref = function(path) {
    this._commands.push({
      ref: path
    });
    return this;
  };

  /*
  */


  PropertyChain.prototype.castAs = function(name) {
    this.watcher.cast[name] = this;
    return this;
  };

  /*
  */


  PropertyChain.prototype.path = function() {
    var c, path, _i, _len, _ref;
    path = [];
    _ref = this._commands;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      c = _ref[_i];
      path.push(c.ref);
    }
    return path.join(".");
  };

  /*
  */


  PropertyChain.prototype.self = function(path) {
    this._self = true;
    this.ref(path);
    return this;
  };

  /*
  */


  PropertyChain.prototype.call = function(path, args) {
    this._commands.push({
      ref: path,
      args: args
    });
    return this;
  };

  /*
  */


  PropertyChain.prototype.exec = function() {
    this.currentValue = this.value();
    return this;
  };

  /*
  */


  PropertyChain.prototype.value = function(value) {
    var command, cv, hasValue, i, n, pv, _i, _len, _ref;
    hasValue = arguments.length;
    cv = this._self ? this.clip : this.clip.data;
    n = this._commands.length;
    _ref = this._commands;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      command = _ref[i];
      if (cv.__isBindable) {
        this.watcher._watch(command.ref, cv);
      }
      if (i === n - 1 && hasValue) {
        if (cv.set) {
          cv.set(command.ref, value);
        } else {
          dref.set(cv, command.ref, value);
        }
      }
      pv = cv;
      cv = cv.get ? cv.get(command.ref) : dref.get(cv, command.ref);
      if (command.args) {
        if (cv && typeof cv === "function") {
          cv = cv != null ? cv.apply(pv, command.args) : void 0;
        } else {
          cv = void 0;
        }
      }
      if (!cv) {
        break;
      }
    }
    return cv;
  };

  return PropertyChain;

})();

/*
*/


ClipScript = (function(_super) {
  __extends(ClipScript, _super);

  /*
  */


  function ClipScript(script, clip) {
    this.script = script;
    this.clip = clip;
    this._debounceUpdate = __bind(this._debounceUpdate, this);
    this.update = __bind(this.update, this);
    this.options = this.clip.options;
    this._watching = {};
    this.cast = {};
  }

  /*
  */


  ClipScript.prototype.dispose = function() {
    var key;
    for (key in this._watching) {
      this._watching[key].dispose();
    }
    return this._watching = {};
  };

  /*
  */


  ClipScript.prototype.update = function() {
    var newValue;
    newValue = this.script.fn.call(this);
    if (newValue === this.value) {
      return newValue;
    }
    this._updated = true;
    this.emit("change", this.value = newValue);
    return newValue;
  };

  /*
  */


  ClipScript.prototype.watch = function() {
    this.__watch = true;
    return this;
  };

  /*
  */


  ClipScript.prototype.unwatch = function() {
    var key;
    this.__watch = false;
    for (key in this._watching) {
      this._watching[key].dispose();
    }
    this._watching = {};
    return this;
  };

  /*
  */


  ClipScript.prototype.references = function() {
    return this.script.refs || [];
  };

  /*
  */


  ClipScript.prototype.ref = function(path) {
    return new PropertyChain(this).ref(path);
  };

  ClipScript.prototype.self = function(path) {
    return new PropertyChain(this).self(path);
  };

  ClipScript.prototype.call = function(path, args) {
    return new PropertyChain(this).call(path, args);
  };

  ClipScript.prototype.castAs = function(name) {
    return new PropertyChain(this).castAs(name);
  };

  /*
   watches
  */


  ClipScript.prototype._watch = function(path, target) {
    var bindableBinding, binding, lockUpdate,
      _this = this;
    if (!this.__watch) {
      return;
    }
    if (this._watching[path]) {
      if (this._watching[path].target === target) {
        return;
      }
      this._watching[path].dispose();
    }
    lockUpdate = true;
    bindableBinding = void 0;
    this._watching[path] = {
      target: target,
      binding: binding = target.bind(path).to(function(value, oldValue) {
        if (bindableBinding) {
          bindableBinding.dispose();
        }
        if (value != null ? value.__isBindable : void 0) {
          bindableBinding = _this._watchBindable(value, oldValue);
        } else if (type(value) === "function") {
          _this._spyFunction(path, value, target);
        }
        if (lockUpdate) {
          return;
        }
        return _this.update();
      }).now(),
      dispose: function() {
        if (bindableBinding != null) {
          bindableBinding.dispose();
        }
        return binding.dispose();
      }
    };
    return lockUpdate = false;
  };

  /*
   watches a bindable object for any changes, then updates this binding asynchronously This is important
   for such a case: {{ someObject | someComputer() }}
  */


  ClipScript.prototype._watchBindable = function(value, oldValue) {
    var onChange,
      _this = this;
    value.on("change", onChange = function() {
      if (!_this._updated) {
        return;
      }
      return _this._debounceUpdate();
    });
    return {
      dispose: function() {
        return value.off("change", onChange);
      }
    };
  };

  /* 
   temporarily overwrites an existing, referenced function, and finds *all* the references
   called within the given function. This is needed incase a function is called inline, and *might*
   be updated. For example:
  
   getSum = () -> @get("someNum") + @get("anotherNum")
  
   and 
  
   {{ getSum() }}
  
   _spyFunction would find the references to "someNum", and "anotherSum", and listen for *those* to change,
   then re-call getSum()
  */


  ClipScript.prototype._spyFunction = function(path, fn, target) {
    var oldFn, ref, self, _i, _len, _ref;
    oldFn = fn;
    if (fn.__isCallSpy) {
      return;
    }
    self = this;
    target = (typeof target.owner === "function" ? target.owner(path) : void 0) || target;
    if (fn.refs) {
      _ref = fn.refs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ref = _ref[_i];
        this._watch(ref, target);
      }
    } else {

    }
    /*
    fn = () ->
      refs   = []
      oldGet = @get
    
      # override this.get temporarily
      @get = (key) ->
        refs.push(key) if key and key.length
        oldGet.call @, key
    
      # call the old function
      ret = oldFn.apply @, arguments
    
      # reset the old this.get function
      @get = oldGet
    
      oldFn.refs = refs
    
      #reset the old function
      @set path, oldFn
    
      ret
    
    # set callspy to the overridden function, since _spyFunction
    # will be called again after it's overridden. We want to prevent an infinite loop!
    fn.__isCallSpy = true
    
    # override the old function *temporarily*
    target.set path, fn
    */

  };

  /*
  */


  ClipScript.prototype._debounceUpdate = function() {
    clearTimeout(this._debounceTimeout);
    return this._debounceTimeout = setTimeout(this.update, 0);
  };

  return ClipScript;

})(events.EventEmitter);

ClipScripts = (function() {
  /*
  */

  function ClipScripts(clip, scripts) {
    this.clip = clip;
    this._scripts = {};
    this.names = [];
    this._bindScripts(scripts);
  }

  /*
  */


  ClipScripts.prototype.watch = function() {
    var key;
    for (key in this._scripts) {
      this._scripts[key].watch();
    }
    return this;
  };

  /*
  */


  ClipScripts.prototype.unwatch = function() {
    var key;
    for (key in this._scripts) {
      this._scripts[key].unwatch();
    }
    return this;
  };

  /*
  */


  ClipScripts.prototype.update = function() {
    var key;
    for (key in this._scripts) {
      this._scripts[key].update();
    }
    return this;
  };

  /*
  */


  ClipScripts.prototype.dispose = function() {
    var key;
    for (key in this._scripts) {
      this._scripts[key].dispose();
    }
    return this._scripts = {};
  };

  /*
  */


  ClipScripts.prototype.get = function(name) {
    return this._scripts[name];
  };

  /*
  */


  ClipScripts.prototype._bindScripts = function(scripts) {
    var scriptName;
    if (scripts.fn) {
      this._bindScript("value", scripts);
    } else {
      for (scriptName in scripts) {
        this._bindScript(scriptName, scripts[scriptName]);
      }
    }
  };

  /*
  */


  ClipScripts.prototype._bindScript = function(name, script, watch) {
    var clipScript,
      _this = this;
    this.names.push(name);
    clipScript = new ClipScript(script, this.clip);
    this._scripts[name] = clipScript;
    return clipScript.on("change", function(value) {
      return _this.clip.set(name, value);
    });
  };

  return ClipScripts;

})();

Clip = (function() {
  /*
  */

  function Clip(options) {
    var scripts;
    this.options = options;
    this._self = this.context = options.context || new bindable.Object();
    this.reset(options.data, false);
    scripts = this.options.scripts || this.options.script;
    if (scripts) {
      this.scripts = new ClipScripts(this, scripts);
    }
    if (options.watch !== false) {
      this.watch();
    }
  }

  /*
  */


  Clip.prototype.reset = function(data, update) {
    if (data == null) {
      data = {};
    }
    if (update == null) {
      update = true;
    }
    this.data = data.__isBindable ? data : new bindable.Object(data);
    if (update) {
      this.update();
    }
    return this;
  };

  /*
  */


  Clip.prototype.watch = function() {
    this.scripts.watch();
    return this;
  };

  /*
  */


  Clip.prototype.unwatch = function() {
    return this.scripts.unwatch();
  };

  /*
  */


  Clip.prototype.update = function() {
    this.scripts.update();
    return this;
  };

  /*
  */


  Clip.prototype.dispose = function() {
    var _ref, _ref1;
    if ((_ref = this._self) != null) {
      _ref.dispose();
    }
    return (_ref1 = this.scripts) != null ? _ref1.dispose() : void 0;
  };

  Clip.prototype.script = function(name) {
    return this.scripts.get(name);
  };

  Clip.prototype.get = function() {
    var _ref;
    return (_ref = this._self).get.apply(_ref, arguments);
  };

  Clip.prototype.set = function() {
    var _ref;
    return (_ref = this._self).set.apply(_ref, arguments);
  };

  Clip.prototype.bind = function() {
    var _ref;
    return (_ref = this._self).bind.apply(_ref, arguments);
  };

  return Clip;

})();

module.exports = Clip;

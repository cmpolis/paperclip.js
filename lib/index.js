// Generated by CoffeeScript 1.6.3
var Clip, adapters, browser, paper, translate;

Clip = require("./clip");

paper = require("./paper");

browser = require("./browser");

translate = require("./translate");

adapters = require("./node/adapters");

require("./node");

module.exports = browser;

module.exports.compile = translate.compile;

module.exports.translator = translate;

module.exports.adapters = adapters;

paper.template.compiler = translate;

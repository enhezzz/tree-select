(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ZeroTree"] = factory();
	else
		root["ZeroTree"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(8)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _zeroTree = __webpack_require__(5);

var _zeroTree2 = _interopRequireDefault(_zeroTree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_zeroTree2.default.install = function (Vue, svgConfig) {
    if (!document.getElementById('zero-tree-icon')) {
        var svg = document.createElement('div');
        svg.innerHTML = svgConfig || '<svg xmlns="http://www.w3.org/2000/svg" style="display: none;" id="zero-tree-icon">\n            <symbol id="right" viewBox="0 0 1025 1024">\n                <defs><style type="text/css"></style></defs><path d="M895.531061 485.788536 535.640488 485.788536 535.640488 125.897963c0-13.5716-11.001648-24.573248-24.573248-24.573248s-24.573248 11.001648-24.573248 24.573248l0 359.890572L126.604444 485.788536c-13.5716 0-24.573248 11.001648-24.573248 24.573248s11.001648 24.573248 24.573248 24.573248l359.889548 0 0 359.890572c0 13.5716 11.001648 24.573248 24.573248 24.573248s24.573248-11.001648 24.573248-24.573248L535.640488 534.934007l359.890572 0c13.5716 0 24.573248-11.001648 24.573248-24.573248S909.102661 485.788536 895.531061 485.788536z" p-id="1874"></path>\n            </symbol>\n            <symbol id="down" viewBox="0 0 1025 1024">\n                <defs><style type="text/css"></style></defs><path d="M895.531061 534.934007 126.604444 534.934007c-13.5716 0-24.573248-11.001648-24.573248-24.573248s11.001648-24.573248 24.573248-24.573248l768.926616 0c13.5716 0 24.573248 11.001648 24.573248 24.573248S909.102661 534.934007 895.531061 534.934007z" p-id="1760"></path>\n            </symbol>\n            <symbol id="check" viewBox="0 0 1024 1024">\n                <defs><style type="text/css"></style></defs><path d="M461.973333 586.325333l-105.642666-105.642666a21.248 21.248 0 0 0-30.122667 0.042666c-8.32 8.32-8.213333 21.973333-0.064 30.101334l120.810667 120.832a21.248 21.248 0 0 0 30.122666-0.085334l211.157334-211.157333a21.290667 21.290667 0 0 0 0-30.186667 21.397333 21.397333 0 0 0-30.250667 0.106667l-196.010667 195.989333z" fill="#3D3D3D" p-id="3093"></path><path d="M149.333333 874.602667L874.602667 874.666667 874.666667 149.397333 149.397333 149.333333 149.333333 874.602667zM106.666667 149.397333C106.666667 125.802667 125.909333 106.666667 149.397333 106.666667h725.205334C898.197333 106.666667 917.333333 125.909333 917.333333 149.397333v725.205334A42.794667 42.794667 0 0 1 874.602667 917.333333H149.397333A42.794667 42.794667 0 0 1 106.666667 874.602667V149.397333z" fill="#3D3D3D" p-id="3094"></path>\n            </symbol>\n            <symbol id="uncheck" viewBox="0 0 1024 1024">\n                <defs><style type="text/css"></style></defs><path d="M149.333333 874.602667L874.602667 874.666667 874.666667 149.397333 149.397333 149.333333 149.333333 874.602667zM106.666667 149.397333C106.666667 125.802667 125.909333 106.666667 149.397333 106.666667h725.205334C898.197333 106.666667 917.333333 125.909333 917.333333 149.397333v725.205334A42.794667 42.794667 0 0 1 874.602667 917.333333H149.397333A42.794667 42.794667 0 0 1 106.666667 874.602667V149.397333z" fill="#3D3D3D" p-id="3208"></path>\n            </symbol>\n        </svg>';
        /*
        `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;" id="zero-tree-icon">
            <symbol id="down" viewBox="0 0 1024 1024">
                <defs><style type="text/css"></style></defs><path d="M45.376 481.088l933.856 0c17.184 0 31.136 13.952 31.136 31.136s-13.952 31.136-31.136 31.136l-933.856 0c-17.184 0-31.136-13.952-31.136-31.136s13.92-31.136 31.136-31.136z" p-id="9230"></path>
            </symbol>
            <symbol id="right" viewBox="0 0 1024 1024">
                <defs><style type="text/css"></style></defs><path d="M979.232 532.96l-425.408 0 0 446.176c0 17.184-13.92 31.136-31.136 31.136s-31.136-13.952-31.136-31.136l0-446.176-446.176 0c-17.184 0-31.136-13.952-31.136-31.136s13.92-31.136 31.136-31.136l446.176 0 0-425.408c0-17.184 13.92-31.136 31.136-31.136s31.136 13.952 31.136 31.136l0 425.408 425.408 0c17.184 0 31.136 13.952 31.136 31.136s-13.92 31.136-31.136 31.136z" p-id="9116"></path>
            </symbol>
        </svg>`
        */
        document.body.appendChild(svg);
    }
    Vue && Vue.component('zero-tree', _zeroTree2.default);
    if (!Object.assign) {
        var assign = function assign() {
            var obj = arguments.length <= 0 ? undefined : arguments[0];
            var target = void 0;
            var key = void 0;
            var i = 1;
            var len = arguments.length;
            for (; i < len; i += 1) {
                target = arguments.length <= i ? undefined : arguments[i];
                for (key in target) {
                    if (Object.prototype.hasOwnProperty.call(target, key)) {
                        obj[key] = target[key];
                    }
                }
            }
            return obj;
        };
        if (Object.defineProperty) {
            Object.defineProperty(Object, 'assign', { value: assign });
        } else {
            Object.assign = assign;
        }
    }
};
module.exports = _zeroTree2.default;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(6)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(9),
  /* template */
  __webpack_require__(17),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/zero/project/zero-tree/src/zero-tree.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] zero-tree.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9c1d12a4", Component.options)
  } else {
    hotAPI.reload("data-v-9c1d12a4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("3004f28b", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js?sourceMap!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9c1d12a4\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./zero-tree.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js?sourceMap!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9c1d12a4\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./zero-tree.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"zero-tree.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _zeroTreeNode = __webpack_require__(10);

var _zeroTreeNode2 = _interopRequireDefault(_zeroTreeNode);

var _zeroTreeStore = __webpack_require__(15);

var _zeroTreeStore2 = _interopRequireDefault(_zeroTreeStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    components: { ZeroTreeNode: _zeroTreeNode2.default },
    name: 'zero-tree',
    props: {
        treeData: {
            type: Array,
            required: true
        },
        options: {
            type: Object,
            default: function _default() {
                return {};
            }
        },
        value: {
            type: Array,
            required: false,
            default: function _default() {
                return [];
            }
        }
    },
    data: function data() {
        return {
            isTree: true,
            propChange: true
        };
    },

    watch: {
        value: function value(newVal) {
            if (this.propChange) {
                this.treeStore.checkAll(false);
                this.treeStore.changeCheckByKey(newVal, true, true);
                this.$emit('handleCheckedChange');
            } else {
                this.propChange = true;
            }
        }
    },
    computed: {
        treeStore: function treeStore() {
            return new _zeroTreeStore2.default(Object.assign({
                root: this.treeData.slice(0)
            }, this.treeOption), this.$set);
        },
        treeOption: function treeOption() {
            return Object.assign({
                children: 'children',
                label: 'label',
                treeKey: 'id',
                showCheckbox: true,
                checkFolder: false
            }, this.options);
        }
    },
    created: function created() {},

    methods: {
        handleCheckedChange: function handleCheckedChange(node) {
            this.treeStore.changeCheckStatus(node);
            this.propChange = false;
            this.$emit('input', this.treeStore.getCheckIds());
            this.$emit('handleCheckedChange', node);
        },
        handleNodeCheck: function handleNodeCheck(node) {
            var children = node[this.treeOption.children];
            if (children && children.length > 0) {
                if (this.treeOption.checkFolder && !this.treeOption.showCheckbox) {
                    node.checked = !node.checked;
                    this.treeStore.changeCheckStatus(node);
                    this.propChange = false;
                    this.$emit('input', this.treeStore.getCheckIds());
                    this.$emit('handleCheckedChange');
                } else {
                    node.open = !node.open;
                }
            } else if (!this.treeOption.showCheckbox) {
                node.checked = !node.checked;
                this.propChange = false;
                this.$emit('input', this.treeStore.getCheckIds());
                this.$emit('handleCheckedChange');
            }
            this.$emit('handleNodeCheck');
        },
        checkAll: function checkAll(check) {
            this.treeStore.checkAll(check);
            this.propChange = false;
            this.$emit('input', this.treeStore.getCheckIds());
            this.$emit('handleCheckedChange');
        },
        checkKey: function checkKey(key, check) {
            this.treeStore.checkNodeDeep(key, check);
            this.propChange = false;
            this.$emit('input', this.treeStore.getCheckIds());
            this.$emit('handleCheckedChange');
        },
        getCheckLabels: function getCheckLabels() {
            return this.treeStore.getCheckLabels();
        },
        getCheckNode: function getCheckNode() {
            return this.treeStore.getCheckNode();
        }
    }
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(11)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(13),
  /* template */
  __webpack_require__(14),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-54b16c71",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/zero/project/zero-tree/src/zero-tree-node.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] zero-tree-node.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-54b16c71", Component.options)
  } else {
    hotAPI.reload("data-v-54b16c71", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(12);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("3f0348cf", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js?sourceMap!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-54b16c71\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./zero-tree-node.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js?sourceMap!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-54b16c71\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./zero-tree-node.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.node-selected[data-v-54b16c71] {\n  border: 1px solid #66b3ff;\n}\n.zero-tree[data-v-54b16c71] {\n  min-height: 20px;\n}\n.zero-tree li[data-v-54b16c71] {\n  margin: 0;\n  padding: 5px /*0.3571rem*/ 5px /*0.3571rem*/ 5px /*0.3571rem*/ 0;\n  position: relative;\n  list-style: none;\n}\n.zero-tree .li-content[data-v-54b16c71] {\n  display: inline-block;\n  height: 24px;\n}\n.zero-tree .li-slot[data-v-54b16c71] {\n  display: inline-block;\n}\n.zero-tree ul[data-v-54b16c71] {\n  padding-left: 20px /*1.1428rem*/;\n}\n.zero-tree .icon[data-v-54b16c71],\n.zero-tree .icon-blank[data-v-54b16c71] {\n  width: 20px /*1.1428rem*/;\n  height: 20px /*1.1428rem*/;\n  display: inline-block;\n  vertical-align: middle;\n  padding: 2px /*0.3571rem*/;\n  margin-right: 0;\n  background-color: #fff;\n}\n.zero-tree .icon[data-v-54b16c71] {\n  cursor: pointer;\n}\n.zero-tree li[data-v-54b16c71]:after,\n.zero-tree li[data-v-54b16c71]:before {\n  content: '';\n  left: -8px;\n  position: absolute;\n  border-width: 1px;\n}\n.zero-tree li[data-v-54b16c71]:before {\n  border-left: 1px dashed #999;\n  height: 100%;\n  top: -5px;\n  width: 1px;\n}\n.zero-tree li[data-v-54b16c71]:after {\n  border-top: 1px dashed #999;\n  top: 17px;\n  width: 8px;\n}\n.zero-tree li[data-v-54b16c71]:last-child::before {\n  height: 22px;\n}\n.zero-tree li.file[data-v-54b16c71]:after,\n.zero-tree li.file[data-v-54b16c71]:before {\n  left: -8px;\n}\n.zero-tree li.file[data-v-54b16c71]:after {\n  width: 32px;\n}\n.zero-tree .fold-enter-active[data-v-54b16c71] {\n  transform: scaleY(1);\n  animation: showAnimation-data-v-54b16c71 0.2s ease-in-out;\n  transform-origin: 50% 0%;\n}\n.zero-tree .fold-leave-active[data-v-54b16c71] {\n  transform: scaleY(0);\n  animation: hideAnimation-data-v-54b16c71 0.2s ease-in-out;\n  transform-origin: 50% 0%;\n}\n@-moz-keyframes showAnimation {\n0% {\n    transform: scaleY(0);\n}\n100% {\n    transform: scaleY(1);\n}\n}\n@-webkit-keyframes showAnimation {\n0% {\n    transform: scaleY(0);\n}\n100% {\n    transform: scaleY(1);\n}\n}\n@-o-keyframes showAnimation {\n0% {\n    transform: scaleY(0);\n}\n100% {\n    transform: scaleY(1);\n}\n}\n@keyframes showAnimation-data-v-54b16c71 {\n0% {\n    transform: scaleY(0);\n}\n100% {\n    transform: scaleY(1);\n}\n}\n@-moz-keyframes hideAnimation {\n0% {\n    transform: scaleY(1);\n}\n100% {\n    transform: scaleY(0);\n}\n}\n@-webkit-keyframes hideAnimation {\n0% {\n    transform: scaleY(1);\n}\n100% {\n    transform: scaleY(0);\n}\n}\n@-o-keyframes hideAnimation {\n0% {\n    transform: scaleY(1);\n}\n100% {\n    transform: scaleY(0);\n}\n}\n@keyframes hideAnimation-data-v-54b16c71 {\n0% {\n    transform: scaleY(1);\n}\n100% {\n    transform: scaleY(0);\n}\n}\n", "", {"version":3,"sources":["/home/zero/project/zero-tree/src/src/zero-tree-node.vue","/home/zero/project/zero-tree/src/zero-tree-node.vue"],"names":[],"mappings":";AA+GA;EACI,0BAAA;CC9GH;AD+GD;EACI,iBAAA;CC7GH;AD8GG;EACI,UAAA;EACA,iEAAA;EACA,mBAAA;EACA,iBAAA;CC5GP;AD6GG;EACI,sBAAA;EACA,aAAA;CC3GP;AD4GG;EACI,sBAAA;CC1GP;AD2GG;EACI,iCAAA;CCzGP;AD0GG;;EACI,0BAAA;EACA,2BAAA;EACA,sBAAA;EACA,uBAAA;EACA,2BAAA;EACA,gBAAA;EACA,uBAAA;CCvGP;ADwGG;EACI,gBAAA;CCtGP;ADuGG;;EACI,YAAA;EACA,WAAA;EACA,mBAAA;EACA,kBAAA;CCpGP;ADqGG;EACI,6BAAA;EACA,aAAA;EACA,UAAA;EACA,WAAA;CCnGP;ADoGG;EACI,4BAAA;EACA,UAAA;EACA,WAAA;CClGP;ADmGG;EACI,aAAA;CCjGP;ADkGG;;EACI,WAAA;CC/FP;ADgGG;EACI,YAAA;CC9FP;ADyGG;EACI,qBAAA;EACA,0DAAA;EACA,yBAAA;CCvGP;ADwGG;EACI,qBAAA;EACA,0DAAA;EACA,yBAAA;CCtGP;ADqFc;AACP;IACI,qBAAA;CCnFT;ADoFK;IACI,qBAAA;CClFT;CACF;AD6Ec;AACP;IACI,qBAAA;CC3ET;AD4EK;IACI,qBAAA;CC1ET;CACF;ADqEc;AACP;IACI,qBAAA;CCnET;ADoEK;IACI,qBAAA;CClET;CACF;AD6Dc;AACP;IACI,qBAAA;CC3DT;AD4DK;IACI,qBAAA;CC1DT;CACF;AD0Dc;AACP;IACI,qBAAA;CCxDT;ADyDK;IACI,qBAAA;CCvDT;CACF;ADkDc;AACP;IACI,qBAAA;CChDT;ADiDK;IACI,qBAAA;CC/CT;CACF;AD0Cc;AACP;IACI,qBAAA;CCxCT;ADyCK;IACI,qBAAA;CCvCT;CACF;ADkCc;AACP;IACI,qBAAA;CChCT;ADiCK;IACI,qBAAA;CC/BT;CACF","file":"zero-tree-node.vue","sourcesContent":["\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nicon-width = 20px /*1.1428rem*/\nicon-padding = 2px /*0.3571rem*/\nli-padding = 5px /*0.3571rem*/\nul-padding-left = icon-width\nli-height = icon-width + icon-padding * 2 + li-padding * 2\nfile-margin-left = icon-width + icon-padding * 2\nfolder-left = icon-padding\nli-after-width = 8px\nfolder-left = ul-padding-left - (file-margin-left / 2)\n.node-selected\n    border 1px solid #66B3FF\n.zero-tree\n    min-height 20px\n    li\n        margin 0\n        padding li-padding li-padding li-padding 0\n        position relative\n        list-style none\n    .li-content\n        display inline-block\n        height icon-width + icon-padding * 2\n    .li-slot\n        display inline-block\n    ul\n        padding-left ul-padding-left\n    .icon, .icon-blank\n        width icon-width\n        height icon-width\n        display inline-block\n        vertical-align middle\n        padding icon-padding\n        margin-right 0\n        background-color white\n    .icon\n        cursor pointer\n    li:after, li:before\n        content ''\n        left -(folder-left)\n        position absolute\n        border-width 1px\n    li:before\n        border-left 1px dashed #999\n        height 100%\n        top -(li-padding)\n        width 1px\n    li:after\n        border-top 1px dashed #999\n        top (li-height / 2)\n        width li-after-width\n    li:last-child::before\n        height (li-height / 2 + li-padding)\n    li.file:after, li.file:before\n        left -(folder-left)\n    li.file:after\n        width folder-left + file-margin-left\n    @keyframes showAnimation\n        0%\n            transform scaleY(0)\n        100%\n            transform scaleY(1)\n    @keyframes hideAnimation\n        0%\n            transform scaleY(1)\n        100%\n            transform scaleY(0)\n    .fold-enter-active\n        transform scaleY(1)\n        animation showAnimation .2s ease-in-out\n        transform-origin 50% 0%\n    .fold-leave-active\n        transform scaleY(0)\n        animation hideAnimation .2s ease-in-out\n        transform-origin 50% 0%\n",".node-selected {\n  border: 1px solid #66b3ff;\n}\n.zero-tree {\n  min-height: 20px;\n}\n.zero-tree li {\n  margin: 0;\n  padding: 5px /*0.3571rem*/ 5px /*0.3571rem*/ 5px /*0.3571rem*/ 0;\n  position: relative;\n  list-style: none;\n}\n.zero-tree .li-content {\n  display: inline-block;\n  height: 24px;\n}\n.zero-tree .li-slot {\n  display: inline-block;\n}\n.zero-tree ul {\n  padding-left: 20px /*1.1428rem*/;\n}\n.zero-tree .icon,\n.zero-tree .icon-blank {\n  width: 20px /*1.1428rem*/;\n  height: 20px /*1.1428rem*/;\n  display: inline-block;\n  vertical-align: middle;\n  padding: 2px /*0.3571rem*/;\n  margin-right: 0;\n  background-color: #fff;\n}\n.zero-tree .icon {\n  cursor: pointer;\n}\n.zero-tree li:after,\n.zero-tree li:before {\n  content: '';\n  left: -8px;\n  position: absolute;\n  border-width: 1px;\n}\n.zero-tree li:before {\n  border-left: 1px dashed #999;\n  height: 100%;\n  top: -5px;\n  width: 1px;\n}\n.zero-tree li:after {\n  border-top: 1px dashed #999;\n  top: 17px;\n  width: 8px;\n}\n.zero-tree li:last-child::before {\n  height: 22px;\n}\n.zero-tree li.file:after,\n.zero-tree li.file:before {\n  left: -8px;\n}\n.zero-tree li.file:after {\n  width: 32px;\n}\n.zero-tree .fold-enter-active {\n  transform: scaleY(1);\n  animation: showAnimation 0.2s ease-in-out;\n  transform-origin: 50% 0%;\n}\n.zero-tree .fold-leave-active {\n  transform: scaleY(0);\n  animation: hideAnimation 0.2s ease-in-out;\n  transform-origin: 50% 0%;\n}\n@-moz-keyframes showAnimation {\n  0% {\n    transform: scaleY(0);\n  }\n  100% {\n    transform: scaleY(1);\n  }\n}\n@-webkit-keyframes showAnimation {\n  0% {\n    transform: scaleY(0);\n  }\n  100% {\n    transform: scaleY(1);\n  }\n}\n@-o-keyframes showAnimation {\n  0% {\n    transform: scaleY(0);\n  }\n  100% {\n    transform: scaleY(1);\n  }\n}\n@keyframes showAnimation {\n  0% {\n    transform: scaleY(0);\n  }\n  100% {\n    transform: scaleY(1);\n  }\n}\n@-moz-keyframes hideAnimation {\n  0% {\n    transform: scaleY(1);\n  }\n  100% {\n    transform: scaleY(0);\n  }\n}\n@-webkit-keyframes hideAnimation {\n  0% {\n    transform: scaleY(1);\n  }\n  100% {\n    transform: scaleY(0);\n  }\n}\n@-o-keyframes hideAnimation {\n  0% {\n    transform: scaleY(1);\n  }\n  100% {\n    transform: scaleY(0);\n  }\n}\n@keyframes hideAnimation {\n  0% {\n    transform: scaleY(1);\n  }\n  100% {\n    transform: scaleY(0);\n  }\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    name: 'zero-tree-node',
    props: {
        treeData: {
            type: Array,
            required: true
        },
        options: {
            type: Object,
            default: {}
        },
        level: {
            type: Number,
            default: 1
        }
    },
    data: function data() {
        return {};
    },

    computed: {
        nodeData: function nodeData() {
            return this.treeData.slice(0);
        }
    },
    created: function created() {
        var parent = this.$parent;
        if (parent.isTree) {
            this.tree = parent;
        } else {
            this.tree = parent.tree;
        }
    },

    methods: {
        handleNodeExpand: function handleNodeExpand(node) {
            node.open = !node.open;
        },
        handleCheckedChange: function handleCheckedChange(node, flag) {
            var _this = this;

            if (this.tree) {
                flag || (node.checked = !node.checked);
                this.tree.handleCheckedChange(node);
            } else {
                flag || (node.checked = !node.checked);
                this.$nextTick(function () {
                    _this.$emit('handleCheckedChange', node, true);
                });
            }
        },
        handleNodeCheck: function handleNodeCheck(node) {
            if (this.tree) {
                this.tree.handleNodeCheck(node);
            } else {
                this.$emit('handleNodeCheck', node);
            }
            // this.tree.$emit('node-click', node)
        }
    }
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('ul', {
    staticClass: "zero-tree-node"
  }, _vm._l((_vm.nodeData), function(item) {
    return _c('li', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (!item.disable),
        expression: "!item.disable"
      }],
      key: item[_vm.options.treeKey],
      class: [(item[_vm.options.children] && item[_vm.options.children].length > 0) ? 'folder' : 'file', 'level-' + _vm.level]
    }, [_c('div', {
      staticClass: "li-content"
    }, [(item[_vm.options.children] && item[_vm.options.children].length > 0) ? _c('svg', {
      staticClass: "icon",
      on: {
        "click": function($event) {
          $event.stopPropagation();
          _vm.handleNodeExpand(item)
        }
      }
    }, [(item.open) ? _c('use', {
      attrs: {
        "xlink:href": "#down"
      }
    }) : _c('use', {
      attrs: {
        "xlink:href": "#right"
      }
    })]) : _c('div', {
      staticClass: "icon-blank"
    }), (_vm.options.showCheckbox) ? _c('svg', {
      staticClass: "icon",
      on: {
        "click": function($event) {
          $event.stopPropagation();
          _vm.handleCheckedChange(item)
        }
      }
    }, [(item.checked) ? _c('use', {
      attrs: {
        "xlink:href": "#check"
      }
    }) : _c('use', {
      attrs: {
        "xlink:href": "#uncheck"
      }
    })]) : _vm._e(), _c('div', {
      staticClass: "li-slot",
      on: {
        "click": function($event) {
          $event.stopPropagation();
          _vm.handleNodeCheck(item)
        }
      }
    }, [_vm._t("default", null, {
      item: item
    })], 2)]), _vm._v(" "), (item[_vm.options.children] && item[_vm.options.children].length > 0) ? _c('transition', {
      attrs: {
        "name": "fold"
      }
    }, [_c('zero-tree-node', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (item.open),
        expression: "item.open"
      }],
      attrs: {
        "options": _vm.options,
        "treeData": item[_vm.options.children],
        "level": _vm.level + 1
      },
      on: {
        "handleCheckedChange": _vm.handleCheckedChange,
        "handleNodeCheck": _vm.handleNodeCheck
      },
      scopedSlots: _vm._u([{
        key: "default",
        fn: function(props) {
          return [_vm._t("default", null, {
            item: props.item
          })]
        }
      }])
    })], 1) : _vm._e()], 1)
  }))
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-54b16c71", module.exports)
  }
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ZeroTreeStore;

var _utils = __webpack_require__(16);

function ZeroTreeStore(options, set) {
    var _this = this;

    this.root = options.root || [];
    this.options = Object.assign({}, options);
    this.datas = {};
    this.len = 0;
    this.flag = false;
    var _traverseNodes = (0, _utils.tco)(function (root, parentId) {
        for (var i = 0, len = root.length; i < len; i++) {
            _this.len++;
            var node = root[i];
            node.parentId = parentId;
            var nodeId = node[_this.options.treeKey];
            if (_this.datas[nodeId]) {
                throw new Error('nodeId repeat:' + nodeId);
            }
            _this.datas[node[_this.options.treeKey]] = node;
            node.checked === undefined && set(node, 'checked', false);
            if (node[_this.options.children] && node[_this.options.children].length > 0) {
                node.open === undefined && set(node, 'open', false);
                _traverseNodes(node[_this.options.children], node[_this.options.treeKey]);
            }
        }
    });
    _traverseNodes(this.root, null);
    if (this.len > 2000) {
        this.datas = null;
        this.root = [];
        throw new Error('node len > 2000 clear root len:' + this.len);
    }
}
ZeroTreeStore.prototype.changeCheckStatus = function (node) {
    var _this2 = this;

    var _traverseUp = (0, _utils.tco)(function (node) {
        if (node.checked && node.parentId) {
            var parent = _this2.getNode(node.parentId);
            if (parent) {
                parent.checked = _this2.sameSilibingChecked(parent, node[_this2.options.treeKey]);
                return _traverseUp(parent);
            }
        } else if (!node.checked && node.parentId) {
            var upparent = _this2.getNode(node.parentId);
            if (upparent) {
                upparent.checked = false;
                if (upparent.parentId) {
                    return _traverseUp(upparent);
                }
            }
        }
        return true;
    });
    var _traverseDown = (0, _utils.tco)(function (node) {
        var children = node[_this2.options.children];
        if (children && children.length > 0) {
            for (var i = 0, len = children.length; i < len; i++) {
                var child = children[i];
                child.checked = node.checked;
                _traverseDown(child);
            }
        }
    });
    if (node && node.parentId) {
        _traverseUp(node);
    }
    if (node) {
        _traverseDown(node);
    }
};
ZeroTreeStore.prototype.getNode = function (key) {
    return this.datas[key];
};
ZeroTreeStore.prototype.sameSilibingChecked = function (parent, currentId) {
    if (!parent) {
        return false;
    }
    var children = parent[this.options.children];
    if (!children) {
        return false;
    }
    for (var i = 0, len = children.length; i < len; i++) {
        var node = children[i];
        if (node[this.options.treeKey] !== currentId && !node.checked) {
            return false;
        }
    }
    return true;
};
ZeroTreeStore.prototype.getCheckIds = function () {
    var _this3 = this;

    return this.getCheckNodes().map(function (i) {
        return i[_this3.options.treeKey];
    });
};
ZeroTreeStore.prototype.changeCheckByKey = function (keys) {
    var check = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var isDeep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var self = this;
    keys.forEach(function (i) {
        var node = self.datas[i];
        if (node) {
            self.datas[i].checked = check;
        }
    });
    if (isDeep) {
        return this.NodeDeep();
    }
};
ZeroTreeStore.prototype.checkAll = function () {
    var check = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    for (var key in this.datas) {
        var node = this.datas[key];
        if (node.checked !== check) {
            node.checked = check;
        }
    }
};
ZeroTreeStore.prototype.checkNodeDeep = function (key) {
    var check = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var node = this.datas[key];
    if (node) {
        node.checked = check;
        this.changeCheckStatus(node);
        return true;
    }
    return false;
};
ZeroTreeStore.prototype.getCheckLabels = function () {
    var _this4 = this;

    return this.getCheckNodes().map(function (i) {
        return i[_this4.options.label];
    });
};
ZeroTreeStore.prototype.getCheckNodes = function () {
    var nodes = [];
    for (var key in this.datas) {
        var node = this.datas[key];
        if (node.checked) {
            nodes.push(node);
        }
    }
    return nodes;
};

ZeroTreeStore.prototype.NodeDeep = function () {
    var _this5 = this;

    var Deep = function Deep(nodes, parent) {
        var check = true;
        nodes.forEach(function (node) {
            var children = node[_this5.options.children];
            if (children && children.length > 0) {
                Deep(children, node);
            }
            check = check && node.checked;
        });
        if (parent && parent.checked !== check) {
            parent.checked = check;
        }
    };
    Deep(this.root);
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.tco = tco;
exports.hasClass = hasClass;
exports.addClass = addClass;
exports.removeClass = removeClass;
var trim = function trim(string) {
    return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};

function tco(f) {
    var value = void 0;
    var active = false;
    var accumulated = [];
    return function accumulator() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        accumulated.push(args);
        if (!active) {
            active = true;
            while (accumulated.length) {
                value = f.apply(this, accumulated.shift());
            }
            active = false;
            return value;
        }
        return null;
    };
}
function hasClass(el, cls) {
    if (!el || !cls) return false;
    if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
    if (el.classList) {
        return el.classList.contains(cls);
    } else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
}

/* istanbul ignore next */
function addClass(el, cls) {
    if (!el) return;
    var curClass = el.className;
    var classes = (cls || '').split(' ');

    for (var i = 0, j = classes.length; i < j; i++) {
        var clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
            el.classList.add(clsName);
        } else {
            if (!hasClass(el, clsName)) {
                curClass += ' ' + clsName;
            }
        }
    }
    if (!el.classList) {
        el.className = curClass;
    }
}

/* istanbul ignore next */
function removeClass(el, cls) {
    if (!el || !cls) return;
    var classes = cls.split(' ');
    var curClass = ' ' + el.className + ' ';

    for (var i = 0, j = classes.length; i < j; i++) {
        var clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
            el.classList.remove(clsName);
        } else {
            if (hasClass(el, clsName)) {
                curClass = curClass.replace(' ' + clsName + ' ', ' ');
            }
        }
    }
    if (!el.classList) {
        el.className = trim(curClass);
    }
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "zero-tree"
  }, [_c('zero-tree-node', {
    attrs: {
      "treeData": _vm.treeStore.root,
      "options": _vm.treeOption
    },
    on: {
      "handleCheckedChange": _vm.handleCheckedChange,
      "handleNodeCheck": _vm.handleNodeCheck
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(props) {
        return [_vm._t("default", [_c('span', {
          class: {
            'node-selected': props.item.checked && !_vm.options.showCheckbox
          }
        }, [_vm._v(_vm._s(props.item.label))])], {
          item: props.item
        })]
      }
    }])
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-9c1d12a4", module.exports)
  }
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=zero-tree.js.map
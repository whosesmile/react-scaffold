webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(7);

	var _react = __webpack_require__(11);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(42);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _app = __webpack_require__(188);

	var _app2 = _interopRequireDefault(_app);

	var _home = __webpack_require__(258);

	var _home2 = _interopRequireDefault(_home);

	var _orders = __webpack_require__(265);

	var _orders2 = _interopRequireDefault(_orders);

	var _records = __webpack_require__(266);

	var _records2 = _interopRequireDefault(_records);

	var _package = __webpack_require__(270);

	var _package2 = _interopRequireDefault(_package);

	var _protocol = __webpack_require__(272);

	var _protocol2 = _interopRequireDefault(_protocol);

	var _instruction = __webpack_require__(273);

	var _instruction2 = _interopRequireDefault(_instruction);

	var _details = __webpack_require__(274);

	var _details2 = _interopRequireDefault(_details);

	var _order = __webpack_require__(275);

	var _order2 = _interopRequireDefault(_order);

	var _reactRouter = __webpack_require__(203);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_reactDom2.default.render(_react2.default.createElement(
	  _reactRouter.Router,
	  { onUpdate: function onUpdate() {
	      return window.scrollTo(0, 0);
	    }, history: _reactRouter.browserHistory },
	  _react2.default.createElement(
	    _reactRouter.Route,
	    { path: '/integral', component: _app2.default },
	    _react2.default.createElement(_reactRouter.IndexRoute, { component: _home2.default }),
	    _react2.default.createElement(_reactRouter.Route, { path: '/integral/records', component: _records2.default }),
	    _react2.default.createElement(_reactRouter.Route, { path: '/integral/packages', component: _package2.default }),
	    _react2.default.createElement(_reactRouter.Route, { path: '/integral/protocol', component: _protocol2.default }),
	    _react2.default.createElement(_reactRouter.Route, { path: '/integral/instruction', component: _instruction2.default }),
	    _react2.default.createElement(_reactRouter.Route, { path: '/integral/details/:id', component: _details2.default }),
	    _react2.default.createElement(_reactRouter.Route, { path: '/integral/orders', component: _orders2.default }),
	    _react2.default.createElement(_reactRouter.Route, { path: '/integral/order/:id', component: _order2.default })
	  )
	), document.querySelector('#bootstrap')); /*!
	                                           * by 李双宝
	                                           */

/***/ },

/***/ 7:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(8, function() {
				var newContent = __webpack_require__(8);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 8:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, "/* mixin:border */\n/* mixin:break-word */\n/* mixin:ellipsis */\nhtml {\n  touch-action: manipulation;\n}\nbody {\n  -webkit-user-select: none;\n          user-select: none;\n  overflow-x: hidden;\n  background-color: #f1f1f1;\n}\n.page {\n  min-height: 100vh;\n  background-color: #f1f1f1;\n}\n.page.view-enter,\n.page.view-leave {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  width: 100%;\n}\n/* 页入 */\n.view-enter {\n  -webkit-transform: translate3d(100%, 0, 0);\n          transform: translate3d(100%, 0, 0);\n}\n.view-enter.view-enter-active {\n  -webkit-animation: ex-kf-view-in ease 0.3s forwards;\n          animation: ex-kf-view-in ease 0.3s forwards;\n  z-index: 2;\n}\n.view-leave.view-leave-active {\n  -webkit-animation: none;\n          animation: none;\n  z-index: 1;\n}\n/* 页出 */\n.backoff .view-enter {\n  -webkit-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n}\n.backoff .view-enter.view-enter-active {\n  -webkit-animation: none;\n          animation: none;\n  z-index: 1;\n}\n.backoff .view-leave.view-leave-active {\n  -webkit-animation: ex-kf-view-out ease 0.3s forwards;\n          animation: ex-kf-view-out ease 0.3s forwards;\n  z-index: 2;\n}\n.list.compact {\n  margin-top: -1px;\n}\n/* 滚动加载 */\n.loader {\n  position: relative;\n  -webkit-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n}\n/* 选项卡面板 */\n.tabpane {\n  display: none;\n}\n.tabpane.active {\n  display: block;\n}\n/* 悬浮窗 */\n.swing.fixed .tablet {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  z-index: 100;\n  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);\n}\n/* 商品橱窗 */\n.cases {\n  margin: 10px;\n}\n.cases .header {\n  padding: 10px 0;\n}\n.cases .header .title {\n  display: inline-block;\n  font-weight: normal;\n  padding-left: 10px;\n  line-height: 1.2rem;\n  margin-bottom: 10px;\n  font-size: 15px;\n  border-left: 4px solid #ff5a32;\n}\n.cases .content {\n  margin-left: -5px;\n  margin-right: -5px;\n  margin-top: -10px;\n}\n.cases .content:after {\n  content: '\\200';\n  visibility: hidden;\n  clear: both;\n  display: block;\n  font-size: 0;\n  height: 0;\n}\n.cases .content .item {\n  float: left;\n  width: 50%;\n  padding: 10px 5px 0;\n  color: #666;\n}\n.cases .content .item .panel {\n  position: relative;\n  background-color: #fff;\n  border-radius: 5px;\n  overflow: hidden;\n}\n.cases .content .item .panel .figure {\n  position: relative;\n  display: block;\n  overflow: hidden;\n  padding-top: 100%;\n  background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAvCAAAAAB2oJONAAAAAnRSTlMA/1uRIrUAAAE2SURBVEjH7dZdb4IwFAbg/v+/dGjBLU4HG8zFuMaFCBECbkTHIrt9dyHyMQeE9s54rjhJ+7T0K4cBiS1IKYSdAAyS3CBSisAlCZZSBOWIKGWOC41wHcZDHSAUjLY6wJZuwA24AdcPZEGsAxQz4gaPlIHj3fQLeKONIvA9mQEAfPKVgNyal18belcADqZdv7okRwN74bRarEYCmXhu5bGxHAV8cu9Pm8R4bWQ/A8COv1yMsuOLanumZH30Ae3RLmaVW/NsYSTdQNf/luty2p6lEXcB3Su+F08AzNP2rFpdGkDfnh9MG8jKRFL4H9B/6nLrsU7W1SVpAEPn/nw/2o1rYD14846Thzo5T7cCCjFcqBT3frM0Ka7nUdWs0jhzPB3Ac1hKsXr/mFIGSW6oViuHLkkw3Wr9F+lrTgHcjDsHAAAAAElFTkSuQmCC) center center no-repeat;\n  background-size: 32px 24px;\n}\n.cases .content .item .panel .figure > img {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 100%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n}\n.cases .content .item .panel .text {\n  position: relative;\n  padding: 8px 10px;\n  font-size: 15px;\n}\n.cases .content .item .panel .text:before {\n  content: ' ';\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  -webkit-transform-origin: 0 0;\n          transform-origin: 0 0;\n  -webkit-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n}\n.cases .content .item .panel .text .name {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  word-wrap: normal;\n  font-weight: normal;\n}\n.cases .content .item .panel .text .brief {\n  margin-top: 5px;\n  font-size: 14px;\n}\n.cases .content .item .panel .text .brief i {\n  font-style: normal;\n}\n.center-block {\n  display: block;\n  width: 100%;\n  margin: 0 auto;\n}\n/* 清除浮动 */\n.clearfix:after {\n  content: '\\200';\n  visibility: hidden;\n  clear: both;\n  display: block;\n  font-size: 0;\n  height: 0;\n}\n/* 图片占位 */\n.autofix {\n  position: relative;\n  display: block;\n  overflow: hidden;\n}\n.autofix > img {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 100%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n}\n/* home */\n.home .banner {\n  position: relative;\n  display: block;\n  overflow: hidden;\n  padding-top: 45%;\n}\n.home .banner > img {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 100%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n}\n.home .banner img {\n  border-radius: 6px 6px 0 0;\n}\n.home .menus {\n  background-color: #fff;\n  height: 75px;\n  border-radius: 0 0 6px 6px;\n}\n.home .menus .item {\n  position: relative;\n}\n.home .menus .item:not(:last-child):after {\n  content: ' ';\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 1px;\n  bottom: 0;\n  border-right: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  -webkit-transform-origin: 100% 0;\n          transform-origin: 100% 0;\n  -webkit-transform: scaleX(0.5);\n          transform: scaleX(0.5);\n}\n.home .menus .item img {\n  width: 29px;\n  height: 29px;\n}\n.home .menus .item span {\n  display: block;\n  margin: 0 auto;\n}\n/* records */\n.records .bar + section > .tabview {\n  margin-top: -1px;\n}\n.records .tabpane .list > .item {\n  border-radius: 5px;\n}\n/* protocol instruction */\n.protocol,\n.instruction {\n  background-color: #fff;\n}\n/* packages */\n.package .packets {\n  min-height: 300px;\n}\n", ""]);

	// exports


/***/ },

/***/ 9:
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
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


/***/ },

/***/ 10:
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },

/***/ 188:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fastclick = __webpack_require__(189);

	var _fastclick2 = _interopRequireDefault(_fastclick);

	var _react = __webpack_require__(11);

	var _react2 = _interopRequireDefault(_react);

	var _reactAddonsCssTransitionGroup = __webpack_require__(190);

	var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

	var _reactRouter = __webpack_require__(203);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*!
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 模块模板 待完善
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	// PROXY CLICK
	window.addEventListener('load', function () {
	  return _fastclick2.default.attach(document.body);
	});

	var App = function (_Component) {
	  _inherits(App, _Component);

	  function App(props) {
	    _classCallCheck(this, App);

	    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	    _this.state = {
	      index: 0,
	      action: 'ahead'
	    };

	    if (!history.state || !history.state.key || _this.getRrkeys().indexOf(history.state.key) === -1) {
	      localStorage.setItem('rrkeys', '[]');
	    } else {
	      _this.state.index = _this.getRrkeys().indexOf(history.state.key);
	    }
	    return _this;
	  }

	  _createClass(App, [{
	    key: 'getRrkeys',
	    value: function getRrkeys() {
	      var rrkeys = localStorage.getItem('rrkeys');
	      return rrkeys ? JSON.parse(rrkeys) : [];
	    }
	  }, {
	    key: 'setRrkeys',
	    value: function setRrkeys(key) {
	      var rrkeys = this.getRrkeys();
	      rrkeys.push(key);
	      localStorage.setItem('rrkeys', JSON.stringify(rrkeys));
	      return rrkeys;
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      _reactRouter.browserHistory.listen(function (data) {
	        var key = data.key;
	        // 新增
	        if (data.action === 'PUSH') {
	          var rrkeys = _this2.setRrkeys(data.key);
	          _this2.setState({
	            action: 'ahead',
	            index: rrkeys.length
	          });
	        }
	        // 历史 POP
	        else {
	            var _rrkeys = _this2.getRrkeys();
	            var index = _rrkeys.indexOf(data.key);
	            // 如果在初始页面刷新, 因为rrkeys会被清空，此时前进index就会为 -1，此时补齐rrkeys
	            // 仅当data.key存在 才是前进 不然会是后退到初始化页面
	            if (data.key && index === -1) {
	              _rrkeys = _this2.setRrkeys(data.key);
	              _this2.setState({
	                action: 'ahead',
	                index: _rrkeys.length
	              });
	            }
	            // 历史前进
	            else if (index > _this2.state.index) {
	                _this2.setState({
	                  action: 'ahead',
	                  index: index
	                });
	              }
	              // 历史后退
	              else {
	                  _this2.setState({
	                    action: 'backoff',
	                    index: index
	                  });
	                }
	          }
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        _reactAddonsCssTransitionGroup2.default,
	        { id: 'app', className: this.state.action, component: 'div', transitionName: { enter: 'view-enter', leave: 'view-leave' }, transitionEnterTimeout: 300, transitionLeaveTimeout: 300 },
	        _react2.default.cloneElement(this.props.children, { key: location.pathname })
	      );
	    }
	  }]);

	  return App;
	}(_react.Component);

	App.propTypes = {};
	App.defaultProps = {};
	exports.default = App;
	;

/***/ },

/***/ 258:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _webpackZepto = __webpack_require__(259);

	var _webpackZepto2 = _interopRequireDefault(_webpackZepto);

	var _react = __webpack_require__(11);

	var _react2 = _interopRequireDefault(_react);

	var _page = __webpack_require__(260);

	var _page2 = _interopRequireDefault(_page);

	var _lazy = __webpack_require__(263);

	var _lazy2 = _interopRequireDefault(_lazy);

	var _loader = __webpack_require__(264);

	var _loader2 = _interopRequireDefault(_loader);

	var _reactRouter = __webpack_require__(203);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Home = function (_Component) {
	  _inherits(Home, _Component);

	  function Home(props) {
	    _classCallCheck(this, Home);

	    var _this = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));

	    _this.state = {
	      title: '积分商城',
	      list: []
	    };
	    return _this;
	  }

	  _createClass(Home, [{
	    key: 'appendList',
	    value: function appendList(list) {
	      this.setState({
	        list: this.state.list.concat(list)
	      });
	    }
	  }, {
	    key: 'renderList',
	    value: function renderList() {
	      return this.state.list.map(function (item, idx) {
	        return _react2.default.createElement(
	          _reactRouter.Link,
	          { key: idx, to: '/integral/details/' + item.id, className: 'item' },
	          _react2.default.createElement(
	            'div',
	            { className: 'panel' },
	            _react2.default.createElement(
	              'div',
	              { is: true, 'class': 'vspace hspace', 'ui-mode': '10px' },
	              _react2.default.createElement(
	                'div',
	                { className: 'figure' },
	                _react2.default.createElement(_lazy2.default, { src: item.coverImg })
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'text' },
	              _react2.default.createElement(
	                'h4',
	                { className: 'name' },
	                item.goodsName
	              ),
	              _react2.default.createElement(
	                'span',
	                { className: 'brief' },
	                '\u79EF\u5206\uFF1A',
	                _react2.default.createElement(
	                  'i',
	                  { className: 'text-orange' },
	                  item.consumeIntegral
	                )
	              )
	            )
	          )
	        );
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        _page2.default,
	        { className: 'home', title: this.state.title },
	        _react2.default.createElement(
	          'section',
	          { className: 'main' },
	          _react2.default.createElement(
	            'div',
	            { is: true, 'class': 'hspace vspace', 'ui-mode': '10px' },
	            _react2.default.createElement(
	              _reactRouter.Link,
	              { className: 'banner', to: '/integral/packages' },
	              _react2.default.createElement('img', { src: '//img1.qdingnet.com/image-030851c3-1c2d-4a45-9266-7016f5a23bf6.jpg' })
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'flex menus text-center text-sm' },
	              _react2.default.createElement(
	                _reactRouter.Link,
	                { className: 'item text-dark', to: '/integral/records' },
	                _react2.default.createElement('img', { src: '//img1.qdingnet.com/image-9ebded27-50cb-4008-986d-995de3b162bc.png' }),
	                _react2.default.createElement(
	                  'span',
	                  null,
	                  '884\u79EF\u5206'
	                )
	              ),
	              _react2.default.createElement(
	                _reactRouter.Link,
	                { className: 'item text-dark', to: '/integral/protocol' },
	                _react2.default.createElement('img', { src: '//img1.qdingnet.com/image-33367e9b-664f-461e-a7f8-5282075c3cdd.png' }),
	                _react2.default.createElement(
	                  'span',
	                  null,
	                  '\u79EF\u5206\u89C4\u5219'
	                )
	              ),
	              _react2.default.createElement(
	                _reactRouter.Link,
	                { className: 'item text-dark', to: '/integral/orders' },
	                _react2.default.createElement('img', { src: '//img1.qdingnet.com/image-c16e680f-73c8-440f-b685-75a08eb6e845.png' }),
	                _react2.default.createElement(
	                  'span',
	                  null,
	                  '\u5151\u6362\u8BB0\u5F55'
	                )
	              )
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'cases' },
	            _react2.default.createElement(
	              'div',
	              { className: 'header' },
	              _react2.default.createElement(
	                'h3',
	                { className: 'title' },
	                '\u70ED\u95E8\u5151\u6362'
	              )
	            ),
	            _react2.default.createElement(
	              _loader2.default,
	              { url: '/integral/ajax/goods', callback: this.appendList.bind(this) },
	              _react2.default.createElement(
	                'div',
	                { className: 'content' },
	                this.renderList()
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return Home;
	}(_react.Component);

	Home.propTypes = {};
	Home.defaultProps = {};
	exports.default = Home;
	;

/***/ },

/***/ 260:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(11);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(261);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _bar = __webpack_require__(262);

	var _bar2 = _interopRequireDefault(_bar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*!
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 页面模板 待完善
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var Page = function (_Component) {
	  _inherits(Page, _Component);

	  function Page(props) {
	    _classCallCheck(this, Page);

	    var _this = _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this, props));

	    _this.state = {};
	    return _this;
	  }

	  _createClass(Page, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      document.title = this.props.title;

	      // 在webview中，如APP内嵌或者微信、服务窗等，直接更改TITLE无效
	      // TODO
	      if (true) {
	        var frame = document.createElement('iframe');
	        frame.src = '//m.baidu.com/favicon.ico';
	        frame.style.display = 'none';
	        frame.onload = function () {
	          return setTimeout(function () {
	            return document.body.removeChild(frame);
	          }, 10);
	        };
	        document.body.appendChild(frame);
	      }
	    }
	  }, {
	    key: 'renderBar',
	    value: function renderBar() {}
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          title = _props.title,
	          menus = _props.menus,
	          className = _props.className,
	          others = _objectWithoutProperties(_props, ['title', 'menus', 'className']);

	      var clazz = (0, _classnames2.default)('page', className);
	      return _react2.default.createElement(
	        'div',
	        _extends({ className: clazz }, others),
	        _react2.default.createElement(
	          _bar2.default,
	          { menus: menus },
	          title
	        ),
	        this.props.children
	      );
	    }
	  }]);

	  return Page;
	}(_react.Component);

	Page.propTypes = {
	  title: _react.PropTypes.string.isRequired,
	  menus: _react.PropTypes.array
	};
	Page.defaultProps = {
	  // 二维数组 第一个前置菜单，第二个后置菜单
	  menus: [[{ icon: '&#xe60e;', label: '返回', className: 'text-gray', href: 'javascript:history.back()' }], [{ label: '刷新', className: 'text-gray', href: 'javascript:location.reload()' }]]
	};
	exports.default = Page;
	;

/***/ },

/***/ 262:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(11);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(261);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*!
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * bar
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var Bar = function (_Component) {
	  _inherits(Bar, _Component);

	  function Bar(props) {
	    _classCallCheck(this, Bar);

	    var _this = _possibleConstructorReturn(this, (Bar.__proto__ || Object.getPrototypeOf(Bar)).call(this, props));

	    _this.state = {};
	    return _this;
	  }

	  _createClass(Bar, [{
	    key: 'renderPrev',
	    value: function renderPrev(list) {
	      return list.map(function (menu, idx) {
	        var icon = menu.icon,
	            label = menu.label,
	            className = menu.className,
	            others = _objectWithoutProperties(menu, ['icon', 'label', 'className']);

	        var clazz = (0, _classnames2.default)('menu', className);
	        return _react2.default.createElement(
	          'a',
	          _extends({ key: idx, className: clazz }, others),
	          icon && _react2.default.createElement('i', { className: 'icon', dangerouslySetInnerHTML: { __html: icon } }),
	          label && _react2.default.createElement(
	            'span',
	            { className: 'label' },
	            label
	          )
	        );
	      });
	    }
	  }, {
	    key: 'renderNext',
	    value: function renderNext(list) {
	      return list.map(function (menu, idx) {
	        var icon = menu.icon,
	            label = menu.label,
	            className = menu.className,
	            others = _objectWithoutProperties(menu, ['icon', 'label', 'className']);

	        var clazz = (0, _classnames2.default)('menu', className);
	        return _react2.default.createElement(
	          'a',
	          _extends({ key: idx, className: clazz }, others),
	          label && _react2.default.createElement(
	            'span',
	            { className: 'label' },
	            label
	          ),
	          icon && _react2.default.createElement('i', { className: 'icon', dangerouslySetInnerHTML: { __html: icon } })
	        );
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var prev = this.props.menus[0] || [];
	      var next = this.props.menus[1] || [];

	      return _react2.default.createElement(
	        'header',
	        { className: 'bar' },
	        this.renderPrev(prev),
	        _react2.default.createElement(
	          'h1',
	          { className: 'title' },
	          _react2.default.createElement(
	            'b',
	            null,
	            this.props.children
	          )
	        ),
	        this.renderNext(next)
	      );
	    }
	  }]);

	  return Bar;
	}(_react.Component);

	Bar.propTypes = {
	  menus: _react.PropTypes.array.isRequired
	};
	Bar.defaultProps = {};
	exports.default = Bar;

/***/ },

/***/ 263:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _webpackZepto = __webpack_require__(259);

	var _webpackZepto2 = _interopRequireDefault(_webpackZepto);

	var _react = __webpack_require__(11);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(261);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*!
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 延迟加载图片
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var Lazy = function (_Component) {
	  _inherits(Lazy, _Component);

	  function Lazy(props) {
	    _classCallCheck(this, Lazy);

	    var _this = _possibleConstructorReturn(this, (Lazy.__proto__ || Object.getPrototypeOf(Lazy)).call(this, props));

	    _this.state = {};
	    _this.events = ['scroll', 'resize', 'lookup'];

	    _this.handler = function () {
	      var th = 150;
	      var img = (0, _webpackZepto2.default)(_this.refs.img);
	      var $w = (0, _webpackZepto2.default)(window);
	      var wt = $w.scrollTop();
	      var wb = wt + $w.height();
	      var et = img.offset().top;
	      var eb = et + img.height();
	      if (eb >= wt - th && et <= wb + th) {
	        _this.release();
	        img.trigger('unveil');
	      }
	    };
	    return _this;
	  }

	  _createClass(Lazy, [{
	    key: 'release',
	    value: function release() {
	      var _this2 = this;

	      this.events.forEach(function (ename) {
	        (0, _webpackZepto2.default)(window).off(ename, _this2.handler);
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this3 = this;

	      var img = (0, _webpackZepto2.default)(this.refs.img);
	      img.one('unveil', function () {
	        img.attr('src', img.attr('data-src'));
	      });

	      this.handler();
	      this.events.forEach(function (ename) {
	        (0, _webpackZepto2.default)(window).on(ename, _this3.handler);
	      });
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.release();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          src = _props.src,
	          className = _props.className,
	          others = _objectWithoutProperties(_props, ['src', 'className']);

	      var clazz = (0, _classnames2.default)('lazyimg', className);
	      return _react2.default.createElement('img', _extends({ ref: 'img', 'data-src': src, className: clazz }, others, { src: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==' }));
	    }
	  }]);

	  return Lazy;
	}(_react.Component);

	Lazy.propTypes = {
	  src: _react.PropTypes.string.isRequired
	};
	Lazy.defaultProps = {};
	exports.default = Lazy;
	;

/***/ },

/***/ 264:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _webpackZepto = __webpack_require__(259);

	var _webpackZepto2 = _interopRequireDefault(_webpackZepto);

	var _react = __webpack_require__(11);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(261);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*!
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 滚动加载下一页
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var Loader = function (_Component) {
	  _inherits(Loader, _Component);

	  function Loader(props) {
	    _classCallCheck(this, Loader);

	    var _this = _possibleConstructorReturn(this, (Loader.__proto__ || Object.getPrototypeOf(Loader)).call(this, props));

	    _this.state = {
	      threshold: 300,
	      hasmore: true,
	      loading: false,
	      count: 0,
	      page: _this.props.page
	    };
	    _this.events = ['scroll', 'resize', 'lookup'];

	    _this.handler = function (e) {
	      // CHECK IS HIDDEN
	      if (!_this.refs.panel.offsetParent) {
	        return;
	      }
	      if (document.body.scrollHeight - document.body.scrollTop - document.documentElement.clientHeight < _this.state.threshold) {
	        _this.loadMore(function (data) {
	          var callback = _this.props.callback || _webpackZepto2.default.noop;
	          callback(data);
	        });
	      }
	    };
	    return _this;
	  }

	  _createClass(Loader, [{
	    key: 'loadMore',
	    value: function loadMore(fn) {
	      var _this2 = this;

	      if (!this.state.hasmore || this.state.loading) {
	        return;
	      }
	      this.setState({
	        loading: true
	      });

	      this.request = _webpackZepto2.default.get(this.props.url, {
	        page: this.state.page,
	        size: this.props.size
	      }, function (res) {
	        _this2.setState({
	          loading: false
	        });
	        if (res.code === 200) {
	          _this2.setState({
	            page: _this2.state.page + 1,
	            count: _this2.state.count + res.data.list.length });
	          fn(res.data.list);
	          if (res.data.list.length < _this2.props.size) {
	            _this2.release();
	            _this2.setState({
	              hasmore: false
	            });
	          }
	        } else {
	          fn([]);
	          // TODO FAILURE
	        }
	      });
	    }
	  }, {
	    key: 'release',
	    value: function release() {
	      var _this3 = this;

	      if (this.request) {
	        this.request.abort();
	      }
	      this.events.forEach(function (ename) {
	        (0, _webpackZepto2.default)(window).off(ename, _this3.handler);
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this4 = this;

	      this.events.forEach(function (ename) {
	        (0, _webpackZepto2.default)(window).on(ename, _this4.handler);
	      });

	      // 自动加载首页
	      if (this.props.load) {
	        this.loadMore(function (data) {
	          var callback = _this4.props.callback || _webpackZepto2.default.noop;
	          callback(data);
	        });
	      }
	      // 如果不需要自动加载并且当前页码是第一页 说明服务器端已经初始化好了 从page:2翻页
	      else if (this.state.page === 1) {
	          this.setState({
	            page: 2
	          });
	        }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.release();
	    }
	  }, {
	    key: 'renderLoading',
	    value: function renderLoading() {
	      if (this.state.loading) {
	        return _react2.default.createElement(
	          'div',
	          { className: 'loadmore' },
	          _react2.default.createElement('i', { className: 'loading' }),
	          _react2.default.createElement(
	            'span',
	            { className: 'tips text-gray' },
	            '\u6B63\u5728\u52A0\u8F7D'
	          )
	        );
	      } else if (!this.state.hasmore && this.state.count) {
	        return _react2.default.createElement(
	          'div',
	          { is: true, 'class': 'divider', 'ui-mode': '30%' },
	          '\u5DF2\u7ECF\u5230\u5E95\u5566'
	        );
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          className = _props.className,
	          others = _objectWithoutProperties(_props, ['className']);

	      var clazz = (0, _classnames2.default)('loader', className);
	      return _react2.default.createElement(
	        'div',
	        { ref: 'panel', className: clazz },
	        this.props.children,
	        this.renderLoading()
	      );
	    }
	  }]);

	  return Loader;
	}(_react.Component);

	Loader.propTypes = {
	  url: _react.PropTypes.string.isRequired,
	  page: _react.PropTypes.number,
	  size: _react.PropTypes.number,
	  load: _react.PropTypes.bool
	};
	Loader.defaultProps = {
	  page: 1,
	  size: 20,
	  load: true
	};
	exports.default = Loader;
	;

/***/ },

/***/ 265:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _webpackZepto = __webpack_require__(259);

	var _webpackZepto2 = _interopRequireDefault(_webpackZepto);

	var _react = __webpack_require__(11);

	var _react2 = _interopRequireDefault(_react);

	var _page = __webpack_require__(260);

	var _page2 = _interopRequireDefault(_page);

	var _loader = __webpack_require__(264);

	var _loader2 = _interopRequireDefault(_loader);

	var _reactRouter = __webpack_require__(203);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*!
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 兑换记录
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var Orders = function (_Component) {
	  _inherits(Orders, _Component);

	  function Orders(props) {
	    _classCallCheck(this, Orders);

	    var _this = _possibleConstructorReturn(this, (Orders.__proto__ || Object.getPrototypeOf(Orders)).call(this, props));

	    _this.state = {
	      title: '兑换记录',
	      list: []
	    };
	    return _this;
	  }

	  _createClass(Orders, [{
	    key: 'appendList',
	    value: function appendList(list) {
	      this.setState({
	        list: this.state.list.concat(list)
	      });
	    }
	  }, {
	    key: 'renderList',
	    value: function renderList() {
	      return this.state.list.map(function (item, idx) {
	        return _react2.default.createElement(
	          'div',
	          { key: idx, className: 'list' },
	          _react2.default.createElement(
	            'div',
	            { className: 'item' },
	            _react2.default.createElement(
	              'div',
	              { className: 'text text-sm' },
	              '\u79EF\u5206\u5546\u57CE'
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'extra text-sm' },
	              '\u5DF2\u5151\u6362'
	            )
	          ),
	          _react2.default.createElement(
	            _reactRouter.Link,
	            { is: true, 'class': 'item', 'ui-mode': '15px', to: '/integral/order/' + item.id },
	            _react2.default.createElement(
	              'div',
	              { className: 'avatar' },
	              _react2.default.createElement('img', { width: '60', height: '60px', src: item.coverImg })
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'text' },
	              _react2.default.createElement(
	                'h4',
	                null,
	                item.goodsName
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'brief' },
	                item.consumeIntegral
	              )
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'item' },
	            _react2.default.createElement(
	              'div',
	              { className: 'text text-sm' },
	              '\u82B1\u8D39:',
	              _react2.default.createElement(
	                'span',
	                { className: 'text-driving' },
	                item.consumeIntegral,
	                '\u79EF\u5206'
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'extra' },
	              _react2.default.createElement(
	                'div',
	                { className: 'button-group' },
	                _react2.default.createElement(
	                  _reactRouter.Link,
	                  { className: 'button default sm', to: '/integral/order/' + item.id },
	                  '\u67E5\u770B\u8BE6\u60C5'
	                )
	              )
	            )
	          )
	        );
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        _page2.default,
	        { className: 'orders', title: this.state.title },
	        _react2.default.createElement(
	          'section',
	          { className: 'main' },
	          _react2.default.createElement(
	            _loader2.default,
	            { url: '/integral/ajax/orders', callback: this.appendList.bind(this) },
	            this.renderList()
	          )
	        )
	      );
	    }
	  }]);

	  return Orders;
	}(_react.Component);

	Orders.propTypes = {};
	Orders.defaultProps = {};
	exports.default = Orders;
	;

/***/ },

/***/ 266:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _webpackZepto = __webpack_require__(259);

	var _webpackZepto2 = _interopRequireDefault(_webpackZepto);

	var _react = __webpack_require__(11);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(203);

	var _datefmt = __webpack_require__(267);

	var _datefmt2 = _interopRequireDefault(_datefmt);

	var _page = __webpack_require__(260);

	var _page2 = _interopRequireDefault(_page);

	var _swing = __webpack_require__(268);

	var _swing2 = _interopRequireDefault(_swing);

	var _loader = __webpack_require__(264);

	var _loader2 = _interopRequireDefault(_loader);

	var _tabview = __webpack_require__(269);

	var _tabview2 = _interopRequireDefault(_tabview);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Records = function (_Component) {
	  _inherits(Records, _Component);

	  function Records(props) {
	    _classCallCheck(this, Records);

	    var _this = _possibleConstructorReturn(this, (Records.__proto__ || Object.getPrototypeOf(Records)).call(this, props));

	    _this.state = {
	      title: '积分明细',
	      list1: [],
	      list2: [],
	      list3: []
	    };
	    return _this;
	  }

	  _createClass(Records, [{
	    key: 'appendList',
	    value: function appendList(i, list) {
	      this['loaded' + i] = true;
	      this.setState(_defineProperty({}, 'list' + i, this.state['list' + i].concat(list)));
	    }
	  }, {
	    key: 'renderList',
	    value: function renderList(i) {
	      if (this['loaded' + i] && this.state['list' + i].length === 0) {
	        return _react2.default.createElement(
	          'div',
	          { className: 'feedback' },
	          _react2.default.createElement(
	            'div',
	            { className: 'mark' },
	            _react2.default.createElement('img', { width: '220', height: '220', src: '//img1.qdingnet.com/b70973ae84276a865ae7ae673ea1e318.png', alt: '\u7A7A\u767D' })
	          ),
	          _react2.default.createElement(
	            'h3',
	            { className: 'title' },
	            '\u771F\u9057\u61BE'
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'describe' },
	            '\u6682\u65F6\u8FD8\u6CA1\u6709\u76F8\u5173\u4FE1\u606F\u54E6'
	          )
	        );
	      }

	      return this.state['list' + i].map(function (item, idx) {
	        var points = function points(item) {
	          if (item.optType != 1) {
	            return _react2.default.createElement(
	              'p',
	              { className: 'text-green' },
	              '-',
	              item.optPoints
	            );
	          }
	          return _react2.default.createElement(
	            'p',
	            { className: 'text-orange' },
	            '+',
	            item.optPoints
	          );
	        };
	        return _react2.default.createElement(
	          'div',
	          { is: true, key: idx, 'class': 'list hspace', 'ui-mode': '10px' },
	          _react2.default.createElement(
	            'div',
	            { is: true, 'class': 'item text-sm', 'ui-mode': '10px' },
	            _react2.default.createElement(
	              'span',
	              { className: 'text' },
	              item.productName,
	              _react2.default.createElement(
	                'p',
	                null,
	                (0, _datefmt2.default)(item.optTime, 'yyyy-MM-dd')
	              )
	            ),
	            _react2.default.createElement(
	              'span',
	              { className: 'text text-right' },
	              points(item),
	              _react2.default.createElement(
	                'p',
	                null,
	                '\u4F59\u989D\uFF1A',
	                item.surplusPoints
	              )
	            )
	          )
	        );
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        _page2.default,
	        { className: 'records', title: this.state.title },
	        _react2.default.createElement(
	          'section',
	          { className: 'main' },
	          _react2.default.createElement(
	            _tabview2.default,
	            null,
	            _react2.default.createElement(
	              _swing2.default,
	              null,
	              _react2.default.createElement(
	                'div',
	                { className: 'navbar underline driving tabs' },
	                _react2.default.createElement(
	                  'a',
	                  { className: 'item active', href: '#tab1' },
	                  '\u660E\u7EC6'
	                ),
	                _react2.default.createElement(
	                  'a',
	                  { className: 'item', href: '#tab2' },
	                  '\u6536\u5165'
	                ),
	                _react2.default.createElement(
	                  'a',
	                  { className: 'item', href: '#tab3' },
	                  '\u652F\u51FA'
	                )
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { id: 'tab1', className: 'tabpane active' },
	              _react2.default.createElement(
	                _loader2.default,
	                { url: '/integral/ajax/details', callback: this.appendList.bind(this, 1) },
	                this.renderList(1)
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { id: 'tab2', className: 'tabpane' },
	              _react2.default.createElement(
	                _loader2.default,
	                { url: '/integral/ajax/records', callback: this.appendList.bind(this, 2) },
	                this.renderList(2)
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { id: 'tab3', className: 'tabpane' },
	              _react2.default.createElement(
	                _loader2.default,
	                { url: '/integral/ajax/deposit', callback: this.appendList.bind(this, 3) },
	                this.renderList(3)
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return Records;
	}(_react.Component);

	Records.propTypes = {};
	Records.defaultProps = {};
	exports.default = Records;
	;

/***/ },

/***/ 267:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = datefmt;
	// 格式化日期
	function datefmt(date, fmt) {
	  date = date.constructor === Date ? date : new Date(date);
	  var o = {
	    "y+": date.getFullYear(),
	    "M+": date.getMonth() + 1, //月份
	    "d+": date.getDate(), //日
	    "h+": date.getHours(), //小时
	    "m+": date.getMinutes(), //分
	    "s+": date.getSeconds(), //秒
	    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
	    "S+": date.getMilliseconds() //毫秒
	  };
	  for (var k in o) {
	    if (new RegExp("(" + k + ")").test(fmt)) {
	      if (k == "y+") {
	        fmt = fmt.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
	      } else if (k == "S+") {
	        var lens = RegExp.$1.length;
	        lens = lens == 1 ? 3 : lens;
	        fmt = fmt.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length - 1, lens));
	      } else {
	        fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	      }
	    }
	  }
	  return fmt;
	};

/***/ },

/***/ 268:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _webpackZepto = __webpack_require__(259);

	var _webpackZepto2 = _interopRequireDefault(_webpackZepto);

	var _react = __webpack_require__(11);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(261);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*!
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 悬挂功能
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var Swing = function (_Component) {
	  _inherits(Swing, _Component);

	  function Swing(props) {
	    _classCallCheck(this, Swing);

	    var _this = _possibleConstructorReturn(this, (Swing.__proto__ || Object.getPrototypeOf(Swing)).call(this, props));

	    _this.state = {
	      threshold: 0
	    };

	    _this.handler = function (e) {
	      (0, _webpackZepto2.default)(_this.refs.panel).toggleClass('fixed', window.scrollY > _this.state.threshold);
	    };

	    _this.reposition = function (e) {
	      var panel = (0, _webpackZepto2.default)(_this.refs.panel);
	      panel.css('height', panel.height());
	      _this.setState({
	        threshold: panel.offset().top
	      });
	    };
	    return _this;
	  }

	  _createClass(Swing, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      (0, _webpackZepto2.default)(window).on('scroll', this.handler);
	      (0, _webpackZepto2.default)(window).on('resize', this.reposition);

	      this.reposition();
	      this.handler();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      (0, _webpackZepto2.default)(window).off('scroll', this.handler);
	      (0, _webpackZepto2.default)(window).off('resize', this.reposition);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          className = _props.className,
	          others = _objectWithoutProperties(_props, ['className']);

	      var clazz = (0, _classnames2.default)('swing', className);
	      return _react2.default.createElement(
	        'div',
	        { ref: 'panel', className: clazz },
	        _react2.default.createElement(
	          'div',
	          { className: 'tablet' },
	          this.props.children
	        )
	      );
	    }
	  }]);

	  return Swing;
	}(_react.Component);

	Swing.propTypes = {};
	Swing.defaultProps = {};
	exports.default = Swing;
	;

/***/ },

/***/ 269:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _webpackZepto = __webpack_require__(259);

	var _webpackZepto2 = _interopRequireDefault(_webpackZepto);

	var _react = __webpack_require__(11);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(261);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*!
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 选项卡 约定className(tabs,tabpane), 放弃使用Tab自定义标签,简化结构
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var TabView = function (_Component) {
	  _inherits(TabView, _Component);

	  function TabView(props) {
	    _classCallCheck(this, TabView);

	    var _this = _possibleConstructorReturn(this, (TabView.__proto__ || Object.getPrototypeOf(TabView)).call(this, props));

	    _this.state = {};
	    return _this;
	  }

	  _createClass(TabView, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      (0, _webpackZepto2.default)(this.refs.panel).on('click', '.tabs .item', function (e) {
	        var tab = (0, _webpackZepto2.default)(e.target).addClass('active');
	        tab.siblings().removeClass('active');
	        (0, _webpackZepto2.default)(tab.attr('href')).addClass('active').siblings().removeClass('active');
	        e.preventDefault();
	      });
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      (0, _webpackZepto2.default)(this.refs.panel).off('click');
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          className = _props.className,
	          others = _objectWithoutProperties(_props, ['className']);

	      var clazz = (0, _classnames2.default)('tabview', className);
	      return _react2.default.createElement(
	        'div',
	        { ref: 'panel', className: clazz },
	        this.props.children
	      );
	    }
	  }]);

	  return TabView;
	}(_react.Component);

	TabView.propTypes = {};
	TabView.defaultProps = {};
	exports.default = TabView;
	;

/***/ },

/***/ 270:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _webpackZepto = __webpack_require__(259);

	var _webpackZepto2 = _interopRequireDefault(_webpackZepto);

	var _react = __webpack_require__(11);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(203);

	var _page = __webpack_require__(260);

	var _page2 = _interopRequireDefault(_page);

	var _masklayer = __webpack_require__(271);

	var _masklayer2 = _interopRequireDefault(_masklayer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*!
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 流量兑换
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var Package = function (_Component) {
	  _inherits(Package, _Component);

	  function Package(props) {
	    _classCallCheck(this, Package);

	    var _this = _possibleConstructorReturn(this, (Package.__proto__ || Object.getPrototypeOf(Package)).call(this, props));

	    _this.handleChange = function (e) {
	      var mobile = e.target.value.trim();
	      // 合法手机号
	      if (/^\d{11}$/.test(mobile)) {
	        _this.setState({
	          invalid: false
	        });

	        // 是否需要刷新
	        if (mobile != _this.state.mobile) {
	          _this.setState({
	            mobile: mobile
	          }, _this.refreshPackages);
	        }
	      }
	      // 非法手机号
	      else {
	          _this.setState({
	            invalid: true
	          });
	        }
	    };

	    _this.dismiss = function (e) {
	      _this.setState({
	        show: false,
	        packet: {}
	      });
	    };

	    _this.confirmExchange = function (data) {
	      _this.setState({
	        show: true,
	        packet: data
	      });
	    };

	    _this.handleExcange = function (e) {
	      _this.setState({
	        show: false,
	        processing: true
	      });

	      var packet = _this.state.packet;
	      _webpackZepto2.default.post('/integral/ajax/placeorder', {
	        goodsId: packet.id,
	        goodsType: 'FLOW',
	        consigneeMobile: _this.state.mobile
	      }, function (res) {
	        if (res.code === 200) {
	          var path = '/integral/success/' + res.data.entity.orderCode;
	          _reactRouter.browserHistory.push(path);
	        } else {
	          _this.setState({
	            processing: false,
	            failure: true,
	            message: res.data.message || '操作失败'
	          });

	          _this.timer = setTimeout(function () {
	            _this.setState({ failure: false });
	          }, 2500);
	        }
	      });
	    };

	    _this.state = {
	      title: '流量兑换',
	      invalid: false,
	      loading: false,
	      show: false,
	      processing: false,
	      packet: {},
	      list: [],
	      failure: false,
	      message: ''
	    };

	    if (typeof CF !== 'undefined') {
	      _this.state.mobile = CF.member.memberMobile;
	    }
	    return _this;
	  }

	  // 关闭


	  _createClass(Package, [{
	    key: 'refreshPackages',
	    value: function refreshPackages() {
	      var _this2 = this;

	      if (this.state.mobile) {
	        if (this.request) {
	          this.request.abort();
	        }
	        this.setState({
	          loading: true,
	          list: []
	        });
	        this.request = _webpackZepto2.default.get('/integral/ajax/packages', { mobile: this.state.mobile }, function (res) {
	          if (res.code === 200) {
	            _this2.setState({
	              loading: false,
	              list: res.data.list
	            });
	          } else {
	            // TODO FAILURE
	            _this2.setState({
	              loading: false,
	              list: []
	            });
	          }
	        });
	      }
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.refreshPackages();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      if (this.request) {
	        this.request.abort();
	      }
	      clearTimeout(this.timer);
	    }
	  }, {
	    key: 'renderPackage',
	    value: function renderPackage() {
	      var _this3 = this;

	      if (this.state.list.length === 0 && this.state.loading) {
	        return _react2.default.createElement(
	          'div',
	          { className: 'loadmore' },
	          _react2.default.createElement('i', { className: 'loading' }),
	          _react2.default.createElement(
	            'span',
	            { className: 'tips text-gray' },
	            '\u6B63\u5728\u52A0\u8F7D'
	          )
	        );
	      }

	      return this.state.list.map(function (item, idx) {
	        return _react2.default.createElement(
	          'div',
	          { key: idx, className: 'item' },
	          _react2.default.createElement(
	            'div',
	            { className: 'text' },
	            item.goodsName,
	            ' ',
	            _react2.default.createElement(
	              'span',
	              { className: 'text-sm text-driving' },
	              '(',
	              item.consumeIntegral,
	              '\u79EF\u5206)'
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'interact narrow' },
	            _react2.default.createElement(
	              'button',
	              { className: 'button literal text-primary', type: 'button', disabled: _this3.state.invalid, onClick: _this3.confirmExchange.bind(_this3, item) },
	              '\u5151\u6362'
	            )
	          )
	        );
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        _page2.default,
	        { className: 'package', title: this.state.title },
	        _react2.default.createElement(
	          'section',
	          { className: 'main' },
	          _react2.default.createElement(
	            'div',
	            { className: 'list compact' },
	            _react2.default.createElement(
	              'label',
	              { className: 'item' },
	              _react2.default.createElement(
	                'span',
	                { className: 'label' },
	                '\u624B\u673A\u53F7'
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'text' },
	                _react2.default.createElement('input', { className: 'input', type: 'tel', pattern: '[0-9]*', maxLength: '11', defaultValue: this.state.mobile, placeholder: '\u8BF7\u8F93\u5165\u60A8\u7684\u624B\u673A\u53F7\u7801(\u4EC5\u9650\u4E2D\u56FD\u5927\u9646)', onChange: this.handleChange })
	              )
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'list packets' },
	            this.renderPackage()
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'vspace' },
	            _react2.default.createElement(
	              'div',
	              { className: 'text-sm text-darkgray text-center' },
	              _react2.default.createElement(
	                'p',
	                null,
	                _react2.default.createElement(
	                  _reactRouter.Link,
	                  { className: 'link', to: '/integral/instruction' },
	                  '\u5151\u6362\u8BF4\u660E'
	                )
	              ),
	              _react2.default.createElement(
	                'p',
	                null,
	                '\u5982\u6709\u7591\u95EE\uFF0C\u8BF7\u81F4\u7535\uFF1A',
	                _react2.default.createElement(
	                  'a',
	                  { className: 'text-blue', href: 'tel:4000818181' },
	                  '4000818181'
	                )
	              )
	            )
	          )
	        ),
	        _react2.default.createElement(
	          _masklayer2.default,
	          { show: this.state.show },
	          _react2.default.createElement(
	            'div',
	            { className: 'modal' },
	            _react2.default.createElement(
	              'h3',
	              { className: 'title' },
	              '\u6E29\u99A8\u63D0\u793A'
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'content' },
	              '\u786E\u8BA4\u82B1\u8D39',
	              _react2.default.createElement(
	                'span',
	                { className: 'text-driving' },
	                this.state.packet.consumeIntegral,
	                '\u79EF\u5206'
	              ),
	              '\u5151\u6362',
	              _react2.default.createElement(
	                'span',
	                { className: 'text-driving' },
	                this.state.packet.goodsName
	              ),
	              '\u5417\uFF1F'
	            ),
	            _react2.default.createElement(
	              'footer',
	              { className: 'footer' },
	              _react2.default.createElement(
	                'div',
	                { className: 'button-group compact nesting' },
	                _react2.default.createElement(
	                  'a',
	                  { className: 'button square text-primary', onClick: this.dismiss },
	                  '\u53D6\u6D88'
	                ),
	                _react2.default.createElement(
	                  'a',
	                  { className: 'button square text-primary text-strong', onClick: this.handleExcange },
	                  '\u786E\u5B9A'
	                )
	              )
	            )
	          )
	        ),
	        _react2.default.createElement(
	          _masklayer2.default,
	          { transparent: true, show: this.state.processing },
	          _react2.default.createElement(
	            'div',
	            { className: 'toast' },
	            _react2.default.createElement('i', { className: 'icon waiting' }),
	            _react2.default.createElement(
	              'span',
	              { className: 'text' },
	              '\u8BF7\u7A0D\u540E'
	            )
	          )
	        ),
	        _react2.default.createElement(
	          _masklayer2.default,
	          { transparent: true, show: this.state.failure },
	          _react2.default.createElement(
	            'div',
	            { className: 'toast' },
	            _react2.default.createElement(
	              'i',
	              { className: 'icon' },
	              '\uE61D'
	            ),
	            _react2.default.createElement(
	              'span',
	              { className: 'text' },
	              this.state.message
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return Package;
	}(_react.Component);

	Package.propTypes = {};
	Package.defaultProps = {};
	exports.default = Package;
	;

/***/ },

/***/ 271:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _webpackZepto = __webpack_require__(259);

	var _webpackZepto2 = _interopRequireDefault(_webpackZepto);

	var _react = __webpack_require__(11);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(261);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*!
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * screen mask, used in `Modal`, `ActionSheet`, `Popup`.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var MaskLayer = function (_Component) {
	  _inherits(MaskLayer, _Component);

	  function MaskLayer(props) {
	    _classCallCheck(this, MaskLayer);

	    var _this = _possibleConstructorReturn(this, (MaskLayer.__proto__ || Object.getPrototypeOf(MaskLayer)).call(this, props));

	    _this.state = {
	      mount: false
	    };
	    return _this;
	  }

	  _createClass(MaskLayer, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      // 关闭
	      var fn = function fn(e) {
	        var mask = (0, _webpackZepto2.default)(_this2.refs.mask);
	        if (mask.is('.ex-widget-out')) {
	          _this2.setState({
	            mount: false
	          });
	        }
	        if (mask.is('.ex-widget-in')) {
	          _this2.setState({
	            mount: true
	          });
	        }
	      };
	      var events = 'animationend webkitAnimationEnd transitionend webkitTransitionEnd';
	      events.split(' ').forEach(function (e) {
	        return _this2.refs.mask.addEventListener(e, fn, false);
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          show = _props.show,
	          transparent = _props.transparent,
	          className = _props.className,
	          others = _objectWithoutProperties(_props, ['show', 'transparent', 'className']);

	      var clazz = (0, _classnames2.default)('ex-widget-layer', {
	        'ex-widget-in': show,
	        'ex-widget-out': this.state.mount && !show,
	        'transparent': this.props.transparent
	      }, className);

	      return _react2.default.createElement(
	        'div',
	        _extends({ ref: 'mask', className: clazz }, others),
	        this.props.children
	      );
	    }
	  }]);

	  return MaskLayer;
	}(_react.Component);

	MaskLayer.propTypes = {
	  show: _react2.default.PropTypes.bool.isRequired,
	  transparent: _react2.default.PropTypes.bool
	};
	MaskLayer.defaultProps = {
	  transparent: false
	};
	exports.default = MaskLayer;

/***/ },

/***/ 272:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(11);

	var _react2 = _interopRequireDefault(_react);

	var _page = __webpack_require__(260);

	var _page2 = _interopRequireDefault(_page);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*!
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 积分协议
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var Protocol = function (_Component) {
	  _inherits(Protocol, _Component);

	  function Protocol(props) {
	    _classCallCheck(this, Protocol);

	    var _this = _possibleConstructorReturn(this, (Protocol.__proto__ || Object.getPrototypeOf(Protocol)).call(this, props));

	    _this.state = {
	      title: '积分规则'
	    };
	    return _this;
	  }

	  _createClass(Protocol, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        _page2.default,
	        { className: 'protocol', title: this.state.title },
	        _react2.default.createElement(
	          'section',
	          { className: 'main' },
	          _react2.default.createElement(
	            'div',
	            { className: 'article' },
	            _react2.default.createElement(
	              'section',
	              null,
	              _react2.default.createElement(
	                'h2',
	                null,
	                '1. \u4EC0\u4E48\u662F\u5343\u4E01\u79EF\u5206\uFF1F'
	              ),
	              _react2.default.createElement(
	                'p',
	                null,
	                '\u5343\u4E01\u79EF\u5206\u4E13\u5C5E\u4E8E\u5343\u4E01\uFF0C\u4EC5\u9650\u5728\u5343\u4E01APP\u5185\u4F7F\u7528\u3002'
	              )
	            ),
	            _react2.default.createElement(
	              'section',
	              null,
	              _react2.default.createElement(
	                'h2',
	                null,
	                '2.\u5343\u4E01\u79EF\u5206\u7684\u7528\u5904\uFF1F'
	              ),
	              _react2.default.createElement(
	                'p',
	                null,
	                '\u53EF\u7528\u4E8E\u5728\u79EF\u5206\u5546\u57CE\u4E2D\u5151\u6362\u5546\u54C1\uFF1B'
	              ),
	              _react2.default.createElement(
	                'p',
	                null,
	                '\u53EF\u53C2\u4E0E\u79EF\u5206\u62BD\u5956\u4E0E\u79EF\u5206\u5151\u6362\u6D3B\u52A8\u3002'
	              )
	            ),
	            _react2.default.createElement(
	              'section',
	              null,
	              _react2.default.createElement(
	                'h2',
	                null,
	                '3. \u5982\u4F55\u83B7\u53D6\u5343\u4E01\u79EF\u5206\uFF1F'
	              ),
	              _react2.default.createElement(
	                'section',
	                null,
	                _react2.default.createElement(
	                  'h3',
	                  null,
	                  '3.1 \u5546\u54C1/\u670D\u52A1\u7684\u8D2D\u4E70\uFF08\u975E\u5343\u4E01\u8D26\u6237\u9884\u5B58\u6D88\u8D39\uFF09'
	                ),
	                _react2.default.createElement(
	                  'p',
	                  null,
	                  '\u5728\u5343\u4E01\u5E73\u53F0\u6210\u529F\u4E0B\u5355\u652F\u4ED8\u540E\uFF0C\u6309\u5B9E\u9645\u652F\u4ED8\u91D1\u989D\uFF08\u4E0D\u542B\u7528\u6237\u4F7F\u7528\u7684\u4F18\u60E0\u5238\u3001\u5343\u4E01\u5E73\u53F0\u8865\u8D34\u6B3E\u7B49\u4FC3\u9500\u91D1\u989D\uFF09\u76842:1\u7684\u6BD4\u4F8B\u8FDB\u884C\u79EF\u5206\u7D2F\u8BA1',
	                  _react2.default.createElement(
	                    'span',
	                    { className: 'text-gray' },
	                    '\uFF08\u4F8B\uFF1A\u5B9E\u9645\u652F\u4ED8100\u5143\uFF0C\u53EF\u83B7\u5F9750\u79EF\u5206\uFF09'
	                  ),
	                  '\uFF0C\u5982\u8BA2\u5355\u4EA7\u751F\u9000\u6B3E\u6216\u53D6\u6D88\uFF0C\u8BE5\u8BA2\u5355\u589E\u52A0\u7684\u76F8\u5E94\u79EF\u5206\u5219\u88AB\u6263\u9664\u3002'
	                )
	              ),
	              _react2.default.createElement(
	                'section',
	                null,
	                _react2.default.createElement(
	                  'h3',
	                  null,
	                  '3.2 \u5546\u54C1/\u670D\u52A1\u7684\u8BC4\u4EF7'
	                ),
	                _react2.default.createElement(
	                  'p',
	                  null,
	                  '\u8BA2\u5355\u5B8C\u6210\u5E76\u6210\u529F\u8BC4\u4EF7\u540E\uFF0C\u83B7\u5F9720\u79EF\u5206\u3002'
	                )
	              ),
	              _react2.default.createElement(
	                'section',
	                null,
	                _react2.default.createElement(
	                  'h3',
	                  null,
	                  '3.3 \u5343\u4E01\u9884\u5B58\u8D26\u6237\u6D88\u8D39',
	                  _react2.default.createElement(
	                    'span',
	                    { className: 'text-gray' },
	                    '\uFF08\u4E0D\u5305\u62EC\u751F\u6D3B\u7F34\u8D39\uFF0C\u5982\u6C34\u8D39\u3001\u7535\u8D39\u3001\u71C3\u6C14\u8D39\u3001\u5BBD\u5E26\u8D39\u3001\u7269\u4E1A\u8D39\uFF09'
	                  )
	                ),
	                _react2.default.createElement(
	                  'p',
	                  null,
	                  '\u7528\u6237\u4F7F\u7528\u9884\u5B58\u6B3E\u91D1\u989D\u8D2D\u4E70\u5546\u54C1/\u670D\u52A1\u5E76\u5BF9\u5546\u54C1/\u670D\u52A1\u8BC4\u4EF7\u65F6\uFF0C\u79EF\u5206\u8BA1\u7B97\u89C4\u5219\u4E0E\u201C1\u3001\u5546\u54C1/\u670D\u52A1\u7684\u8D2D\u4E70',
	                  _react2.default.createElement(
	                    'span',
	                    { className: 'text-gray' },
	                    '\uFF08\u975E\u5343\u4E01\u8D26\u6237\u9884\u5B58\u6D88\u8D39\uFF09'
	                  ),
	                  '\u201D\u4E00\u81F4\u3002'
	                )
	              ),
	              _react2.default.createElement(
	                'section',
	                null,
	                _react2.default.createElement(
	                  'h3',
	                  null,
	                  '3.4 \u62A5\u4E8B\u62A5\u4FEE\u8BC4\u4EF7'
	                ),
	                _react2.default.createElement(
	                  'p',
	                  null,
	                  '\u62A5\u4E8B\u62A5\u4FEE\u5B8C\u6210\u5E76\u8FDB\u884C\u8BC4\u4EF7\u540E\u53EF\u83B7\u5F97100\u79EF\u5206\u3002'
	                ),
	                _react2.default.createElement(
	                  'p',
	                  null,
	                  '\u6CE8\uFF1A\u79EF\u5206\u4E0D\u80FD\u5151\u73B0\u3001\u63D0\u73B0\u3001\u4E0D\u80FD\u8F6C\u8BA9\u3002'
	                )
	              )
	            ),
	            _react2.default.createElement(
	              'section',
	              null,
	              _react2.default.createElement(
	                'h2',
	                null,
	                '4. \u76F8\u5173\u58F0\u660E'
	              ),
	              _react2.default.createElement(
	                'p',
	                null,
	                '\u5728\u76F8\u5173\u6CD5\u5F8B\u5141\u8BB8\u8303\u56F4\u5185\uFF0C\u5343\u4E01\u4E92\u8054\u4EAB\u6709\u5BF9\u79EF\u5206\u7684\u6700\u7EC8\u89E3\u91CA\u6743\u3002'
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return Protocol;
	}(_react.Component);

	Protocol.propTypes = {};
	Protocol.defaultProps = {};
	exports.default = Protocol;
	;

/***/ },

/***/ 273:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(11);

	var _react2 = _interopRequireDefault(_react);

	var _page = __webpack_require__(260);

	var _page2 = _interopRequireDefault(_page);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*!
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 兑换说明
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var Instruction = function (_Component) {
	  _inherits(Instruction, _Component);

	  function Instruction(props) {
	    _classCallCheck(this, Instruction);

	    var _this = _possibleConstructorReturn(this, (Instruction.__proto__ || Object.getPrototypeOf(Instruction)).call(this, props));

	    _this.state = {
	      title: '兑换说明'
	    };
	    return _this;
	  }

	  _createClass(Instruction, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        _page2.default,
	        { className: 'instruction', title: this.state.title },
	        _react2.default.createElement(
	          'section',
	          { className: 'main' },
	          _react2.default.createElement(
	            'div',
	            { className: 'article' },
	            _react2.default.createElement(
	              'h2',
	              null,
	              '1. \u5145\u503C\u8BF4\u660E'
	            ),
	            _react2.default.createElement(
	              'section',
	              null,
	              _react2.default.createElement(
	                'p',
	                null,
	                '1.1 \u6D41\u91CF\u4E3A\u5168\u56FD\u6D41\u91CF\uFF0C\u7ACB\u5373\u751F\u6548\uFF0C\u6708\u5E95\u5931\u6548\uFF0C\u6BCF\u4E2A\u624B\u673A\u53F7\u7801\u6BCF\u6708\u9650\u51455\u6B21\u3002'
	              ),
	              _react2.default.createElement(
	                'p',
	                null,
	                '1.2 \u6BCF\u6708\u6700\u540E\u4E24\u5929\uFF0C\u4E2D\u56FD\u79FB\u52A8\u624B\u673A\u53F7\u8FDB\u5165\u6E05\u7B97\u671F\uFF0C\u6682\u4E0D\u652F\u6301\u5151\u6362\u3002'
	              ),
	              _react2.default.createElement(
	                'p',
	                null,
	                '1.3 \u79EF\u5206\u6362\u53D6\u7684\u6D41\u91CF\uFF0C\u4EE5\u5B9E\u9645\u8FD0\u8425\u5546\u5957\u9910\u4E3A\u51C6\uFF0C\u79FB\u52A8\u3001\u8054\u901A\u3001\u7535\u4FE1\u7565\u6709\u4E0D\u540C\u3002'
	              ),
	              _react2.default.createElement(
	                'p',
	                null,
	                '1.4 \u8D85\u8FC7\u8FD0\u8425\u5546\u51B2\u62B5\u9650\u989D\u3001\u53F7\u7801\u6B20\u8D39\u3001\u5957\u9910\u4E92\u65A5\u3001\u975E\u5B9E\u540D\u8BA4\u8BC1\u3001\u8FD0\u8425\u5546\u9ED1\u540D\u5355\u7B49\u5145\u503C\u5931\u8D25\uFF0C\u5219\u79EF\u5206\u4F1A\u81EA\u52A8\u8FD4\u8FD8\u3002'
	              )
	            ),
	            _react2.default.createElement(
	              'h2',
	              null,
	              '2. \u5546\u57CE\u79EF\u5206\u4F7F\u7528\u8BF4\u660E'
	            ),
	            _react2.default.createElement(
	              'section',
	              null,
	              _react2.default.createElement(
	                'p',
	                null,
	                '2.1 \u79EF\u5206\u5546\u57CE\u5C55\u793A\u7684\u56FE\u7247\u4EC5\u4F9B\u53C2\u8003\uFF0C\u8BF7\u4EE5\u5B9E\u7269\u4E3A\u51C6\u3002'
	              ),
	              _react2.default.createElement(
	                'p',
	                null,
	                '2.2 \u79EF\u5206\u4E00\u7ECF\u5151\u6362\uFF0C\u4E0D\u4E88\u9000\u8FD8\uFF0C\u8BF7\u60A8\u8C28\u614E\u9009\u62E9\uFF0C\u5E76\u4ED4\u7EC6\u6838\u5BF9\u586B\u5199\u7684\u76F8\u5173\u4FE1\u606F\u3002'
	              ),
	              _react2.default.createElement(
	                'p',
	                null,
	                '2.3 \u79EF\u5206\u5151\u6362\u7684\u5546\u54C1\u4E0D\u5728\u552E\u540E\u8303\u56F4\u5185\uFF0C\u4E0D\u53EF\u8FDB\u884C\u9000\u6362\u8D27\u3002'
	              ),
	              _react2.default.createElement(
	                'p',
	                null,
	                '2.4 \u79EF\u5206\u5151\u6362\u7684\u5343\u4E01\u5238\u6216\u6D41\u91CF\u4F1A\u57282\u4E2A\u5C0F\u65F6\u5185\u5230\u8D26\u3002'
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return Instruction;
	}(_react.Component);

	Instruction.propTypes = {};
	Instruction.defaultProps = {};
	exports.default = Instruction;
	;

/***/ },

/***/ 274:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(11);

	var _react2 = _interopRequireDefault(_react);

	var _page = __webpack_require__(260);

	var _page2 = _interopRequireDefault(_page);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*!
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 商品详情
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var Details = function (_Component) {
	  _inherits(Details, _Component);

	  function Details(props) {
	    _classCallCheck(this, Details);

	    var _this = _possibleConstructorReturn(this, (Details.__proto__ || Object.getPrototypeOf(Details)).call(this, props));

	    _this.state = {
	      title: '商品详情'
	    };
	    return _this;
	  }

	  _createClass(Details, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        _page2.default,
	        { className: 'details', title: this.state.title },
	        _react2.default.createElement(
	          'section',
	          { className: 'main' },
	          this.props.params.id
	        )
	      );
	    }
	  }]);

	  return Details;
	}(_react.Component);

	Details.propTypes = {};
	Details.defaultProps = {};
	exports.default = Details;
	;

/***/ },

/***/ 275:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(11);

	var _react2 = _interopRequireDefault(_react);

	var _page = __webpack_require__(260);

	var _page2 = _interopRequireDefault(_page);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*!
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 订单详情
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var Order = function (_Component) {
	  _inherits(Order, _Component);

	  function Order(props) {
	    _classCallCheck(this, Order);

	    var _this = _possibleConstructorReturn(this, (Order.__proto__ || Object.getPrototypeOf(Order)).call(this, props));

	    _this.state = {
	      title: '订单详情'
	    };
	    return _this;
	  }

	  _createClass(Order, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        _page2.default,
	        { className: 'order', title: this.state.title },
	        _react2.default.createElement(
	          'section',
	          { className: 'main' },
	          this.props.params.id
	        )
	      );
	    }
	  }]);

	  return Order;
	}(_react.Component);

	Order.propTypes = {};
	Order.defaultProps = {};
	exports.default = Order;
	;

/***/ }

});
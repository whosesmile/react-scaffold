webpackJsonp([1],{0:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}a(287);var r=a(12),l=n(r),i=a(43),s=n(i),o=a(189),c=n(o),u=a(289),d=n(u),f=a(291),p=n(f),m=a(292),h=n(m),b=a(286),g=a(207);s.default.render(l.default.createElement(g.Router,{history:g.browserHistory},l.default.createElement(g.Route,{path:"/",component:c.default},l.default.createElement(g.Route,{path:"cashier"},l.default.createElement(g.IndexRedirect,{to:"payment"}),l.default.createElement(g.Route,{path:"payment",component:d.default}),l.default.createElement(g.Route,{path:"Success",component:p.default}),l.default.createElement(g.Route,{path:"Failure",component:h.default})),l.default.createElement(g.Route,{path:"*",onEnter:b.Reload}))),document.querySelector("#bootstrap"))},270:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={default:function(e,t){return"undefined"!=typeof e?e:t},currency:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"￥";return e=Number(e),/^[\d.]+$/.test(e)?a+e.toFixed(e%1===0?0:t):""},date:function(e,t){e=e.constructor===Date?e:new Date(e);var a={"y+":e.getFullYear(),"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),"S+":e.getMilliseconds()};for(var n in a)if(new RegExp("("+n+")").test(t))if("y+"==n)t=t.replace(RegExp.$1,(""+a[n]).substr(4-RegExp.$1.length));else if("S+"==n){var r=RegExp.$1.length;r=1==r?3:r,t=t.replace(RegExp.$1,("00"+a[n]).substr((""+a[n]).length-1,r))}else t=t.replace(RegExp.$1,1==RegExp.$1.length?a[n]:("00"+a[n]).substr((""+a[n]).length));return t},truncate:function(e,t){return e=String(e||""),e.length<=t?e:e.substring(0,t)+"..."}};t.default=a},274:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function r(e,t){var a={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(a[n]=e[n]);return a}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},c=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),u=a(12),d=n(u),f=a(43),p=(n(f),a(264)),m=n(p),h=a(265),b=n(h),g=function(e){function t(e){l(this,t);var a=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.dismiss=function(e){a.setState({show:!1})},a.state={show:a.props.show,presets:{success:"&#xe61c;",failure:"&#xe61d;",warning:"&#xe601;"}},a}return s(t,e),c(t,[{key:"componentWillUnmount",value:function(){clearTimeout(this.timer)}},{key:"renderIcon",value:function(){var e=this.props.icon;return Object.keys(this.state.presets).includes(e)?d.default.createElement("i",{className:"icon",dangerouslySetInnerHTML:{__html:this.state.presets[e]}}):"loading"===e?d.default.createElement("i",{className:"icon waiting"}):/^&#\w+;$/.test(e)?d.default.createElement("i",{className:"icon",dangerouslySetInnerHTML:{__html:e}}):/^(https?)?\/\//.test(e)?d.default.createElement("i",{className:"icon"},d.default.createElement("img",{src:e})):d.default.createElement("i",{className:"icon"},"")}},{key:"render",value:function(){var e=this.props,t=(e.icon,e.message),a=e.className,n=(e.show,e.time),l=e.callback,i=void 0===l?this.dismiss:l,s=r(e,["icon","message","className","show","time","callback"]),c=(0,m.default)("toast",a);return clearTimeout(this.timer),this.timer=setTimeout(i,n),d.default.createElement(b.default,{transparent:!0,show:this.state.show},d.default.createElement("div",o({className:c},s),this.renderIcon(),d.default.createElement("span",{className:"text"},t||"木有提示")))}}]),t}(u.Component);g.propTypes={icon:u.PropTypes.string,message:u.PropTypes.string,show:u.PropTypes.bool,time:u.PropTypes.number,callback:u.PropTypes.func},g.defaultProps={show:!0,time:3e3},t.default=g},287:function(e,t,a){var n=a(288);"string"==typeof n&&(n=[[e.id,n,""]]);a(11)(n,{});n.locals&&(e.exports=n.locals)},288:function(e,t,a){t=e.exports=a(10)(),t.push([e.id,'body{-webkit-user-select:none;user-select:none;overflow-x:hidden;background-color:#f8f8f8}.bg-white,.bgwhite{background-color:#fff!important}.ex-page{min-height:100vh;overflow:hidden;background-color:#f8f8f8;-webkit-transform:translateZ(0);transform:translateZ(0);-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;transition-property:transform;transition-property:transform,-webkit-transform;-webkit-transition-duration:.3s;transition-duration:.3s}.ex-page:before{clear:both;content:"";display:table}.ex-page.view-enter,.ex-page.view-leave{position:absolute;top:0;left:0;right:0;width:100%}.ex-page>header.bar:first-child{background-color:#f9f9f9}.notrans{-webkit-transform:none;transform:none}.ahead .view-enter{z-index:2;-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}.ahead .view-enter.view-enter-active,.ahead .view-leave{-webkit-transform:translateZ(0);transform:translateZ(0)}.ahead .view-leave{z-index:1}.ahead .view-leave.view-leave-active,.backoff .view-enter{-webkit-transform:translate3d(-30%,0,0);transform:translate3d(-30%,0,0)}.backoff .view-enter{z-index:1}.backoff .view-enter.view-enter-active,.backoff .view-leave{-webkit-transform:translateZ(0);transform:translateZ(0)}.backoff .view-leave{z-index:2}.backoff .view-leave.view-leave-active{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}.carousel{position:relative;overflow:hidden}.carousel .slider{position:absolute!important;top:0;bottom:0}.carousel .slider,.carousel .slider .slider-frame{height:100%!important}.carousel .slider [class^=slider-decorator]{width:100%;bottom:0;top:auto!important}.carousel .slider [class^=slider-decorator] nav{position:absolute;bottom:10px;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);line-height:normal}.carousel .slider [class^=slider-decorator] nav a{display:inline-block;width:16px;height:2px;margin:0 2px;vertical-align:middle;overflow:hidden;background-color:hsla(0,0%,100%,.5)}.carousel .slider [class^=slider-decorator] nav a.active{background-color:#fff}.loader{position:relative;-webkit-transform:translateZ(0);transform:translateZ(0)}.tabpane{display:none}.tabpane.active{display:block}.swing.fixed .tablet{position:fixed;top:0;left:0;width:100%;z-index:100;box-shadow:0 5px 20px rgba(0,0,0,.1)}.cases{margin:10px}.cases .header{padding:10px 0}.cases .header .title{display:inline-block;font-weight:400;padding-left:10px;line-height:1.2rem;margin-bottom:10px;font-size:15px;border-left:4px solid #ff5a32}.cases .content{margin-left:-5px;margin-right:-5px;margin-top:-10px}.cases .content:after{content:"\\200";visibility:hidden;clear:both;display:block;font-size:0;height:0}.cases .content .item{float:left;width:50%;padding:10px 5px 0;color:#666}.cases .content .item .panel{position:relative;background-color:#fff;border-radius:5px;overflow:hidden}.cases .content .item .panel .figure{position:relative;display:block;overflow:hidden;padding-top:100%;background:transparent url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAvCAAAAAB2oJONAAAAAnRSTlMA/1uRIrUAAAE2SURBVEjH7dZdb4IwFAbg/v+/dGjBLU4HG8zFuMaFCBECbkTHIrt9dyHyMQeE9s54rjhJ+7T0K4cBiS1IKYSdAAyS3CBSisAlCZZSBOWIKGWOC41wHcZDHSAUjLY6wJZuwA24AdcPZEGsAxQz4gaPlIHj3fQLeKONIvA9mQEAfPKVgNyal18belcADqZdv7okRwN74bRarEYCmXhu5bGxHAV8cu9Pm8R4bWQ/A8COv1yMsuOLanumZH30Ae3RLmaVW/NsYSTdQNf/luty2p6lEXcB3Su+F08AzNP2rFpdGkDfnh9MG8jKRFL4H9B/6nLrsU7W1SVpAEPn/nw/2o1rYD14846Thzo5T7cCCjFcqBT3frM0Ka7nUdWs0jhzPB3Ac1hKsXr/mFIGSW6oViuHLkkw3Wr9F+lrTgHcjDsHAAAAAElFTkSuQmCC") 50% no-repeat;background-size:32px 24px}.cases .content .item .panel .figure>img{position:absolute;top:50%;left:50%;width:100%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.cases .content .item .panel .text{position:relative;padding:8px 10px;font-size:15px}.cases .content .item .panel .text:before{content:" ";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #d9d9d9;color:#d9d9d9;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.cases .content .item .panel .text .name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;font-weight:400}.cases .content .item .panel .text .brief{margin-top:5px;font-size:14px}.cases .content .item .panel .text .brief i{font-style:normal}.list.compact{margin-top:-1px}.list>label.item>*{pointer-events:none}.main.has-footer{margin-bottom:58px}.truncate{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}.truncate[ui-mode="3"]{-webkit-line-clamp:3}',""])},289:function(e,t,a){(function(e){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),o=a(12),c=n(o),u=a(264),d=(n(u),a(269)),f=n(d),p=a(268),m=n(p),h=a(274),b=n(h),g=a(263),v=n(g),y=a(266),w=n(y),E=a(270),x=n(E),k=a(290),N=function(t){function a(e){r(this,a);var t=l(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,e));return t.clearWidget=function(){var e=[].concat(t.state.widget||[]);e.pop(),t.setState({widget:e})},t.handlePayment=function(){var e=t.state.list.find(function(e){return 1===e.defaultFlag});return e?void(11===e.type?t.handleCash(e):21===e.type?t.handleCard(e):31===e.type?t.handleAlipay(e):51===e.type?t.handleWeixin(e):61===e.type?t.handleWallet(e):t.handleOthers(e)):t.setState({widget:c.default.createElement(b.default,{icon:"failure",message:"请选支付方式",callback:t.clearWidget})})},t.state={title:"收银台",list:[],loading:!0},t}return i(a,t),s(a,[{key:"handleChange",value:function(e){this.setState({list:this.state.list.map(function(t){return t.defaultFlag=t===e?1:0,t})})}},{key:"handleFeedback",value:function(e){var t=this.props.location.query;this.props.router.push({pathname:(0,k.getFeedback)(t.business,e),query:t})}},{key:"handleAlipay",value:function(){var t=this;this.setState({widget:c.default.createElement(b.default,{icon:"loading",message:"请稍后",time:1e4})}),e.get("/cashier/ajax/alipay",{code:this.props.location.query.code},function(e){200===e.code&&e.data.url?location.href=e.data.url:t.setState({widget:c.default.createElement(b.default,{icon:"failure",message:"支付调用失败",callback:t.clearWidget})})})}},{key:"handleWeixin",value:function(){var t=this;this.setState({widget:c.default.createElement(b.default,{icon:"loading",message:"请稍后",time:1e4})}),e.get("/cashier/ajax/weixin",{code:this.props.location.query.code},function(e){if(200===e.code)t.setState({widget:null}),WeixinJSBridge.invoke("getBrandWCPayRequest",e.data,function(e){"get_brand_wcpay_request:ok"===e.err_msg?t.handleFeedback("success"):t.handleFeedback("failure")});else{var a={title:"抱歉",message:e.data.message||"微信支付暂时不可用",buttons:[{text:"确定",onClick:t.clearWidget}]};t.setState({widget:c.default.createElement(v.default,a)})}})}},{key:"handleWallet",value:function(){var t=this,a=null,n=function(e){return a=e.target.value},r=this.state.wallet,l=function(){t.setState({widget:c.default.createElement(b.default,{icon:"loading",message:"请稍后",time:1e4})}),e.post("/cashier/ajax/wallet",{code:t.props.location.query.code,password:a},function(e){200===e.code?t.handleFeedback("success"):t.setState({widget:c.default.createElement(b.default,{icon:"failure",message:e.data.message||"支付失败",callback:t.clearWidget})})})};if(0==r.status)this.setState({widget:c.default.createElement(b.default,{icon:"failure",message:"账户已被冻结",callback:this.clearWidget})});else if(1===r.status){var i={title:"支付密码",message:c.default.createElement("section",null,c.default.createElement("div",{className:"list"},c.default.createElement("label",{className:"item"},c.default.createElement("span",{className:"label"},"密码"),c.default.createElement("div",{className:"text"},c.default.createElement("input",{className:"input",type:"password",pattern:"[0-9]*",placeholder:"请输入您的支付密码",maxLength:"6",onChange:n}))))),buttons:[{text:"取消",onClick:this.clearWidget},{text:"确定",onClick:function(){return a?void l():t.setState({widget:[].concat(t.state.widget).concat(c.default.createElement(b.default,{icon:"failure",message:"密码不能为空",callback:t.clearWidget}))})}}]};this.setState({widget:c.default.createElement(v.default,i)})}else 2===r.status&&l()}},{key:"handleCash",value:function(){var e={title:"现金支付",message:"您需要前往物业中心现金支付",buttons:[{text:"其他方式",onClick:this.clearWidget},{text:"查看订单",onClick:function(){location.href="/account/orders"}}]};this.setState({widget:c.default.createElement(v.default,e)})}},{key:"handleCard",value:function(){var e={title:"刷卡支付",message:"您需要前往物业中心刷卡支付",buttons:[{text:"其他方式",onClick:this.clearWidget},{text:"查看订单",onClick:function(){location.href="/account/orders"}}]};this.setState({widget:c.default.createElement(v.default,e)})}},{key:"handleOthers",value:function(){var e={title:"物业前台",message:"您需要前往物业中心当面支付",buttons:[{text:"其他方式",onClick:this.clearWidget},{text:"查看订单",onClick:function(){location.href="/account/orders"}}]};this.setState({widget:c.default.createElement(v.default,e)})}},{key:"componentDidMount",value:function(){var t=this,a=this.props.location.query;if(!a.code||!a.price||!a.business){var n={title:"数据异常",message:"缺少必要的支付参数，无法支付",buttons:[{text:"关闭",onClick:this.clearWidget}]};return this.setState({widget:c.default.createElement(v.default,n)})}e.get("/cashier/ajax/method",{code:a.code,price:a.price,business:a.business},function(e){200===e.code&&!function(){var a=e.data,n=!1;w.default.is("wx")?w.default.is("wx")&&(a.onlinePayMethods=a.onlinePayMethods.filter(function(e){return 31!==e.type||(n=1===e.defaultFlag,!1)})):a.onlinePayMethods=a.onlinePayMethods.filter(function(e){return 51!==e.type||(n=1===e.defaultFlag,!1)}),a.virtualPayMethods=a.virtualPayMethods.filter(function(e){return 61===e.type}),0===a.walletStatus.status&&a.virtualPayMethods.filter(function(e){return 61===e.type&&(n=1===e.defaultFlag,e.defaultFlag=0),!0}),t.setState({loading:!1,list:a.onlinePayMethods.concat(a.virtualPayMethods).concat(a.offlinePayMethods),wallet:a.walletStatus},function(){if(n&&t.state.list.length){if(1===t.state.wallet.status){var e=t.state.list[0];n=!1,e.defaultFlag=1}else{var a=t.state.list.find(function(e){return 61!==e.type});a&&(n=!1,a.defaultFlag=1)}t.setState({lose:n,list:t.state.list})}})}()})}},{key:"render",value:function(){var e=this,t=this.state.wallet,a=Number(this.props.location.query.price||0);return c.default.createElement(m.default,{className:"home",title:this.state.title,widget:this.state.widget},c.default.createElement("section",{className:"main"},this.state.loading&&c.default.createElement("div",{className:"loadmore"},c.default.createElement("i",{className:"loading"}),c.default.createElement("span",{className:"tips text-gray"},"正在加载")),!this.state.loading&&0===this.state.list.length&&c.default.createElement("div",{className:"feedback"},c.default.createElement("div",{className:"mark"},c.default.createElement("img",{width:"220",height:"220",src:"//img1.qdingnet.com/b70973ae84276a865ae7ae673ea1e318.png",alt:"空白"})),c.default.createElement("h3",{className:"title"},"无法支付"),c.default.createElement("div",{className:"describe"},"非常抱歉，您当前浏览器无法操作",c.default.createElement("br",null),"你可以使用微信、服务窗、或千丁小区APP"),c.default.createElement("div",{className:"vspace hspace"},c.default.createElement("a",{className:"button plain-primary",href:"//dl.qdingnet.com"},"下载千丁小区"))),this.state.list.length>0&&c.default.createElement("div",null,c.default.createElement("div",{is:!0,class:"hspace text-sm","ui-mode":"15px"},c.default.createElement("div",{is:!0,class:"vspace","ui-mode":"10px"},"请选择支付方式")),this.state.list.map(function(a,n){return c.default.createElement("div",{key:n,className:"list"},61===a.type&&c.default.createElement("label",{is:!0,class:"item tapable","ui-mode":"15px"},c.default.createElement("div",{className:"avatar"},c.default.createElement("img",{width:"45",height:"45",src:a.icon})),c.default.createElement("span",{className:"text"},c.default.createElement("span",null,a.name,c.default.createElement("span",{className:"text-driving text-sm"},"（余额: ",x.default.currency(a.value),"）")),0==t.status&&c.default.createElement("div",{className:"brief text-ellipsis"},c.default.createElement("span",{className:"text-driving"},t.statusTips||"提醒：钱包已被冻结，请联系客服")),1==t.status&&c.default.createElement("div",{className:"brief text-ellipsis"},a.desc)),c.default.createElement("input",{className:"checkbox",type:"radio",name:"paytype",checked:a.defaultFlag,disabled:0==t.status,onChange:e.handleChange.bind(e,a)})),61!==a.type&&c.default.createElement("label",{is:!0,class:"item tapable","ui-mode":"15px"},c.default.createElement("div",{className:"avatar"},c.default.createElement("img",{width:"45",height:"45",src:a.icon})),c.default.createElement("span",{className:"text"},c.default.createElement("span",null,a.name),c.default.createElement("div",{className:"brief text-ellipsis"},a.desc)),c.default.createElement("input",{className:"checkbox",type:"radio",name:"paytype",checked:a.defaultFlag,onChange:e.handleChange.bind(e,a)})))}))),this.state.list.length>0&&c.default.createElement(f.default,{component:"footer",className:"btm-fixed"},c.default.createElement("div",{className:"button-group compact"},c.default.createElement("button",{className:"button literal square text-left"},"应付: ",c.default.createElement("span",{className:"text-driving"},x.default.currency(a))),c.default.createElement("button",{className:"button driving square",disabled:this.state.lose,onClick:this.handlePayment},"立即支付"))))}}]),a}(o.Component);t.default=N}).call(t,a(190))},290:function(e,t){"use strict";function a(e,t){var a=n[e]||{success:"/cashier/success",failure:"/cashier/failure"};return a[t]}Object.defineProperty(t,"__esModule",{value:!0});var n={JF:{success:"/integral/success",failure:"/integral/failure"}};t.CONFIG=n,t.getFeedback=a},291:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),o=a(12),c=n(o),u=a(207),d=a(268),f=n(d),p=function(e){function t(e){r(this,t);var a=l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={title:"支付成功"},a}return i(t,e),s(t,[{key:"render",value:function(){return c.default.createElement(f.default,{className:"success",title:this.state.title,widget:this.state.widget},c.default.createElement("section",{className:"main"},c.default.createElement("div",{className:"feedback"},c.default.createElement("div",{className:"mark"},c.default.createElement("i",{className:"icon text-success"},"")),c.default.createElement("h3",{className:"title"},"支付成功"),c.default.createElement("div",{className:"describe"},"如有疑问，您可以致电 ",c.default.createElement("a",{className:"link",href:"tel:4000818181"},"4000818181")," 咨询"),c.default.createElement("div",{className:"vspace hspace"},c.default.createElement(u.Link,{className:"button plain-success",to:"/account/orders"},"查看订单")))))}}]),t}(o.Component);t.default=p},292:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),o=a(12),c=n(o),u=a(207),d=a(268),f=n(d),p=function(e){function t(e){r(this,t);var a=l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={title:"支付失败"},a}return i(t,e),s(t,[{key:"render",value:function(){return c.default.createElement(f.default,{className:"failure",title:this.state.title,widget:this.state.widget},c.default.createElement("section",{className:"main"},c.default.createElement("div",{className:"feedback"},c.default.createElement("div",{className:"mark"},c.default.createElement("i",{className:"icon text-warning"},"")),c.default.createElement("h3",{className:"title"},"支付失败"),c.default.createElement("p",{className:"describe"},"非常抱歉，您可以返回订单尝试重新发起支付",c.default.createElement("br",null),"您也可以致电 ",c.default.createElement("a",{className:"link",href:"tel:4000818181"},"4000818181")," 咨询"),c.default.createElement("div",{className:"vspace hspace"},c.default.createElement(u.Link,{className:"button plain-warning",to:"/account/orders"},"查看订单"),c.default.createElement("button",{className:"button default",onClick:history.back.bind(history)},"返回")))))}}]),t}(o.Component);t.default=p}});
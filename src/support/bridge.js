import Env from './env';
import { browserHistory } from 'react-router';
import { getFeedback } from '../modules/cashier/config';

// 各种行为定义
const ACTIONS = {
  // 跳转模型
  SKMODEL: 'jsSkipModel',
  // 分享
  SHARE: Env.version < '3.0.0' ? 'jsShowShareImg_Url' : 'jsShare',
  // 收银台
  PAYMENT: 'jsShowQDPay',
  // 乐购频道
  CHANNEL: 'jsShowGoodsCategoryList',
  // 设置菜单
  MENUBAR: 'jsShowMenuList',
  // 扫描二维码
  SCANNER: 'jsShowScannerQRCode',
  // 订单通知
  ODCHANGE: 'jsOrderStatusChange',
  // 关闭自身
  CLOSE: 'jsToolCloseWebPage',
};

// 连接方法
function connect(callback) {
  if (typeof window !== undefined) {
    if (window.WebViewJavascriptBridge) {
      callback(window.WebViewJavascriptBridge);
    } else {
      document.addEventListener('WebViewJavascriptBridgeReady', function() {
        callback(window.WebViewJavascriptBridge);
      }, false);

      // 3.0.0 新增 比较坑
      if (Env.version >= '3.0.0') {
        if (window.WVJBCallbacks) {
          return window.WVJBCallbacks.push(callback);
        }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'https://__bridge_loaded__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0);
      }
    }
  }
}

// 初始化桥
connect(function(bridge) {
  // 不能省略
  if (Env.version < '3.0.0') {
    bridge.init(function(message, callback) {});
  }

  // 可以添加客户端方法
  bridge.registerHandler('webviewCallback', function(data) {
    // 格式化数据
    data = typeof data === 'object' ? data : JSON.parse(data);
    // 点击菜单
    if (data.action === 'menuClick') {
      if (/^event:/.test(data.entity.content)) {
        $(document).triggerHandler(data.entity.content);
      } else {
        location.href = data.entity.content;
      }
    }
    // 扫码结果
    else if (data.action === 'scanResult') {
      $(document).triggerHandler('event:scanner', data);
    }
    // 支付回调
    else if (data.eventType === 'jsShowQDPay') {
      // 找到支付数据
      let cache = JSBridge.cache[ACTIONS.PAYMENT];
      // 通知APP更新订单列表
      JSBridge.invoke(ACTIONS.ODCHANGE, { orderCode: cache.orderId });
      let business = cache.payBusinessType;
      let type = data.code == 200 ? 'success' : 'failure';
      let pathname = getFeedback(business, type);
      if (pathname.indexOf('/cashier') === 0) {
        location.href = `${ pathname }?code=${ cache.orderId }&business=${ cache.payBusinessType }&price=${ cache.shouldPay }`;
      } else {
        browserHistory.push({
          pathname: pathname,
          query: {
            code: cache.orderId,
            business: cache.payBusinessType,
            price: cache.shouldPay
          }
        });
      }
    }
    // 分享结果
    else if (data.action === 'shareResult') {
      // 找到分享数据
      let cache = JSBridge.cache[ACTIONS.SHARE];
      $(document).triggerHandler('event:share:success', cache);
    }
    // 上传图片
    else if (data.action === 'imageFromApp' || (data.entity && (data.entity.urlImageList || data.entity.base64ImageList))) {
      $(document).triggerHandler('event:upload', data);
    }
  });
});

// 对外接口
const JSBridge = {
  invoke: function(action, entity) {
    // 缓存数据 以便后面回调用到
    this.cache[action] = entity;
    connect(function(bridge) {
      // < 3.0.0
      if (Env.version < '3.0.0') {
        bridge.callHandler(action, entity || {});
      }
      // >= 3.0.0
      else {
        bridge.callHandler('jsCallApp', { action: action, entity: entity || {}, });
      }
    });
  },
  cache: {},
};

// 跳转
JSBridge.skmodel = function() {
  var args = arguments;
  var entity = { skip: { entity: Object.assign({ skno: args[0] }, args[1]) } };
  return this.invoke(ACTIONS.SKMODEL, entity);
};

// 菜单
JSBridge.menubar = function(data) {
  if (Object.prototype.toString.call(data) === '[object Array]') {
    data = {
      menuList: data,
    };
  }
  if (Env.is('app')) {
    this.invoke(ACTIONS.MENUBAR, data);
  }
};

// 支付
JSBridge.payment = function(code, price, business) {
  var entity = null;
  var args = arguments;
  // 三参 code price business
  if (args.length === 3) {
    entity = { orderId: code, shouldPay: price, payBusinessType: business, };
  }
  // 单参: object
  else if (args.length === 1 && typeof args[0] === 'object') {
    entity = {
      orderId: args[0].code,
      shouldPay: args[0].price,
      payBusinessType: args[0].business,
    };
  }

  // APP
  if (Env.is('app')) {
    this.invoke(ACTIONS.PAYMENT, entity);
  }
  // H5: 转换成HTTP协议
  else {
    location.href = `http://${ location.host }/cashier/payment?code=${ code }&price=${ price }&business=${ business }`;
  }
};

// 分享
JSBridge.share = function(options) {
  // { title desc imgUrl link }
  if (Env.is('app')) {
    // 新旧版本不兼容
    if (Env.version < '3.0.0') {
      // 重新适配
      options = {
        'kQDShareH5Key_SesseionStyle': 'kQDSessionImgToWeb',
        'kQDShareH5Key_TimelineStyle': 'kQDTimelineImgToWeb',
        'kQDShareH5Key_QQStyle': 'kQDQqWeb',
        'kQDShareH5Key_UIType': 'kQDShareH5Value_UIType_SelecteUI',
        'kQDShareH5Key_QZoneStyle': 'kQQZoneImgToUrl',
        'kQDShareH5Key_Title': options.title,
        'kQDShareH5Key_Text': options.desc,
        'kQDShareH5Key_Image': options.imgUrl,
        'kQDShareH5Key_Url': options.link,
      };
      this.invoke(ACTIONS.SHARE, options);
    }
    // 新版本
    else {
      options = {
        shareType: 'Panel',
        shareScene: ['wxSession', 'wxTimeline', 'QQ', 'QZone', 'SocialGroup'],
        shareContent: {
          type: 'Web',
          imageType: 'url',
          title: options.title,
          text: options.desc,
          image: options.imgUrl,
          skipUrl: options.link,
        },
      };

      this.invoke(ACTIONS.SHARE, options);
    }
  }
};

// 分享配置 微信|APP
JSBridge.shareConfig = function(options) {
  // APP
  if (Env.is('app')) {
    this.menubar([{ name: '分享', content: 'event:share', }]);
    $(document).off('event:share').on('event:share', function(e) {
      JSBridge.share(options);
    });
  }
  // 微信
  else if (Env.is('wx') && 'wx' in window) {
    wx.ready(function() {
      ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'].forEach(function(name) {
        wx[name](Object.assign(options, {
          success: function() {
            $(document).triggerHandler('event:share:success', options);
          },
          success: function() {
            $(document).triggerHandler('event:share:cancel', options);
          },
        }));
      });
    });
  }
};

// 扫码
JSBridge.scanner = function(accept) {
  // 千丁扫码
  if (Env.is('app')) {
    this.invoke(ACTIONS.SCANNER, {
      isGetReturnData: accept || false, // 是否回传结果 不回传则APP自动处理
    });
  }
  // 微信扫码
  else if (Env.is('wx') && 'wx' in window) {
    wx.ready(function() {
      wx.scanQRCode({
        needResult: accept ? 1 : 0,
        // 当needResult 为1时，扫码返回的结果
        success: function(res) {
          $(document).triggerHandler('event:scanner', res.resultStr);
        }
      });
    });
  }
};

// 商城分类
JSBridge.channel = function(id) {
  if (Env.is('app')) {
    // 有缓存数据
    if (this.categories) {
      this.invoke(ACTIONS.CHANNEL, {
        categoryId: id,
        category: this.categories,
      });
    }
    // 没有数据
    else {
      $.get('/shopping/ajax/channel', (res) => {
        if (res.code === 200) {
          this.categories = res.data.list;
          this.invoke(ACTIONS.CHANNEL, {
            categoryId: id,
            category: this.categories,
          });
        }
        // 防御失败
        else {
          location.href = '/shopping';
        }
      });
    }
  } else {
    location.href = `/shopping?channel=${ id }`;
  }
};

// 关闭
JSBridge.close = function(id) {
  if (Env.is('app')) {
    this.invoke(ACTIONS.CLOSE);
  }
};

// 对外接口
JSBridge.ACTIONS = ACTIONS;

// 全局添加
if (typeof window !== undefined) {
  window.JSBridge = JSBridge;
}

export default JSBridge;
export { ACTIONS, };

// skip model
export default function skip(model) {
  // 转换JSON
  if (typeof model === 'string') {
    try {
      model = JSON.parse(model);
    } catch (e) {
      return '/home';
    }
  }
  // 这里应该结合JsBridge 区分对待
  var data = model.entity || model;
  switch (Number(data.skno)) {
    case 1000:
      return '/home';
    case 1001: // 通行证
      return '/home';
    case 1002:
      return '/assistant/notices';
    case 1003: // 扫码
      return '/home';
    case 2000:
      return '/assistant';
    case 2100:
      return '/matter';
    case 2101:
      return '/matter/report';
    case 2102:
      return '/matter/report/package';
    case 2103:
      return '/matter/report/light';
    case 2104:
      return '/matter/report/hose';
    case 2105:
      return '/matter/report/picture';
    case 2106:
      return '/matter/report/line';
    case 2107:
      return '/matter/report/dredge';
    case 2108:
      return '/matter/report/boiler';
    case 2109:
      return '/matter/report/erepair';
    case 2110:
      return '/matter/report/eclean';
    case 2200: // 访客记录
    case 2201: // 访客通行记录
    case 2300: // 物业账单
    case 2400: // 邀请加入
    case 2402: // 加入千丁
    case 3000: // 邻聚社区
    case 3001: // 邻聚广场发现
    case 3002: // 邻聚广场标签
    case 3003: // 邻聚-指定活动的活动详情
    case 3004: // 邻聚-指定活动的活动详情-参与的人
    case 3005: // 邻聚-指定标签的标签页
    case 3006: // 邻聚-指定标签的标签页-参与的人
    case 3007: // 邻聚-指定用户的个人页
    case 3008: // 邻聚-指定帖子的详情
    case 3009: // 邻聚-更多兴趣群
    case 3010: // 邻聚-群公告详情
    case 3011: // 邻聚-加入群组
      return '/home';
    case 4000:
      return '/profile';
    case 4001:
      return '/account/orders';
    case 4002:
      return '/account/addresses';
    case 4003:
      return '/shopping/cart';
    case 4004: // 我的邻聚
    case 4005: // 邻聚黑名单
    case 4006: // 通行记录
    case 4007: // 通用设置
      return '/home';
    case 4008:
      return '/shopping/order/' + data.id;
    case 4009:
      return '/shopping/evaluate/' + data.id;
    case 4100:
      return '/wallet';
    case 4101:
      return '/wallet/records';
    case 4102:
      return '/wallet/deposit';
    case 4103: // 亲情支付
      return '/home';
    case 4104:
      return '/account/coupons';
    case 4105:
      return '/wallet/manage';
    case 4107:
      return '/account/coupons';
    case 4200:
      return '/account/settings';
    case 4201:
      return '/house';
    case 4202: // 选择绑定方式
    case 4203: // 选择绑定方式 - 身份证
      return '/home';
    case 4204:
      return '/account/mobile';
    case 4205: // 修改登录密码
      return '/home';
    case 5000:
      return '/shopping/groups/' + data.ids;
    case 5001:
    case 5002:
    case 5003:
    case 5004:
      return '/shopping/details/' + data.id;
    case 5005:
      return '/shopping/feature/' + data.id;
    case 5006:
      return '/shopping';
    case 6000: // 消息中心
    case 6001: // 消息设置
    case 6002: // 系统消息
      return '/home';
    case 7000:
      return data.url || '/home';
  }
  return '/home';
};

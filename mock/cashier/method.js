// https://github.com/Marak/faker.js/wiki
// 2.8新增 /api/json/brick/getRoomBygroupName
var faker = require('faker')
module.exports = function() {
  return {
    code: 200,
    data: {
      "combinationPayMainMethods": [],
      "message": "",
      "offlinePayMethods": [{
        "activity": "",
        "combinationShouldPay": "",
        "defaultFlag": 0,
        "desc": "需前往物业前台支付后才会发货",
        "icon": "https://img-app.qdingnet.com/qiniu:qding:xianjin_zf_icon@2x.png?imageView2/2/w/100/h/100&e=1486719618&token=QlVOYFxHiqoYWqP8fqd2BQ7a8KT5Y7RWC7CuUSOK:NRCkko8xrZic3fGjiun24EHOLZQ=",
        "name": "物业前台",
        "quotaAmount": "",
        "type": 141
      }],
      "onlinePayMethods": [{
        "activity": "",
        "combinationShouldPay": "",
        "defaultFlag": 0,
        "desc": "微信支付安全",
        "icon": "https://img-app.qdingnet.com/qiniu:qding:weixin_zf_icon@2x.png?imageView2/2/w/100/h/100&e=1486719618&token=QlVOYFxHiqoYWqP8fqd2BQ7a8KT5Y7RWC7CuUSOK:BRCCIL-_PxDmq72a2n4VaC74Tyc=",
        "name": "微信",
        "quotaAmount": "",
        "type": 51
      }, {
        "activity": "",
        "combinationShouldPay": "",
        "defaultFlag": 0,
        "desc": "推荐有支付宝账户的用户使用",
        "icon": "https://img-app.qdingnet.com/qiniu:qding:alipaynew_zf_icon@2x.png?imageView2/2/w/100/h/100&e=1486719618&token=QlVOYFxHiqoYWqP8fqd2BQ7a8KT5Y7RWC7CuUSOK:QUPOMZokWOxpCuQJfns3IUOXRL4=",
        "name": "支付宝",
        "quotaAmount": "",
        "type": 31
      }],
      "toast": "",
      "virtualPayMethods": [{
        "activity": "",
        "combinationShouldPay": "",
        "defaultFlag": 1,
        "desc": "钱包支付更快捷",
        "familyPayBean": [],
        "icon": "https://img-app.qdingnet.com/qiniu:qding:qianbao_zf_icon@2x.png?imageView2/2/w/100/h/100&e=1486719618&token=QlVOYFxHiqoYWqP8fqd2BQ7a8KT5Y7RWC7CuUSOK:M7SD2KJoRt7NVbRLA0xrn3DutQI=",
        "name": "钱包",
        "quotaAmount": "",
        "type": 61,
        "value": "2.36"
      }],
      "walletStatus": {
        "status": 1,
        "statusTips": ""
      }
    }
  };
}

// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  return {
    code: 200,
    "data": {
      "list": [{
        "specDate": 1489130766000, //日期规格
        "sellPrice": 699 //销售价格
      }, {
        "specDate": 1489170766000, //日期规格
        "sellPrice": 699 //销售价格
      }, {
        "specDate": 1489553166000, //日期规格
        "sellPrice": 3699 //销售价格
      }, {
        "specDate": 1495553166000, //日期规格
        "sellPrice": 3699 //销售价格
      }],
      "message": "查询成功"
    }
  };
}

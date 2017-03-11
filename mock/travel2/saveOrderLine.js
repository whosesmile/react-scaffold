// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  return {
    code: 200,
    "data": {
      "entity": {
        "orderCode": "TL63871238128",
      },
      "message": "查询成功"
    }
  };
}

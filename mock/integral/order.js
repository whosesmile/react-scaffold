// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  return {
    code: 200,
    data: {
      entity: {
        orderId: faker.random.number(),
        goodsId: faker.random.number(),
        goodsType: faker.random.arrayElement(['TICKET', 'ENTITY', 'FLOW']),
        goodsName: faker.name.jobArea(),
        exchangeAt: new Date(faker.date.recent()).getTime(),
        consumeIntegral: faker.random.number(),
        marketPrice: faker.random.number(),
        number: faker.random.number(),
        orderCode: faker.random.number(),
        consigneeMobile: 18610535297,
        status: 2,
        source: 1,
        coverImg: faker.image.image(100, 100),
      }
    },
  };
}

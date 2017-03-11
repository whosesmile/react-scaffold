// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {

  var list = [];
  for (var i = 0; i < 20; i++) {
    list.push({
      id: faker.random.number(),
      title: "千丁专场植树节一日游",
      subTitle: "意式庄园，自制DIY披萨，采摘时令水果蔬菜",
      startArea: "北京出发",
      travel: "自由行",
      mainImg: faker.random.arrayElement(['https://img1.qdingnet.com/image-f90efc2a-20fc-4ec8-9acc-d4ef2bb3de0b.jpg', 'https://img1.qdingnet.com/image-74e752f6-f06f-4639-ac37-b1aaeb88ba11.jpg', 'https://img1.qdingnet.com/image-57916e2b-6b71-461d-8b24-fe85b1576c54.jpg']),
      lowestPrice: 600, //单位分
      priceUnit: "间",
    });
  }
  return {
    code: 200,
    data: {
      list: list
    },
  };

}

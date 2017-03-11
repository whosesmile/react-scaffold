// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  return {
    code: 200,
    "data": {
      "list": [{
        "cardList": [{
          "birthdate": 1490976000000,
          "cardNo": "aaaaa",
          "cardType": "1",
          "expires": 32132111,
          "familyName": "11",
          "givenName": "22",
          "memberContactsId": "2222222222",
          "memberId": "meb22ec978a011e58a30413811359751",
          "mobile": "15001300532",
          "name": "aaaaaaaaaa",
          "sex": "0",
          "id": "sf11111"
        }, {
          "birthdate": 166682292,
          "cardNo": "889900",
          "cardType": "3",
          "expires": 1490976000000,
          "familyName": "aa",
          "givenName": "bb",
          "memberContactsId": "2222222222",
          "memberId": "meb22ec978a011e58a30413811359751",
          "mobile": "15001300532",
          "name": "aaaaaaaaaa",
          "sex": "1",
          "id": "hz11112"
        }],
        "contacts": {
          "id": "2222222222",
          "mobile": "15001300532",
          "name": "aaaaaaaaaa"
        }
      }, {
        "cardList": [{
          "birthdate": 0,
          "cardNo": "123456",
          "cardType": "1",
          "expires": 0,
          "familyName": "66",
          "givenName": "55",
          "memberContactsId": "2222222223",
          "memberId": "meb22ec978a011e58a30413811359751",
          "mobile": "123456789123",
          "name": "小李",
          "sex": "1",
          "id": "sf111999"
        }],
        "contacts": {
          "id": "2222222223",
          "mobile": "123456789123",
          "name": "小李"
        }
      }],
      "message": "查询成功",
      "toast": "",
      "totalCount": 6
    }
  };
}

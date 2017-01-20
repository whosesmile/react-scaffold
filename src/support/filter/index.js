// 过滤器
const Filter = {

  // 添加默认值
  default: function(x, y) {
    return typeof x !== 'undefined' ? x : y;
  },

  // 金额格式化
  currency: function(input, size = 2, symbol = '￥') {
    input = Number(input);
    return /^[\d.]+$/.test(input) ? (symbol + input.toFixed(input % 1 === 0 ? 0 : size)) : '';
  },

  // 日期格式化
  date: function(date, fmt) {
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
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
      }
    }
    return fmt;
  },
};

export default Filter;

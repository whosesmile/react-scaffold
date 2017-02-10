let types = ['qd-app', 'micromessenger', 'ali'];
let agent = navigator.userAgent.toLowerCase();
let matches = agent.match(/qd-app-(.+)-(ios|android)/i);

// 运行环境
const Env = {

  // APP版本
  // return version || null，也可以依赖此识别是否是APP内
  version: matches && matches[1],

  // 是否内嵌 暂时考虑 千丁APP、微信、服务窗
  nested: types.filter((name) => agent.indexOf(name) !== -1).length > 0,

  // 各种识别
  is: (type) => {
    if (type === 'wx') {
      return agent.indexOf('micromessenger') !== -1;
    }
    if (type === 'ali') {
      return agent.indexOf('ali') !== -1;
    }
    if (type === 'ios') {
      return Boolean(matches && matches[2] === 'ios');
    }
    if (type === 'android') {
      return Boolean(matches && matches[2] === 'android');
    }
    if (type === 'app') {
      return Boolean(matches);
    }
  },

};

export default Env;

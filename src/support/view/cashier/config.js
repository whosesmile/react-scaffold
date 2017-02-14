// 根据业态返回不同的路由

const CONFIG = {
  JF: { success: '/integral/success', failure: '/integral/failure' },
  // BJ
  // NG
  // ..
};

function getFeedback(business, status) {
  let map = CONFIG[business] || { success: '/cashier/success', failure: '/cashier/failure' };
  return map[status];
};

export {
  CONFIG,
  getFeedback
};

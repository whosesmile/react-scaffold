// 根据业态返回不同的路由
const CONFIG = {
  JF: { success: '/integral/success', failure: '/integral/failure' },
  WF: { success: '/property/success', failure: '/property/failure' },
  // BJ
  // NG
  // ..
};

function getFeedback(business, status) {
  let map = Object.assign({ success: '/cashier/success', failure: '/cashier/failure' }, CONFIG[business]);
  return map[status];
};

export {
  CONFIG,
  getFeedback
};

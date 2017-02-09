// 重载页面
const Reload = (nextState, replace, callback) => {
  console.info('React Route not found, reload from server');
  window.location.reload();
};

export { Reload };

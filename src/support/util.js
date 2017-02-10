// 重载页面
const Reload = (nextState, replace, callback) => {
  // prevent loop infinity
  let reloaded = sessionStorage.getItem(location.pathname);
  if (!reloaded) {
    console.warn('React Route not found, Reload this page.');
    sessionStorage.setItem(location.pathname, true);
    window.location.reload();
  } else {
    console.error('Route not found on server.');
    sessionStorage.removeItem(location.pathname);
  }
};

export { Reload };

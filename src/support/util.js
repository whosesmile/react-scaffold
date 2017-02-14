// 重载页面
const Reload = (nextState, replace, callback) => {
  // prevent loop infinity
  let reloaded = sessionStorage.getItem(location.pathname);
  if (!reloaded) {
    console.warn('React Router not found, Reload this page:', location.pathname);
    sessionStorage.setItem(location.pathname, true);
    window.location.reload();
  } else {
    console.error('Router not found on server:', location.pathname);
    sessionStorage.removeItem(location.pathname);
  }
};

export { Reload };

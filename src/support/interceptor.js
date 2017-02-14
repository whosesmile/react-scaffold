// 社区拦截
function projectRequired(nextState, replace) {
  // TODO
}

// 登录拦截
function loginRequired(nextState, replace) {
  // TODO
  if (false) {
    replace({
      pathname: '/account',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

// 房屋拦截
function houseRequired(nextState, replace) {
  // TODO
}

// 维护拦截
function repairInterceptor(nextState, replace) {
  // TODO
}

export { projectRequired, loginRequired, houseRequired, repairInterceptor };

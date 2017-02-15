import Env from './env';

// 社区拦截
function projectRequired(nextState, replace) {
  if (!window.CF || !CF.project || !CF.member.id) {
    location.href = '/location?next=' + encodeURIComponent(location.href);
  }
}

// 登录拦截
function loginRequired(nextState, replace) {
  if (!window.CF || !CF.member || !CF.member.memberId) {
    if (Env.is('wx') || Env.is('ali')) {
      location.href = '/account/improve?next=' + encodeURIComponent(location.href);
    } else {
      location.href = '/account/login?next=' + encodeURIComponent(location.href);
    }
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

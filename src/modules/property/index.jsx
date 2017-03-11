/**
 * by 张佳佳
 */
import './style.less';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute, Redirect } from 'react-router';
import App from '../../components/app';
import Address from '../../support/view/address';
import { Reload } from '../../support/util';
import { loginRequired } from '../../support/interceptor';
import Home from './home';
import Owners from './owners';
import Charge from './charge';
import Order from './order';
import Details from './details';
import Success from './success';
import Failure from './failure';

ReactDOM.render(
  <Router history={ browserHistory }>
    <Route path="/" component={ App }>
      <Route path="property">
        <IndexRoute component={ Home } onEnter={ loginRequired } />
        <Route path="charge/:month" component={ Charge } />
        <Route path="details/:month" component={ Details } />
        <Route path="order/:code" component={ Order } />
        <Route path="owners" component={ Owners } />
        <Route path="success" component={ Success } />
        <Route path="failure" component={ Failure } />
      </Route>

      <Route path="*" onEnter={ Reload } />
    </Route>
  </Router>,
  document.querySelector('#bootstrap')
);

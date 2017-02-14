/*!
 * by 李双宝
 */
import './style.less';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../components/app';
import Home from '../../support/view/cashier/home';
import Success from '../../support/view/cashier/success';
import Failure from '../../support/view/cashier/failure';
import { Reload } from '../../support/util';
import { Router, Route, browserHistory, IndexRoute, IndexRedirect } from 'react-router';

ReactDOM.render(
  <Router history={ browserHistory }>
    <Route path="/" component={ App }>
      <Route path="cashier">
        <IndexRedirect to="payment" />
        <Route path="payment" component={ Home } />
        <Route path="Success" component={ Success } />
        <Route path="Failure" component={ Failure } />
      </Route>

      <Route path="*" onEnter={ Reload } />
    </Route>
  </Router>,
  document.querySelector('#bootstrap')
);

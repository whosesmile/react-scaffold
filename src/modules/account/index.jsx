/**
 * by 李双宝
 */
import './style.less';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../components/app';
import Home from './home';
import Addresses from './addresses';
import Address from '../../support/view/address';
import Orders from '../../support/view/orders';
import { Reload } from '../../support/util';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

ReactDOM.render(
  <Router history={ browserHistory }>
    <Route path="/" component={ App }>
      <Route path="account">
        <IndexRoute component={ Home } />
        <Route path="orders" component={ Orders } />
        <Route path="addresses" component={ Addresses } />
        <Route path="address(/:id)" component={ Address } />
      </Route>

      <Route path="*" onEnter={ Reload } />
    </Route>
  </Router>,
  document.querySelector('#bootstrap')
);

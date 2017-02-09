/*!
 * by 李双宝
 */
import './style.less';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../components/app';
import Home from './home';
import Addresses from './addresses';
import Address from '../../support/view/address';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

ReactDOM.render(
  <Router history={ browserHistory }>
    <Route path="/" component={ App }>
      <Route path="account">
        <IndexRoute component={ Home } />
        <Route path="addresses" component={ Addresses } />
        <Route path="address(/:id)" component={ Address } />
      </Route>
    </Route>
  </Router>,
  document.querySelector('#bootstrap')
);

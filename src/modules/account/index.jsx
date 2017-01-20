/*!
 * by 李双宝
 */
import './style.less';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../components/app';
import Home from './home';
import Addresses from './addresses';
import Address from './Address';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

ReactDOM.render(
  <Router onUpdate={() => window.scrollTo(0, 0) } history={ browserHistory }>
    <Route path="/account" component={ App }>
      <IndexRoute component={ Home } />
      <Route path="/account/addresses" component={ Addresses } />
      <Route path="/account/address" component={ Address } />
      <Route path="/account/address/:id" component={ Address } />
    </Route>
  </Router>,
  document.querySelector('#bootstrap')
);

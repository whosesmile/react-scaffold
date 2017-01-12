/*!
 * by 李双宝
 */
import './style.less';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../components/app';
import Home from './home';
import Orders from './orders';
import Records from './records';
import Package from './package';
import Protocol from './protocol';
import Instruction from './instruction';
import Details from './details';
import Order from './order';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

ReactDOM.render(
  <Router onUpdate={() => window.scrollTo(0, 0) } history={ browserHistory }>
    <Route path="/integral" component={ App }>
      <IndexRoute component={ Home } />
      <Route path="/integral/records" component={ Records } />
      <Route path="/integral/packages" component={ Package } />
      <Route path="/integral/protocol" component={ Protocol } />
      <Route path="/integral/instruction" component={ Instruction } />
      <Route path="/integral/details/:id" component={ Details } />
      <Route path="/integral/orders" component={ Orders } />
      <Route path="/integral/order/:id" component={ Order } />
    </Route>
  </Router>,
  document.querySelector('#bootstrap')
);

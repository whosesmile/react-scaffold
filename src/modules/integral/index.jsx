/*!
 * By 李双宝 其他业务也请声明负责人
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
import Confirm from './confirm';
import Order from './order';
import Success from './success';
import Failure from './failure';
import Logistics from './logistics';
import Addresses from '../../support/view/addresses';
import Address from '../../support/view/address';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

ReactDOM.render(
  <Router onUpdate={ () => window.scrollTo(0, 0) } history={ browserHistory }>
    <Route path="/integral" component={ App }>
      <IndexRoute component={ Home } />
      <Route path="/integral/records" component={ Records } />
      <Route path="/integral/packages" component={ Package } />
      <Route path="/integral/protocol" component={ Protocol } />
      <Route path="/integral/instruction" component={ Instruction } />
      <Route path="/integral/orders" component={ Orders } />
      <Route path="/integral/order/:id" component={ Order } />
      <Route path="/integral/details/:id" component={ Details } />
      <Route path="/integral/success/:id" component={ Success } />
      <Route path="/integral/failure/:id" component={ Failure } />
      <Route path="/integral/confirm/:id" component={ Confirm } />
      <Route path="/integral/logistics/:id" component={ Logistics } />

      <Route path="/integral/addresses" component={ Addresses } />
      <Route path="/integral/address" component={ Address } />
      <Route path="/integral/address/:id" component={ Address } />
    </Route>
  </Router>,
  document.querySelector('#bootstrap')
);

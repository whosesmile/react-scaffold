/**
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
import Logistics from '../../support/view/logistics';
import Addresses from '../../support/view/addresses';
import Address from '../../support/view/address';
import { Reload } from '../../support/util';
import { loginRequired } from '../../support/interceptor';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

ReactDOM.render(
  <Router history={ browserHistory }>
    <Route path="/" component={ App }>
      <Route path="integral">
        <IndexRoute component={ Home } />
        <Route path="records" component={ Records } onEnter={ loginRequired } />
        <Route path="packages" component={ Package } />
        <Route path="protocol" component={ Protocol } />
        <Route path="instruction" component={ Instruction } />
        <Route path="orders" component={ Orders } />
        <Route path="order/:code" component={ Order } />
        <Route path="details/:id" component={ Details } />
        <Route path="confirm/:id" component={ Confirm } />
        <Route path="success" component={ Success } />
        <Route path="failure" component={ Failure } />
        <Route path="logistics/:id" component={ Logistics } />
        <Route path="addresses" component={ Addresses } />
        <Route path="address(/:id)" component={ Address } />
      </Route>

      <Route path="*" onEnter={ Reload } />
    </Route>
  </Router>,
  document.querySelector('#bootstrap')
);

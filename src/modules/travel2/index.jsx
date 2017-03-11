import './style.less';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from '../../components/app';
import Home from './home';
import Details from './details';
import Passenger from './passenger';
import Passengers from './passengers';
import Confirm from './confirm';
import Order from './order';
import Calendar from './calendar';
import Addresses from '../../support/view/addresses';
import Address from '../../support/view/address';
import { Reload } from '../../support/util';

ReactDOM.render(
  <Router history={ browserHistory }>
    <Route path="/" component={ App }>
      <Route path="travel2">
        <IndexRoute component={ Home } />
        <Route path="details/:id" component={ Details } />
        <Route path="passenger(/:id)" component={ Passenger } />
        <Route path="passengers" component={ Passengers } />
        <Route path="confirm/:id" component={ Confirm } />
        <Route path="order/:id" component={ Order } />
        <Route path="calendar/:id" component={ Calendar } />
        <Route path="addresses" component={ Addresses } />
        <Route path="address(/:id)" component={ Address } />
      </Route>

      <Route path="*" onEnter={ Reload } />
    </Route>
  </Router>,
  document.querySelector('#bootstrap')
);

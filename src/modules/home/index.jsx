/*!
 * by 李双宝
 */
import './style.less';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../components/app';
import Home from './home';
import Logistics from './logistics';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

ReactDOM.render(
  <Router onUpdate={() => window.scrollTo(0, 0) } history={ browserHistory }>
    <Route path="/home" component={ App }>
      <IndexRoute component={ Home } />
      <Route path="/logistics/:id" component={ Logistics } />
    </Route>
  </Router>,
  document.querySelector('#bootstrap')
);

/**
 * by 李双宝
 */
import './style.less';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../components/app';
import Home from './home';
import { Reload } from '../../support/util';
import { Router, Route, browserHistory, IndexRoute, IndexRedirect } from 'react-router';

ReactDOM.render(
  <Router history={ browserHistory }>
    <Route path="/" component={ App }>
      <IndexRedirect to="/home" />
      <Route path="home" component={ Home } />

      <Route path="*" onEnter={ Reload } />
    </Route>
  </Router>,
  document.querySelector('#bootstrap')
);

/*!
 * by 李双宝
 */
import './style.less';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../components/app';
import Home from './home';
import { Router, Route, browserHistory, IndexRoute, Redirect } from 'react-router';

ReactDOM.render(
  <Router onUpdate={ () => window.scrollTo(0, 0) } history={ browserHistory }>
    <Route path="/" component={ App }>
      <IndexRoute component={ Home } />
      <Redirect from="home" to="/" />
    </Route>
  </Router>,
  document.querySelector('#bootstrap')
);

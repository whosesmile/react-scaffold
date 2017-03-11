/**
 * by 李双宝
 */
import './style.less';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../components/app';
import Home from './home';
import Bridge from './Bridge';
import { Reload } from '../../support/util';
import { Router, Route, browserHistory, IndexRoute, IndexRedirect } from 'react-router';

ReactDOM.render(
  <Router history={ browserHistory }>
    <Route path="/" component={ App }>
      <Route path="example">
        <IndexRoute component={ Home } />
        <Route path="bridge" component={ Bridge }/>

        <Route path="*" onEnter={ Reload } />
      </Route>
    </Route>
  </Router>,
  document.querySelector('#bootstrap')
);

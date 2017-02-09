/*!
 * Cashier 收银台
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Env from '../support/env';

export default class Cashier extends Component {

  payment() {
    // TODO
    console.warn('待实现');
  }

  render() {
    let { code, price, business, component, ...others } = this.props;
    let Tag = component || 'button';

    // hybrid
    if (Env.is('app')) {
      return (<Tag { ...others } onClick={ this.payment }>{ this.props.children }</Tag>);
    }
    // html5
    else {
      return (<Link { ...others } to={ {pathname:'/cashier/payment', query: { code: code, business: business }} }>{ this.props.children }</Link>);
    }
  }
}

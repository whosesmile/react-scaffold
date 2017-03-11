/**
 * Cashier 收银台
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Env from '../support/env';
import JSBridge from '../support/bridge';

export default class Cashier extends Component {

  payment = () => {
    let { code, price, business } = this.props;
    JSBridge.payment(code, price, business);
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
      return (<a { ...others } href={ `http://${ location.host }/cashier/payment?code=${ code }&price=${ price }&business=${ business }` }>{ this.props.children }</a>);
    }
  }
}

/*!
 * 兑换成功
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Page from '../../components/page';

export default class Failure extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '支付成功',
    };
  }

  render() {
    return (
      <Page className="success" title={ this.state.title } widget={ this.state.widget }>
        {/* main */}
        <section className="main">
          <div className="feedback">
            <div className="mark">
              <i className="icon text-success">&#xe696;</i>
            </div>
            <h3 className="title">支付成功</h3>
            <div className="describe">如有疑问，您可以致电 <a className="link" href="tel:4000818181">4000818181</a> 咨询</div>

            <div className="vspace hspace">
              <Link className="button plain-success" to={ '/account/orders' }>查看订单</Link>
            </div>
          </div>
        </section>
      </Page>
    );
  }
};

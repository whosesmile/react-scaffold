/**
 * 兑换失败
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Page from '../../components/page';

export default class Failure extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '支付失败',
    };
  }

  render() {
    return (
      <Page className="failure" title={ this.state.title } widget={ this.state.widget }>
        {/* main */}
        <section className="main">
          <div className="feedback">
            <div className="mark">
              <i className="icon text-warning">&#xe6a0;</i>
            </div>
            <h3 className="title">支付失败</h3>
            <p className="describe">
              非常抱歉，您可以返回订单尝试重新发起支付<br />
              您也可以致电 <a className="link" href="tel:4000818181">4000818181</a> 咨询
            </p>

            <div className="vspace hspace">
              <Link className="button plain-warning" to="/account/orders">查看订单</Link>
              <button className="button default" onClick={ history.back.bind(history) }>返回</button>
            </div>
          </div>
        </section>
      </Page>
    );
  }
};

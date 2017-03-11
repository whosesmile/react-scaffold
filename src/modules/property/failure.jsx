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
      title: '物业缴费',
    };
  }

  render() {
    return (
      <Page className="failure bgwhite" title={ this.state.title } widget={ this.state.widget }>
        {/* main */}
        <section className="main">
          <div className="feedback">
            <div className="mark">
              <i className="icon text-warning">&#xe6a0;</i>
            </div>
            <h3 className="title">支付失败</h3>
            <div className="describe">
              如有疑问，您可以致电
            <a className="link" href="tel:4000818181">4000818181</a> 咨询</div>

            <div className="vspace hspace">
              <Link className="button plain-warning" to="/property">查看缴费情况</Link>
            </div>
          </div>
        </section>
      </Page>
    );
  }
};

/**
 * 兑换成功
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Page from '../../components/page';

export default class Success extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '物业缴费',
    };
  }

  render() {
    return (
      <Page className="success bgwhite" title={ this.state.title } widget={ this.state.widget }>
        {/* main */}
        <section className="main">
          <div className="feedback">
            <div className="mark">
              <i className="icon text-success">&#xe696;</i>
            </div>
            <h3 className="title">支付成功</h3>
            <p className="text-center">如需发票，请联系物业。</p>
            <div className="describe">
              如有疑问，您可以致电
              <a className="link" href="tel:4000818181">4000818181</a> 咨询
            </div>

            <div className="list">
              <div className="item">
                <span className="text">{CF.member.memberName}</span>
                <span className="extra">{CF.member.memberMobile}</span>
              </div>
              <div className="item">
                <span className="text">订单编号：{this.props.location.query.code}</span>
              </div>
              <div className="item">
                <div className="text">支付金额：<span className="text-orange">¥{this.props.location.query.price}</span></div>
              </div>
            </div>

            <div className="vspace hspace">
              <Link className="button default" to="/property">查看缴费情况</Link>
            </div>
          </div>
        </section>
      </Page>
    );
  }
};

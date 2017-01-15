/*!
 * 兑换成功
 */
import React, { Component, PropTypes } from 'react';
import Page from '../../components/page';
import { Link } from 'react-router';

export default class Failure extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      title: '积分兑换',
    };
  }

  render() {
    return (
      <Page className="failure bgwhite" title={ this.state.title }>
        {/* main */}
        <section className="main">
          <div className="feedback">
            <div className="mark">
              <i className="icon text-warning">&#xe6a0;</i>
            </div>
            <h3 className="title">兑换失败</h3>
            <div className="describe">如有疑问，您可以致电 <a className="link" href="tel:4000818181">4000818181</a> 咨询</div>

            <div className="vspace hspace">
              <Link className="button warning" to="/integral/orders">查看我的兑换</Link>
              <Link className="button default" to="/integral">返回积分商城</Link>
            </div>
          </div>
        </section>
      </Page>
    );
  }
};

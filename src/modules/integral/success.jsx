/*!
 * 兑换成功
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Page from '../../components/page';

export default class Success extends Component {
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
      <Page className="success bgwhite" title={ this.state.title }>
        {/* main */}
        <section className="main">
          <div className="feedback">
            <div className="mark">
              <i className="icon text-success">&#xe696;</i>
            </div>
            <h3 className="title">兑换成功</h3>
            <div className="describe">如有疑问，您可以致电 <a className="link" href="tel:4000818181">4000818181</a> 咨询</div>

            <div className="vspace hspace">
              <Link className="button plain-success" to={ '/integral/order/' + this.props.params.id }>查看我的兑换</Link>
              <Link className="button default" to="/integral">返回积分商城</Link>
            </div>
          </div>
        </section>
      </Page>
    );
  }
};

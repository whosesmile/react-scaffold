import React, { Component, PropTypes } from 'react';
import Page from '../../components/page';

export default class Home extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      title: '千丁小区',
    };
  }

  render() {
    return (
      <Page className="home" title={ this.state.title }>
        {/* main */}
        <section className="main">
          <div className="list compact">
            <a className="item" href="/account">
              <div className="text">个人中心</div>
              <i className="icon">&#xe61a;</i>
            </a>
            <a className="item" href="/integral">
              <div className="text">积分商城</div>
              <i className="icon">&#xe61a;</i>
            </a>
            <a className="item" href="/">
              <div className="text">新版旅游</div>
              <div className="extra">待实现</div>
              <i className="icon">&#xe61a;</i>
            </a>
            <a className="item" href="/">
              <div className="text">物业交费</div>
              <div className="extra">待实现</div>
              <i className="icon">&#xe61a;</i>
            </a>
          </div>
        </section>
      </Page>
    );
  }
};

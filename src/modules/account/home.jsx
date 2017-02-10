import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Page from '../../components/page';
import Env from '../../support/env';
import Filter from '../../support/filter';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '我的',
      loading: CF.member.memberId ? true : false,
    };
  }

  componentDidMount() {
    // 已登录用户加载钱包数据
    if (CF.member.memberId) {
      $.get('/account/ajax/wallet', (res) => {
        if (res.code === 200) {
          this.setState({
            wallet: res.data.entity,
          });
        }
        this.setState({
          loading: false,
        });
      });
    }
  }

  render() {
    let wallet = this.state.wallet;
    return (
      <Page className="home" title={ this.state.title }>
        {/* main */}
        <section className="main">
          {/*
            <a class="figure text-center" href="/account/settings">
              <div class="vague">
                <img class="center-block" src="{{ member.memberAvatar }}" />
              </div>
              <div class="avatar">
                <img class="center-block" src="{{ member.memberAvatar|figure|thumb(150, 150) }}" />
              </div>
              {% if member && member.memberId %}
                <h3 class="text-sm">{{ member.memberName || member.memberId  }}</h3>
                <i class="icon text-white">&#xe61a;</i>
              {% else %}
                <h3 class="text-sm">尚未登录，点此登录</h3>
              {% endif %}
            </a>
          */}
          <div className="list compact">
            <a className="item" href="/wallet">
              <div className="avatar">
                <img width="16" src="//img1.qdingnet.com/image-4e820acc-09a5-41df-952d-67ad09c69f5b.png" />
              </div>
              <span className="text">我的钱包</span>
              { wallet && wallet.slogan.length > 0 &&
                <span className="extra"><span className="text-driving">{ wallet.slogan[0] }</span></span>
              }
              <i className="icon text-gray">&#xe61a;</i>
            </a>
            <div is class="item thread split text-sm" ui-mode="10px 0px">
              <a className="text text-dark text-center" href="/wallet/records">
                <p>{ Filter.currency(wallet ? wallet.account.availableAmount : 0, 2) }</p>
                <p>账户余额</p>
              </a>
              <a className="text text-dark text-center" href="/integral">
                <p>{ wallet ? wallet.accountIntegral : 0 }</p>
                <p>我的积分</p>
              </a>
              <a className="text text-dark text-center" href="/account/coupons">
              <p>{ Filter.currency(wallet ? wallet.accountQdTicket : 0, 2) }</p>
                <p>千丁券</p>
              </a>
            </div>
          </div>

          <div className="list">
            <a className="item" href="/location">
              <i className="icon">&#xe62a;</i>
              <span className="text">我的社区</span>
              <span className="extra">{ CF.project.name }</span>
              <i className="icon text-gray">&#xe61a;</i>
            </a>
          </div>

          <div className="list">
            <Link className="item" to="/account/orders">
              <div className="avatar">
                <img width="16" src="//img1.qdingnet.com/899826a5bde2edb56611b67b0ba7c7ae.png" />
              </div>
              <span className="text">我的订单</span>
              <i className="icon text-gray">&#xe61a;</i>
            </Link>
            <Link className="item" to="/account/addresses">
              <div className="avatar">
                <img width="16" src="//img1.qdingnet.com/41a2bbb947f173727de845f70f7c36ab.png" />
              </div>
              <span className="text">我的地址</span>
              <i className="icon text-gray">&#xe61a;</i>
            </Link>
            <a className="item" href="/shopping/cart">
              <div className="avatar">
                <img width="16" src="//img1.qdingnet.com/f15e58120c2c48a10ea98680ec7eb1b5.png" />
              </div>
              <span className="text">我的购物车</span>
              <i className="icon text-gray">&#xe61a;</i>
            </a>
          </div>
          <div className="list">
            <a className="item" href="/account/remind">
              <div className="avatar">
                <img width="16" src="//img1.qdingnet.com/8831d827cfbbae61cc86183f905a7354.png" />
              </div>
              <span className="text">消息中心</span>
              <i className="icon text-gray">&#xe61a;</i>
            </a>
            <a className="item" href="tel:400-081-8181">
              <div className="avatar">
                <img width="16" src="//img1.qdingnet.com/b5704e34f73d3b70593934548a771b5c.png" />
              </div>
              <span className="text">客服热线</span>
              <span className="text text-right">400-081-8181</span>
              <i className="icon text-gray">&#xe61a;</i>
            </a>
          </div>
        </section>
      </Page>
    );
  }
};

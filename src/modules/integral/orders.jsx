/*!
 * 兑换记录
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Page from '../../components/page';
import Loader from '../../components/loader';
import Filter from '../../support/filter';

export default class Orders extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      title: '兑换记录',
      list: [],
      loading: true,
    };
  }

  appendList(list) {
    this.setState({
      loading: false,
      list: this.state.list.concat(list),
    });
  }

  renderList() {
    let prizeTypes = { 'TICKET': '优惠券', 'FLOW': '流量包', 'ENTITY': '实物商品' };
    let orderStatus = [, , '已兑换', '兑换失败', '已发货', '已签收', '未兑换'];

    if (!this.state.loading && this.state.list.length === 0) {
      return (
        <div className="feedback">
          <div className="mark">
            <img width="220" height="220" src="//img1.qdingnet.com/b70973ae84276a865ae7ae673ea1e318.png" alt="空白" />
          </div>
          <div className="describe">还没有相关订单哦</div>
        </div>
      );
    }

    return this.state.list.map((item, idx) => {
      return (
        <div is key={ idx } class="list">
          <div className="item">
            <div className="text text-sm">积分商城</div>
            <div className="extra text-sm">{ Filter.default(orderStatus[item.status], '其他') }</div>
          </div>
          <Link is class="item" ui-mode="15px" to={ '/integral/order/' + item.id }>
            <div className="avatar">
              <img width="60" height="60px" src={ item.coverImg } />
            </div>
            <div className="text">
              <h4>{ item.goodsName }</h4>
              <div className="brief">{ prizeTypes[item.goodsType] || '其他类型' }</div>
            </div>
          </Link>
          <div className="item">
            <div className="text text-sm">消耗: <span className="text-driving">{ item.consumeIntegral }积分</span></div>
            <div className="extra">
              <div className="button-group">
                <Link className="button default sm" to={ '/integral/order/' + item.id }>查看详情</Link>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <Page className="orders" title={ this.state.title }>
        {/* main */}
        <section className="main">
          <Loader url="/integral/ajax/orders" callback={ this.appendList.bind(this) }>
            { this.renderList() }
          </Loader>
        </section>
      </Page>
    );
  }
};

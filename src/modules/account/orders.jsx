/*!
 * 我的订单记录
 */
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Page from '../../components/page';
import SkipLink from '../../components/skiplink';
import Loader from '../../components/loader';
import Cashier from '../../components/cashier';
import Swing from '../../components/swing';
import Slot from '../../components/slot';
import MaskLayer from '../../components/masklayer';
import Filter from '../../support/filter';

export default class Orders extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      title: '我的订单',
      list: [],
      loading: true,
      status: this.props.location.query.status || 0,
      business: this.props.location.query.business || null,
    };
  }

  appendList(list) {
    this.setState({
      loading: false,
      list: this.state.list.concat(list),
    });
  }

  handleFilter(filter) {
    this.setState({
      filter: this.state.filter == filter ? null : filter,
    });
  }

  handleBusiness(business) {
    // 更改业态类型，需要重新查询，因此重置数据
    if (this.state.business !== business) {
      this.setState({
        business: business,
        loading: true,
        list: [],
      });
    }
  }

  handleStatus(status) {
    // 更改订单分类，需要重新查询，因此重置数据
    if (this.state.status !== status) {
      this.setState({
        status: status,
        loading: true,
        list: [],
      });
    }
  }

  renderList() {
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
            <div className="text text-sm">{ item.businessName }</div>
            <div className="extra text-sm">{ item.orderStatusName }</div>
          </div>

          { item.orderGoods.length === 1 &&
            <SkipLink is class="item" ui-mode="15px" to={ item.skipModel }>
              <div className="avatar">
                <img width="60" height="60px" src={ item.orderGoods[0].skuImgUrl[0] } />
              </div>
              <div className="text">
                <h4 className="text-ellipsis">{ item.orderGoods[0].goodsName }</h4>
                <div is class="brief truncate">{ Filter.truncate(item.orderGoods[0].goodsDesc, 50) }</div>
              </div>
            </SkipLink>
          }

          { item.orderGoods.length > 1 &&
            <SkipLink is class="item" ui-mode="15px" to={ item.skipModel }>
              {
                item.orderGoods.slice(0, 4).map((goods, idx) => {
                  return (
                    <div key={ idx } className="avatar">
                      <img width="60" height="60px" src={ goods.skuImgUrl[0] } />
                    </div>
                  );
                })
              }
            </SkipLink>
          }
          <div className="item">
            <div className="text text-sm">价格: <span className="text-driving">{ Filter.currency(item.shouldPay) }</span></div>
            <div className="extra">
              <div className="button-group">
                {
                  // 操作列表: btnType[按钮类型][1:支付按钮, 0:其他按钮](Integer)
                  item.btnSkipList.map((btn, idx) => {
                    if (btn.btnType == 1) {
                      return <Cashier key={ idx } className="button driving sm" code={ item.orderCode } price={ item.shouldPay } business={ item.businessType }>{ btn.btnName }</Cashier>
                    }
                    else {
                      return <SkipLink key={ idx } className="button driving sm" to={ btn.skipModel }>{ btn.btnName }</SkipLink>
                    }
                  })
                }
                <SkipLink className="button default sm" to={ item.skipModel }>查看详情</SkipLink>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    const status = ['全部订单', '待付款', '待评价'];
    return (
      <Page className="orders" title={ this.state.title }>
        {/* main */}
        <section className="main">
          <Swing>
            <div className="flex compact">
              <div className={ classnames('item', {active: this.state.filter === 'business'}) } onClick={ this.handleFilter.bind(this, 'business') }>
                <span>全部服务</span>
                <img width="24" src="//img1.qdingnet.com/d3f9a9b6304a8ccccbb2a1457fe5b5e6.png" />
                <nav>
                  <a className={ classnames({selected: this.state.business == null}) } onClick={ this.handleBusiness.bind(this, null) }><span>全部服务</span></a>
                  <a className={ classnames({selected: this.state.business == 'JT'}) } onClick={ this.handleBusiness.bind(this, 'JT') }><span>阶梯团购</span></a>
                  <a className={ classnames({selected: this.state.business == 'LZ'}) } onClick={ this.handleBusiness.bind(this, 'LZ') }><span>鲜花绿植</span></a>
                </nav>
              </div>
              <div className={ classnames('item', {active: this.state.filter === 'status'}) } onClick={ this.handleFilter.bind(this, 'status') }>
                <span>{ status[this.state.status] || '全部订单' }</span>
                <img width="24" src="//img1.qdingnet.com/d3f9a9b6304a8ccccbb2a1457fe5b5e6.png" />
                <nav>
                  <a className={ classnames({selected: this.state.status == 0}) } onClick={ this.handleStatus.bind(this, 0) }><span>全部订单</span></a>
                  <a className={ classnames({selected: this.state.status == 1}) } onClick={ this.handleStatus.bind(this, 1) }><span>待付款</span></a>
                  <a className={ classnames({selected: this.state.status == 2}) } onClick={ this.handleStatus.bind(this, 2) }><span>待评价</span></a>
                </nav>
              </div>
            </div>
          </Swing>
          <Loader url="/account/ajax/orders" query={ {business: this.state.business, status: this.state.status} }callback={ this.appendList.bind(this) }>
            { this.renderList() }
          </Loader>

          <Slot>
            { this.state.filter &&
              <MaskLayer show={ true } onClick={ this.handleFilter.bind(this, null) } />
            }
          </Slot>
        </section>
      </Page>
    );
  }
};

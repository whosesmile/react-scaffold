/**
 * 我的订单记录
 */
import '../../less/view/orders.less';
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

  constructor(props) {
    super(props);
    this.state = {
      title: '我的订单',
      list: [],
      loading: true,
      type: this.props.location.query.type || 0,
      business: this.props.location.query.business || null,
      botypes: [{ name: '全部服务', type: null }],
      odtypes: [{ name: '全部订单', type: 0 }, { name: '代付款', type: 1 }, { name: '待评价', type: 2 }],
    };
  }

  componentDidMount() {
    // 列举订单业态(每个用户不一样)
    $.get('/account/ajax/botypes', (res) => {
      if (res.code === 200) {
        this.setState({
          botypes: this.state.botypes.concat(res.data.list.map((item) => {
            return { name: item.businessName, type: item.businessType };
          })),
        });
      }
    });
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

  handleType(type) {
    // 更改订单分类，需要重新查询，因此重置数据
    if (this.state.type !== type) {
      this.setState({
        type: type,
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
    const types = ['全部订单', '待付款', '待评价'];
    return (
      <Page className="orders" title={ this.state.title }>
        {/* main */}
        <section className="main">
          <Swing>
            <div className={ classnames('flex','compact', {active: this.state.filter}) }>
              <div className={ classnames('item', {active: this.state.filter === 'business'}) } onClick={ this.handleFilter.bind(this, 'business') }>
                <span>{ (this.state.botypes.find((item) => item.type == this.state.business) || this.state.botypes[0]).name }</span>
                <img width="24" src="//img1.qdingnet.com/d3f9a9b6304a8ccccbb2a1457fe5b5e6.png" />
                <div className="menus">
                  <nav>
                    {
                      this.state.botypes.map((item, idx) => {
                        return <a key={ idx } className={ classnames({selected: this.state.business == item.type}) } onClick={ this.handleBusiness.bind(this, item.type) }><span>{ item.name }</span></a>
                      })
                    }
                  </nav>
                </div>
              </div>
              <div className={ classnames('item', {active: this.state.filter === 'type'}) } onClick={ this.handleFilter.bind(this, 'type') }>
                <span>{  (this.state.odtypes.find((item) => item.type == this.state.type) || this.state.odtypes[0]).name }</span>
                <img width="24" src="//img1.qdingnet.com/d3f9a9b6304a8ccccbb2a1457fe5b5e6.png" />
                <div className="menus">
                  <nav>
                    {
                      this.state.odtypes.map((item, idx) => {
                        return <a key={ idx } className={ classnames({selected: this.state.type == item.type}) } onClick={ this.handleType.bind(this, item.type) }><span>{ item.name }</span></a>
                      })
                    }
                  </nav>
                </div>
              </div>
            </div>
          </Swing>
          <Loader url="/account/ajax/orders" query={ {business: this.state.business, type: this.state.type} } callback={ this.appendList.bind(this) }>
            { this.renderList() }
          </Loader>
          <Slot>
            { this.state.filter &&
              <MaskLayer show={ true } className="reduce" onClick={ this.handleFilter.bind(this, null) } />
            }
          </Slot>
        </section>
      </Page>
    );
  }
};

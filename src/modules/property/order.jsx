import React, { Component, PropTypes } from 'react';
import App from '../../components/app';
import Page from '../../components/page';
import { Link, Redirect } from 'react-router';
import Swing from '../../components/swing';
import Loader from '../../components/loader';

export default class Order extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '账单详情',
      list: [],
      payStatus: 0,
      timeSpan: '',
      totalPrice: 0,
      totalDiscount: 0,
      totalRealpay: 0
    };
  }

  payState(state) {
    let str = '';
    if (state == 101) {
      str = '待缴';
    } else if (state == 105) {
      str = '已缴';
    } else if (state == 108) {
      str = '已退款';
    } else if (state == 200) {
      str = '已取消';
    }
    return str;
  }

  appendList(list, data) {
    this.setState({
      loaded: true,
      list: this.state.list.concat(list),
      payStatus: data.payStatus,
      timeSpan: data.timeSpan,
      totalPrice: data.totalPrice,
      totalDiscount: data.totalDiscount,
      totalRealpay: data.totalRealpay
    });
  }

  renderList() {
    if (this.state.loaded && this.state.list.length == 0) {
      return (
        <div className="feedback">
          <div className="mark">
            <img width="220" height="220" src="//img1.qdingnet.com/b70973ae84276a865ae7ae673ea1e318.png" alt="空白" />
          </div>
          <div className="describe">暂时还没有相关信息哦</div>
        </div>
      );
    }
    return this.state.list.map((item, idx) => {
      return (
        <div className="list compact" key={idx}>
          <div className="item-divider">{item.year}</div>
          {
            item.list.map((bill, index) =>
              <div key={index} className="item">
                <div className="text">
                  {bill.detail}
                  <div className="brief text-ellipsis">{bill.month}</div>
                </div>
                <div className="extra">
                  <p className="text-sm">￥{bill.totalFee}</p>
                </div>
              </div>
            )
          }
        </div>
      );
    });
  }

  render() {
    return (
      <Page className="order" title={ this.state.title }>
        <section className="main">
          <div className="status">
            <img width="48" height="56" className="head" src="//img1.qdingnet.com/fbfa607ae3e017354dab7fdbd5fc06af.png"/>
            <div className="sright">
              <span className="text-white">订单状态：{this.payState(this.state.payStatus)}</span>
              <div className="text-white text-sm text-ellipsis">
                <span className="text">时间跨度：</span>
                <span>{this.state.timeSpan}</span>
              </div>
            </div>
          </div>
          <div className="list compact">
            <div className="item">
              <div className="avatar">
                <img width="16" src="//img1.qdingnet.com/fe6e1979298201db3adebad72c585a98.png" />
              </div>
              <div className="text">账单总汇</div>
              <div className="extra">￥{this.state.totalPrice}</div>
            </div>
            <div className="item">
              <div className="avatar">
                <img width="16" src="//img1.qdingnet.com/b3b11d07ca76ec44bb7bade62fa90347.png" />
              </div>
              <div className="text">物业券抵扣</div>
              <div className="extra">￥{this.state.totalDiscount}</div>
            </div>
            <div className="item">
              <div className="avatar">
                <img width="16" src="//img1.qdingnet.com/1895f2d1505c4d0746c2bb0e43f55109.png" />
              </div>
              <div className="text">抵扣后实缴</div>
              <div className="extra">
                <span className="text-driving">￥{this.state.totalRealpay}</span>
              </div>
            </div>
            <div className="item thread">
              <h4 className="text">费用明细</h4>
            </div>
          </div>
          <Loader url="/property/ajax/orderdetail" query = {{code:this.props.params.code,roomId:this.props.location.query.roomId}} callback={ this.appendList.bind(this) }>
            {this.renderList()}
          </Loader>
        </section>
      </Page>
    );
  }
};

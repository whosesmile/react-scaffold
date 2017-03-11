import React, { Component, PropTypes } from 'react';
import App from '../../components/app';
import Page from '../../components/page';
import { Link } from 'react-router';
import Swing from '../../components/swing';
import Loader from '../../components/loader';

export default class Charge extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '账单详情',
      list: [],
      loading: true,
      ym: '',
      unpaidPrice: 0
    };
  }

  componentDidMount() {
    $.get('/property/ajax/roompropertybills', {
      month: this.props.params.month,
      roomId: this.props.location.query.roomId,
      monthstr: this.props.location.query.monthstr,
    }, (res) => {
      if (res.code === 200) {
        let data = res.data;
        this.setState({
          loading: false,
          list: data.list,
          ym: data.ym,
          unpaidPrice: data.unpaidPrice,
        });
      }
    });
  }

  renderOrdersDetails() {
    if (this.state.loading) {
      return (
        <div className="loadmore">
          <i className="loading"></i>
          <span className="tips text-gray">正在加载</span>
        </div>
      );
    }
    if (!this.state.loading && this.state.list.length == 0) {
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
        <div key={idx} className="item">
          <span className="text">
            <div className="text-sm">{item.costName}</div>
          </span>
          <span className="extra">
            <p className="text-orange text-sm">{item.debtsAmount}</p>
            <p className="text-orange text-sm">{item.feeStatus}</p>
          </span>
        </div>
      );
    });
  }

  render() {
    return (
      <Page className="charge" title={ this.state.title }>
        {/* main */}
        <section className="main">
          <div className="list compact">
            <div className="item">
              <span className="text">
                <div className="text-sm text-ellipsis">{this.state.ym}未缴纳金额</div>
                <div className="text-white text-xl">
                  <span className="text-sm text-orange">￥</span>
                  <span className="text-xl text-orange">{this.state.unpaidPrice}</span>
                </div>
              </span>
            </div>
          </div>

          <div className="list">
            <div className="item">
              <div className="text text-sm">项目</div>
              <div className="extra">
                <span className="text-black text-sm">本期费用</span>
              </div>
            </div>
            {this.renderOrdersDetails()}
          </div>
        </section>
      </Page>
    );
  }
};

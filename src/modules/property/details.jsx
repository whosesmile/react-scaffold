import React, { Component, PropTypes } from 'react';
import App from '../../components/app';
import Page from '../../components/page';
import { Link } from 'react-router';
import Swing from '../../components/swing';
import Loader from '../../components/loader';
import TabView from '../../components/tabview';

export default class Details extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '账单详情',
      list1: [],
      list2: [],
      loading1: true,
      loading2: true,
      ym: '',
      unpaidPrice: 0,
      paidPrice: 0,
    };
  }

  componentDidMount() {
    // 已缴
    $.get('/property/ajax/roompropertybills', {
      payStatus: 0,
      month: this.props.params.month,
      roomId: this.props.location.query.roomId,
      monthstr: this.props.location.query.monthstr,
    }, (res) => {
      if (res.code === 200) {
        let data = res.data;
        this.setState({
          loading1: false,
          list1: data.list,
          ym: data.ym,
          unpaidPrice: data.unpaidPrice,
          paidPrice: data.paidPrice,
        });
      }
    });

    // 未缴
    $.get('/property/ajax/roompropertybills', {
      payStatus: 1,
      month: this.props.params.month,
      roomId: this.props.location.query.roomId,
      monthstr: this.props.location.query.monthstr,
    }, (res) => {
      if (res.code === 200) {
        let data = res.data;
        this.setState({
          loading2: false,
          list2: data.list,
          ym: data.ym,
          unpaidPrice: data.unpaidPrice,
          paidPrice: data.paidPrice,

        });
      }
    });
  }

  renderList1() {
    if (this.state.loading1) {
      return (
        <div className="loadmore">
          <i className="loading"></i>
          <span className="tips text-gray">正在加载</span>
        </div>
      );
    }
    if (!this.state.loading1 && this.state.list1.length == 0) {
      return (
        <div className="feedback">
          <div className="mark">
            <img width="220" height="220" src="//img1.qdingnet.com/b70973ae84276a865ae7ae673ea1e318.png" alt="空白" />
          </div>
          <div className="describe">暂时还没有相关信息哦</div>
        </div>
      );
    }
    return this.state.list1.map((item, idx) => {
      return (
        <div key={idx} className="item">
          <span className="text text-sm">{item.costName}</span>
          <span className="text text-center text-orange text-sm">￥{item.debtsAmount}</span>
          <span className="text text-right text-sm">{item.custName}</span>
        </div>
      );
    });
  }

  renderList2() {
    if (this.state.loading2) {
      return (
        <div className="loadmore">
          <i className="loading"></i>
          <span className="tips text-gray">正在加载</span>
        </div>
      );
    }
    if (!this.state.loading2 && this.state.list2.length == 0) {
      return (
        <div className="feedback">
          <div className="mark">
            <img width="220" height="220" src="//img1.qdingnet.com/b70973ae84276a865ae7ae673ea1e318.png" alt="空白" />
          </div>
          <div className="describe">暂时还没有相关信息哦</div>
        </div>
      );
    }
    return this.state.list2.map((item, idx) => {
      return (
        <div key={idx} className="item">
          <span className="text text-sm">{item.costName}</span>
          <span className="text text-center text-orange text-sm">￥{item.dueAmount}</span>
          <span className="text text-right text-sm">{item.custName}</span>
        </div>
      );
    });
  }

  render() {
    return (
      <Page className="details" title={ this.state.title }>
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
          <TabView>
            <Swing>
              <div className="navbar underline driving tabs">
                <a className="item active" href="#tab1">待缴(￥{this.state.unpaidPrice})</a>
                <a className="item" href="#tab2">已缴(￥{this.state.paidPrice})</a>
              </div>
            </Swing>
            <div id="tab1" className="tabpane active">
              <div className="list compact">
                {this.state.list1.length > 0 &&
                  <div className="item-divider text-sm">
                    <span className="text">费项</span>
                    <span className="text text-center">金额</span>
                    <span className="text text-right">承担人</span>
                  </div>
                }
                {this.renderList1()}
              </div>
            </div>
            <div id="tab2" className="tabpane">
              <div className="list compact">
                {this.state.list2.length > 0 &&
                  <div className="item-divider text-sm">
                    <span className="text">费项</span>
                    <span className="text text-center">金额</span>
                    <span className="text text-right">承担人</span>
                  </div>
                }
                {this.renderList2()}
              </div>
            </div>
          </TabView>
        </section>
      </Page>
    );
  }
};

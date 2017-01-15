import $ from 'webpack-zepto';
import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import datefmt from '../../support/datefmt';
import Page from '../../components/page';
import Swing from '../../components/swing';
import Loader from '../../components/loader';
import TabView from '../../components/tabview';

export default class Records extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      title: '积分明细',
      list1: [],
      list2: [],
      list3: [],
    };
  }

  appendList(i, list) {
    this['loaded' + i] = true;
    this.setState({
      ['list' + i]: this.state['list' + i].concat(list),
    });
  }

  renderList(i) {
    if (this['loaded' + i] && this.state['list' + i].length === 0) {
      return (
        <div className="feedback">
          <div className="mark">
            <img width="220" height="220" src="//img1.qdingnet.com/b70973ae84276a865ae7ae673ea1e318.png" alt="空白" />
          </div>
          <h3 className="title">真遗憾</h3>
          <div className="describe">暂时还没有相关信息哦</div>
        </div>
      );
    }

    return this.state['list' + i].map((item, idx) => {
      let points = (item) => {
        if (item.optType != 1) {
          return (
            <p className="text-green">-{ item.optPoints }</p>
          );
        }
        return (
          <p className="text-orange">+{ item.optPoints }</p>
        );
      };
      return (
        <div is key={ idx } class="list hspace" ui-mode="10px">
          <div is class="item text-sm" ui-mode="10px">
            <span className="text">
              { item.productName }
              <p>{ datefmt(item.optTime, 'yyyy-MM-dd') }</p>
            </span>
            <span className="text text-right">
              { points(item) }
              <p>余额：{ item.surplusPoints }</p>
            </span>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <Page className="records" title={ this.state.title }>
        {/* main */}
        <section className="main">
          <TabView>
            <Swing>
              <div className="navbar underline driving tabs">
                <a className="item active" href="#tab1">明细</a>
                <a className="item" href="#tab2">收入</a>
                <a className="item" href="#tab3">支出</a>
              </div>
            </Swing>
            <div id="tab1" className="tabpane active">
              <Loader url="/integral/ajax/bills" callback={ this.appendList.bind(this, 1) }>
                { this.renderList(1) }
              </Loader>
            </div>
            <div id="tab2" className="tabpane">
              <Loader url="/integral/ajax/income" callback={ this.appendList.bind(this, 2) }>
                { this.renderList(2) }
              </Loader>
            </div>
            <div id="tab3" className="tabpane">
              <Loader url="/integral/ajax/deposit" callback={ this.appendList.bind(this, 3) }>
                { this.renderList(3) }
              </Loader>
            </div>
          </TabView>
        </section>
      </Page>
    );
  }
};

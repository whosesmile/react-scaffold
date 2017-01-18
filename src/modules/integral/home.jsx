import $ from 'webpack-zepto';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Page from '../../components/page';
import LazyImage from '../../components/image';
import Loader from '../../components/loader';

export default class Home extends Component {

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      title: '积分商城',
      list: [],
    };
  }

  appendList(list) {
    this.setState({
      list: this.state.list.concat(list),
    });
  }

  renderList() {
    return this.state.list.map((item, idx) => {
      return (
        <Link key={ idx } to={ '/integral/details/' + item.id } className="item" >
          <div className="panel">
          <div is class="vspace hspace" ui-mode="10px">
            <div className="figure">
              <LazyImage src={ item.coverImg } />
            </div>
            </div>
            <div className="text">
              <h4 className="name">{ item.goodsName }</h4>
              <span className="brief">积分：<i className="text-orange">{ item.consumeIntegral }</i></span>
            </div>
          </div>
        </Link>
      );
    });
  }

  render() {
    return (
      <Page className="home" title={ this.state.title }>
        {/* main */}
        <section className="main">
          <div is class="hspace vspace" ui-mode="10px">
            <Link className="banner" to="/integral/packages">
              <img src="//img1.qdingnet.com/image-030851c3-1c2d-4a45-9266-7016f5a23bf6.jpg" />
            </Link>
            <div className="flex menus text-center text-sm">
              <Link className="item text-dark" to="/integral/records">
                <img src="//img1.qdingnet.com/image-9ebded27-50cb-4008-986d-995de3b162bc.png" />
                <span>884积分</span>
              </Link>
              <Link className="item text-dark" to="/integral/protocol">
                <img src="//img1.qdingnet.com/image-33367e9b-664f-461e-a7f8-5282075c3cdd.png" />
                <span>积分规则</span>
              </Link>
              <Link className="item text-dark" to="/integral/orders">
                <img src="//img1.qdingnet.com/image-c16e680f-73c8-440f-b685-75a08eb6e845.png" />
                <span>兑换记录</span>
              </Link>
            </div>
          </div>

          <div className="cases">
            <div className="header">
              <h3 className="title">热门兑换</h3>
            </div>
            <Loader url="/integral/ajax/goods" callback={ this.appendList.bind(this) }>
              <div className="content" >
                { this.renderList() }
              </div>
            </Loader>
          </div>
        </section>
      </Page>
    );
  }
};

/*!
 * 商品详情
 */
import $ from 'webpack-zepto';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Page from '../../components/page';
import Bar from '../../components/bar';
import Carousel from '../../components/carousel';
import Filter from '../../support/filter';

export default class Details extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      title: '商品详情',
    };
  }

  componentDidMount() {
    this.request = $.get('/integral/ajax/details', {
      id: this.props.params.id,
    }, (res) => {
      if (res.code === 200) {
        this.setState({
          goods: res.data.entity,
        });
      }
    });
  }
  componentWillUnmount() {
    if (this.request) {
      this.request.abort();
    }
  }

  render() {

    return (
      <Page className="details bgwhite" title={ this.state.title }>
        <section className="main has-footer">
          { !this.state.goods &&
            <div className="loadmore">
              <i className="loading"></i>
              <span className="tips text-gray">正在加载</span>
            </div>
          }

          { this.state.goods &&
            <div className="noop">
              <Carousel list={ this.state.goods.imageSrcList }></Carousel>
              <div className="list compact">
                <div className="item">
                  <div className="text">
                    { this.state.goods.goodsName }
                  </div>
                  <div className="text-driving">
                    { this.state.goods.consumeIntegral }
                    <span className="text-xs">积分</span>
                  </div>
                </div>
                <div className="item thread split">
                  <div className="text">库存:{ Filter.default(this.state.goods.inventory, '不限') }</div>
                  <Link className="text text-dark" to="/integral/instruction">兑换说明</Link>
                </div>
                <div className="item thread">
                  <div className="text">
                    商品描述
                    <div className="describe text-darkgray">{ this.state.goods.goodsDesc }</div>
                  </div>
                </div>
              </div>
              <div className="article">
                <section>
                  <h2>商品详情</h2>
                  <section className="text-md" dangerouslySetInnerHTML={ {__html: this.state.goods.detail} }></section>
                </section>
              </div>
            </div>
          }
        </section>

        <Bar component="footer" className="btm-fixed">
          <div className="button-group compact">
            <Link className="button driving square" to={ (this.state.goods ? '/integral/confirm/' + this.state.goods.id : 'javascript:;') } disabled={ !this.state.goods }>我要兑换</Link>
          </div>
        </Bar>
      </Page>
    );
  }
};

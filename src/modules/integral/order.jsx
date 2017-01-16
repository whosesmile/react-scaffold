/*!
 * 订单详情
 */
import $ from 'webpack-zepto';
import React, { Component, PropTypes } from 'react';
import Page from '../../components/page';
import Filter from '../../support/filter';

export default class Order extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      title: '兑换详情',
      order: this.props.order,
    };
  }

  componentDidMount() {
    if (!this.state.order) {
      $.get('/integral/ajax/order', { id: this.props.params.id }, (res) => {
        if (res.code === 200) {
          this.setState({
            order: res.data.entity,
          });
        }
      });
    }
  }

  render() {
    return (
      <Page className="order" title={ this.state.title }>
        {/* main */}
        <section className="main">
          { this.state.order &&
            <div className="noop">
              <div className="list compact overlap">
                <div className="item">
                  <i className="icon">&#xe60c;</i>
                  <div className="text text-sm">
                    <p>兑换状态：<span className="text-driving">{ '已兑换' }</span></p>
                  </div>
                </div>
              </div>

              {/* 物流信息 */}
              { this.state.order.source == 2 &&
                <div className="noop">
                  <div is class="vspace" ui-mode="10px"></div>
                  <div className="list compact">
                    { this.state.order.logisticsCode &&
                      <a className="item" href="{{ macro.url('/shopping/logistics/' + order.logisticsCode, {company: order.logisticsCompany}) }}">
                        <i className="icon">&#xe608;</i>
                        <div className="text">物流追踪: { this.state.order.logisticsCompany }</div>
                        <div className="text text-right">{ this.state.order.logisticsCode }</div>
                        <i className="icon text-gray">&#xe61a;</i>
                      </a>
                    }
                    { !this.state.order.logisticsCode &&
                      <div className="item">
                        <i className="icon">&#xe608;</i>
                        <div className="text text-sm">订单追踪</div>
                        <div className="text text-sm text-right text-gray">暂无物流信息</div>
                      </div>
                    }
                  </div>
                </div>
              }

              {/* 流量包 */}
              { this.state.order.goodsType == 'FLOW' &&
                <div className="list compact">
                  <div className="item-divider">充值手机：</div>
                  <div className="item">
                    <i className="icon text-gray">&#xe60d;</i>
                    { this.state.order.consigneeMobile}
                  </div>
                </div>
              }

              {/* 实物 */}
              { this.state.order.goodsType == 'ENTITY' &&
                <div className="list compact">
                  <div className="item-divider">收货人信息：</div>
                  <div className="item address">
                    <i className="icon text-gray">&#xe60d;</i>
                    <div className="text">
                      收货人：{ this.state.order.consignee }
                      <span className="pull-right">{ this.state.order.consigneeMobile }</span>
                      <div className="brief">{ Filter.default(this.state.order.consigneeAddress, '暂未填写') }</div>
                    </div>
                  </div>
                </div>
              }

              {/* 优惠券 */}
              { this.state.order.goodsType == 'TICKET' &&
                <div className="list compact">
                  <div className="item-divider">优惠券：</div>
                  <div className="item">
                    <i className="icon text-gray">&#xe601;</i>
                    <div className="text text-dark">
                      <p>{ this.state.order.ticketCode }</p>
                      请在 <a className="link" href="/account/coupons">我的千丁券</a> 中查看
                    </div>
                  </div>
                </div>
              }
            </div>
          }
        </section>
      </Page>
    );
  }
};

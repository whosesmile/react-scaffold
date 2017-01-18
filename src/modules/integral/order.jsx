/*!
 * 订单详情
 */
import $ from 'webpack-zepto';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Bar from '../../components/bar';
import Page from '../../components/page';
import Modal from '../../components/Modal';
import Toast from '../../components/Toast';
import Filter from '../../support/filter';

export default class Order extends Component {
  static propTypes = {
    order: PropTypes.object,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      title: '兑换详情',
      // TODO
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

  confrimReceive = () => {
    Modal.render({
      title: '温馨提示',
      message: '您确认签收这件商品吗？',
      buttons: [{
        text: '取消',
      }, {
        text: '确定',
        onClick: this.handleReceive
      }]
    });
  }

  handleReceive = () => {
    $.ajax({
      url: '/integral/ajax/receive',
      type: 'post',
      data: { id: this.state.order.orderId },
      success: (res) => {
        if (res.code === 200) {
          Toast.success('签收成功');
          // 更新订单状态
          this.setState({
            order: Object.assign(this.state.order, { status: 5 }),
          });
        } else {
          Toast.failure('签收失败');
        }
      }
    });
    return false;
  }

  render() {
    let order = this.state.order;
    let orderStatus = [, , '已兑换', '兑换失败', '已发货', '已签收', '未兑换'];
    return (
      <Page className="order" title={ this.state.title }>
        {/* main */}
        <section className="main has-footer">
          { !order &&
            <div className="loadmore">
              <i className="loading"></i>
              <span className="tips text-gray">正在加载</span>
            </div>
          }

          { order &&
            <div className="noop">
              <div className="list compact overlap">
                <div className="item">
                  <div className="avatar">
                    <img width="16" src="//img1.qdingnet.com/f171f93870df8119a2df9681bfd61cdd.png" />
                  </div>
                  <div className="text">
                    <p>兑换状态：<span className="text-driving">{ Filter.default(orderStatus[order.status], '其他') }</span></p>
                  </div>
                </div>
              </div>

              {/* 物流信息 */}
              { order.source == 2 &&
                <div className="noop">
                  <div is class="vspace" ui-mode="10px"></div>
                  <div className="list compact">
                    { order.logisticsCode &&
                      <Link className="item" to={{pathname: '/integral/logistics/' + order.logisticsCode, query: {company: order.logisticsCompany}}}>
                        <div className="avatar">
                          <img width="16" src="//img1.qdingnet.com/2922a6d2a27be37d5dc8182a9d1194ca.png" />
                        </div>
                        <div className="text">物流追踪</div>
                        <div className="extra">{ order.logisticsCompany }</div>
                        <i className="icon text-gray">&#xe61a;</i>
                      </Link>
                    }
                    { !order.logisticsCode &&
                      <div className="item">
                        <div className="avatar">
                          <img width="16" src="//img1.qdingnet.com/2922a6d2a27be37d5dc8182a9d1194ca.png" />
                        </div>
                        <div className="text">物流追踪</div>
                        <div className="extra">暂无物流信息</div>
                      </div>
                    }
                  </div>
                </div>
              }

              {/* 流量包 */}
              { order.goodsType == 'FLOW' &&
                <div className="list compact">
                  <div className="item-divider">充值手机：</div>
                  <div className="item">
                    <div className="avatar">
                      <img width="16" src="//img1.qdingnet.com/4cae9deb696a71f5c8754000896abf85.png" />
                    </div>
                    <div className="text">{ order.consigneeMobile}</div>
                  </div>
                </div>
              }

              {/* 实物 */}
              { order.goodsType == 'ENTITY' &&
                <div className="list compact">
                  <div className="item-divider">收货人信息：</div>
                  <div className="item address">
                    <i className="icon text-gray">&#xe60d;</i>
                    <div className="text">
                      收货人：{ order.consignee }
                      <span className="pull-right">{ order.consigneeMobile }</span>
                      <div className="brief">{ Filter.default(order.consigneeAddress, '暂未填写') }</div>
                    </div>
                  </div>
                </div>
              }

              {/* 优惠券 */}
              { order.goodsType == 'TICKET' &&
                <div className="list compact">
                  <div className="item-divider">优惠券：</div>
                  <div className="item">
                    <i className="icon text-gray">&#xe601;</i>
                    <div className="text text-dark">
                      <p>{ order.ticketCode }</p>
                      请在 <a className="link" href="/account/coupons">我的千丁券</a> 中查看
                    </div>
                  </div>
                </div>
              }

              {/* 商品信息 */}
              <div className="list compact">
                <div className="item-divider">商品信息：</div>
                <a is class="item" ui-mode="15px">
                  <div className="avatar">
                    <img width="45" height="45" src={ order.coverImg } />
                  </div>
                  <div className="text">
                    <h4>{ order.goodsName }</h4>
                    <div className="brief text-ellipsis">
                      <span className="text-orange">{ order.consumeIntegral }积分</span>
                    </div>
                  </div>
                </a>
              </div>

              {/* 其他信息*/}
              <div className="list compact">
                <div className="item-divider">其他信息：</div>
                <div className="item">
                  <div className="text">
                    <p className="text-justify">
                      <span className="label">消耗积分</span>
                      <span className="value text-right">{ order.consumeIntegral }</span>
                    </p>
                    <p className="text-justify">
                      <span className="label">兑换时间</span>
                      <span className="value text-right">{ Filter.date(order.exchangeAt, 'yyyy-MM-dd hh:mm:ss') }</span>
                    </p>
                    <p className="text-justify">
                      <span className="label">订单编号</span>
                      <span className="value text-right">{ order.orderCode }</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          }
        </section>

        { order &&
          <Bar component="footer" className="btm-fixed">
            { order.source == 2 && order.status == 4 &&
              <div className="button-group compact">
                <a className="button default square" href="tel:4000818181">客服咨询</a>
                <button className="button warning square" onClick={ this.confrimReceive }>确认签收</button>
              </div>
            }
            { order.source != 2 || order.status != 4 &&
              <div className="button-group compact">
                <a className="button default square" href="tel:4000818181">如有疑问，请致电: 4000818181</a>
              </div>
            }
          </Bar>
        }
      </Page>
    );
  }
};

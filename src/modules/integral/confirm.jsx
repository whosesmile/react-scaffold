/*!
 * 兑换成功
 */
import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import Bar from '../../components/bar';
import Page from '../../components/page';
import Toast from '../../components/toast';
import TurnLink from '../../components/turnlink';

export default class Confirm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '兑换确认',
    };
  }

  // 清空组件
  clearWidget = () => {
    let widget = [].concat(this.state.widget || []);
    widget.pop();
    this.setState({ widget });
  }

  componentDidMount() {
    // 加载详情 & 加载地址
    // PS: 虚拟物品不需要加载地址，鉴于虚拟物品较稀少，暂时不做优化
    Promise.all([
      $.get('/integral/ajax/details', { id: this.props.params.id }),
      $.get('/account/ajax/address', { id: this.props.location.query.addressId }),
    ]).then((list) => {
      // 详情
      if (list[0].code === 200) {
        this.setState({
          goods: list[0].data.entity,
        });
      }
      // 地址
      if (list[1].code === 200) {
        this.setState({
          address: list[1].data.entity,
        });
      }
    })
  }

  handleExchange = (e) => {
    // 实物商品需要选择地址
    if (this.state.goods.goodsType == 'ENTITY' && !this.state.address) {
      this.setState({
        widget: <Toast icon="failure" message="请选择地址" callback={ this.clearWidget } />
      });
    }
    // 已选地址或不需要选择地址类型
    else {
      this.setState({
        widget: <Toast icon="loading" message="请稍后" time={ 10000 } />
      });

      // 下单
      $.post('/integral/ajax/placeorder', Object.assign(this.state.address || {}, {
        goodsId: this.state.goods.id,
        goodsType: this.state.goods.goodsType,
      }), (res) => {
        if (res.code === 200) {
          browserHistory.push(`/integral/success/${ res.data.entity.orderCode }`);
        } else {
          this.setState({
            widget: <Toast icon="failure" message={ res.data.message || '兑换失败' } callback={ this.clearWidget } />
          });
        }
      });
    }
  }

  render() {
    return (
      <Page className="confirm" title={ this.state.title } widget={ this.state.widget }>
        {/* main */}
        <section className="main">
          { !this.state.goods &&
            <div className="loadmore">
              <i className="loading"></i>
              <span className="tips text-gray">正在加载</span>
            </div>
          }

          { this.state.goods &&
            <div className="noop">
              <div className="list compact overlap">
                <div is class="item" ui-mode="15px">
                  <div className="avatar">
                    <img width="45" src={ this.state.goods.imageSrcList[0] } />
                  </div>
                  <span className="text">
                    { this.state.goods.goodsName }
                    <div className="brief">消耗：<span className="text-driving">{ this.state.goods.consumeIntegral } 积分</span></div>
                  </span>
                </div>
              </div>

              { this.state.goods.goodsType == 'ENTITY' &&
                <div className="list">
                  { this.state.address &&
                    <TurnLink className="item" to="/integral/addresses">
                      <i className="icon text-gray">&#xe60d;</i>
                      <span className="text">
                        { this.state.address.name }
                        <p className="brief text-wrap"><span>地址：{ this.state.address.addressStr }</span></p>
                      </span>
                      <i className="icon text-gray">&#xe61a;</i>
                    </TurnLink>
                  }
                  { !this.state.address &&
                    <TurnLink className="item" to="/integral/addresses">
                      <i className="icon text-gray">&#xe60d;</i>
                      <span className="text">
                        <span className="text-sm text-gray">请选择收货地址</span>
                      </span>
                      <i className="icon text-gray">&#xe61a;</i>
                    </TurnLink>
                  }
                </div>
              }
            </div>
          }
        </section>

        { this.state.goods &&
          <Bar component="footer" className="btm-fixed">
            <div className="button-group compact">
              <button className="button literal square text-left">应付: <span className="text-driving">{ this.state.goods.consumeIntegral }积分</span></button>
              <button className="button driving square" onClick={ this.handleExchange }>立即兑换</button>
            </div>
          </Bar>
        }
      </Page>
    );
  }
};

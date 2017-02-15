import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Bar from '../../../components/bar';
import Page from '../../../components/page';
import Toast from '../../../components/toast';
import Modal from '../../../components/modal';
import Env from '../../../support/env';
import Filter from '../../../support/filter';
import { getFeedback } from './config';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '收银台',
      list: [],
      loading: true,
    };
  }

  // 清空组件
  clearWidget = () => {
    let widget = [].concat(this.state.widget || []);
    widget.pop();
    this.setState({ widget });
  }

  // 更改支付方式
  handleChange(item) {
    this.setState({
      list: this.state.list.map((x) => {
        x.defaultFlag = x === item ? 1 : 0;
        return x;
      }),
    });
  }

  // 支付执行入口
  handlePayment = () => {
    let method = this.state.list.find((item) => item.defaultFlag === 1);
    if (!method) {
      return this.setState({
        widget: <Toast icon="failure" message="请选支付方式" callback={ this.clearWidget }/>
      });
    }

    // 现金支付
    if (method.type === 11) {
      this.handleCash(method);
    }
    // 刷卡支付
    else if (method.type === 21) {
      this.handleCard(method);
    }
    // 支付宝
    else if (method.type === 31) {
      this.handleAlipay(method);
    }
    // 微信支付
    else if (method.type === 51) {
      this.handleWeixin(method);
    }
    // 钱包支付
    else if (method.type === 61) {
      this.handleWallet(method);
    }
    // 其他方案
    else {
      this.handleOthers(method);
    }
  }

  // 支付回调处理
  handleFeedback(type) {
    let query = this.props.location.query;
    this.props.router.push({ pathname: getFeedback(query.business, type), query: query });
  }

  // 支付宝
  handleAlipay() {
    this.setState({
      widget: <Toast icon="loading" message="请稍后" time={ 10000 } />
    });

    // 支付参数
    $.get('/cashier/ajax/alipay', {
      code: this.props.location.query.code,
    }, (res) => {
      if (res.code === 200 && res.data.url) {
        location.href = res.data.url;
      } else {
        this.setState({
          widget: <Toast icon="failure" message="支付调用失败" callback={ this.clearWidget } />
        });
      }
    });
  }

  // 微信支付
  handleWeixin() {
    this.setState({
      widget: <Toast icon="loading" message="请稍后" time={ 10000 } />
    });

    // 支付参数
    $.get('/cashier/ajax/weixin', {
      code: this.props.location.query.code,
    }, (res) => {
      if (res.code === 200) {
        this.setState({ widget: null });
        // 调用微信接口
        WeixinJSBridge.invoke('getBrandWCPayRequest', res.data, (status) => {
          if (status.err_msg === "get_brand_wcpay_request:ok") {
            this.handleFeedback('success');
          } else {
            this.handleFeedback('failure');
          }
        });
      } else {
        const props = {
          title: '抱歉',
          message: res.data.message || '微信支付暂时不可用',
          buttons: [{
            text: '确定',
            onClick: this.clearWidget,
          }]
        };

        this.setState({
          widget: <Modal { ...props } />
        });
      }
    });
  }

  // 钱包支付
  handleWallet() {
    let password = null;
    let setPwd = e => password = e.target.value;
    let wallet = this.state.wallet;

    // 调用支付
    let payment = () => {
      this.setState({
        widget: <Toast icon="loading" message="请稍后" time={ 10000 } />
      });
      $.post('/cashier/ajax/wallet', {
        code: this.props.location.query.code,
        password: password,
      }, (res) => {
        if (res.code === 200) {
          this.handleFeedback('success');
        } else {
          this.setState({
            widget: <Toast icon="failure" message={ res.data.message || '支付失败' } callback={ this.clearWidget } />
          });
        }
      });
    };

    // 被冻结
    if (wallet.status == 0) {
      this.setState({
        widget: <Toast icon="failure" message="账户已被冻结" callback={ this.clearWidget } />
      });
    }
    // 有密码
    else if (wallet.status === 1) {
      const props = {
        title: '支付密码',
        message: (
          <section>
            <div className="list">
              <label className="item">
                <span className="label">密码</span>
                <div className="text">
                  <input className="input" type="password" pattern="[0-9]*" placeholder="请输入您的支付密码" maxLength="6" onChange={ setPwd } />
                </div>
              </label>
            </div>
          </section>),
        buttons: [{
          text: '取消',
          onClick: this.clearWidget,
        }, {
          text: '确定',
          onClick: () => {
            // 空密码
            if (!password) {
              return this.setState({
                widget: [].concat(this.state.widget).concat(<Toast icon="failure" message="密码不能为空" callback={ this.clearWidget } />),
              });
            }
            // 尝试支付
            else {
              payment();
            }
          },
        }]
      };

      this.setState({
        widget: <Modal { ...props } />
      });
    }
    // 没密码
    else if (wallet.status === 2) {
      payment();
    }
  }

  // 现金支付
  handleCash() {
    const props = {
      title: '现金支付',
      message: '您需要前往物业中心现金支付',
      buttons: [{
        text: '其他方式',
        onClick: this.clearWidget,
      }, {
        text: '查看订单',
        onClick: () => {
          location.href = '/account/orders';
        },
      }]
    };

    this.setState({
      widget: <Modal { ...props } />
    });
  }

  // 刷卡支付
  handleCard() {
    const props = {
      title: '刷卡支付',
      message: '您需要前往物业中心刷卡支付',
      buttons: [{
        text: '其他方式',
        onClick: this.clearWidget,
      }, {
        text: '查看订单',
        onClick: () => {
          location.href = '/account/orders';
        },
      }]
    };

    this.setState({
      widget: <Modal { ...props } />
    });
  }

  // 物业交费
  handleOthers() {
    const props = {
      title: '物业前台',
      message: '您需要前往物业中心当面支付',
      buttons: [{
        text: '其他方式',
        onClick: this.clearWidget,
      }, {
        text: '查看订单',
        onClick: () => {
          location.href = '/account/orders';
        },
      }]
    };

    this.setState({
      widget: <Modal { ...props } />
    });
  }

  componentDidMount() {
    const query = this.props.location.query;

    if (!query.code || !query.price || !query.business) {
      const props = {
        title: '数据异常',
        message: '缺少必要的支付参数，无法支付',
        buttons: [{
          text: '关闭',
          onClick: this.clearWidget,
        }]
      };

      return this.setState({
        widget: <Modal { ...props } />
      });
    }
    // 记载支付方式
    $.get('/cashier/ajax/method', {
      code: query.code,
      price: query.price,
      business: query.business,
    }, (res) => {
      if (res.code === 200) {
        let data = res.data;
        let lose = false; // 是否丢失默认支付,因为可能被移除或钱包被禁用

        // 非微信平台不显示微信支付
        if (!Env.is('wx')) {
          data.onlinePayMethods = data.onlinePayMethods.filter((item) => {
            if (item.type === 51) {
              lose = item.defaultFlag === 1;
              return false;
            }
            return true;
          });
        }
        // 微信平台不能显示支付宝支付
        else if (Env.is('wx')) {
          data.onlinePayMethods = data.onlinePayMethods.filter((item) => {
            if (item.type === 31) {
              lose = item.defaultFlag === 1;
              return false;
            }
            return true;
          });
        }

        // 虚拟支付Web只开放钱包支付,暂不支持亲情付
        data.virtualPayMethods = data.virtualPayMethods.filter((item) => item.type === 61);

        // 钱包支付可能被禁用
        if (data.walletStatus.status === 0) {
          data.virtualPayMethods.filter((item) => {
            if (item.type === 61) {
              lose = item.defaultFlag === 1;
              item.defaultFlag = 0;
            }
            return true;
          });
        }

        // 将所有支付方式合并在一起, 顺序是: 在线支付, 虚拟支付, 离线支付
        this.setState({
          loading: false,
          list: data.onlinePayMethods.concat(data.virtualPayMethods).concat(data.offlinePayMethods),
          wallet: data.walletStatus,
        }, () => {
          // 防止缺失默认支付方式
          if (lose && this.state.list.length) {
            // 没有禁用钱包无需判断
            if (this.state.wallet.status === 1) {
              let method = this.state.list[0];
              lose = false;
              method.defaultFlag = 1;
            }
            // 禁用钱包 找到第一个非钱包的支付方式
            else {
              let method = this.state.list.find((item) => item.type !== 61);
              if (method) {
                lose = false;
                method.defaultFlag = 1;
              }
            }
            // 重写数据
            this.setState({
              lose: lose,
              list: this.state.list,
            });
          }
        });
      }
    });
  }

  render() {
    let wallet = this.state.wallet;
    let price = Number(this.props.location.query.price || 0);
    return (
      <Page className="home" title={ this.state.title } widget={ this.state.widget }>
        {/* main */}
        <section className="main">
          { this.state.loading &&
            <div className="loadmore">
              <i className="loading"></i>
              <span className="tips text-gray">正在加载</span>
            </div>
          }
          { !this.state.loading && this.state.list.length === 0 &&
            <div className="feedback">
              <div className="mark">
                <img width="220" height="220" src="//img1.qdingnet.com/b70973ae84276a865ae7ae673ea1e318.png" alt="空白" />
              </div>
              <h3 className="title">无法支付</h3>
              <div className="describe">非常抱歉，您当前浏览器无法操作<br />你可以使用微信、服务窗、或千丁小区APP</div>
              <div className="vspace hspace">
                <a className="button plain-primary" href="//dl.qdingnet.com">下载千丁小区</a>
              </div>
            </div>
          }
          { this.state.list.length > 0 &&
            <div>
              <div is class="hspace text-sm" ui-mode="15px">
                <div is class="vspace" ui-mode="10px">请选择支付方式</div>
              </div>
              {
                this.state.list.map((item, idx) => {
                  return (
                    <div key={ idx } className="list">
                      {/* 钱包支付:特殊处理 */}
                      { item.type === 61 &&
                        <label is class="item tapable forlab" ui-mode="15px">
                          <div className="avatar">
                            <img width="45" height="45" src={ item.icon } />
                          </div>
                          <span className="text">
                            <span>{ item.name }<span className="text-driving text-sm">（余额: { Filter.currency(item.value) }）</span></span>
                            { wallet.status == 0 &&
                              <div className="brief text-ellipsis">
                                <span className="text-driving">{ wallet.statusTips || '提醒：钱包已被冻结，请联系客服' }</span>
                              </div>
                            }
                            { wallet.status == 1 &&
                              <div className="brief text-ellipsis">{ item.desc }</div>
                            }
                          </span>
                          <input className="checkbox" type="radio" name="paytype" checked={ item.defaultFlag } disabled={ wallet.status == 0 } onChange={ this.handleChange.bind(this, item) } />
                        </label>
                      }
                      {/* 其他支付 */}
                      { item.type !== 61 &&
                        <label is class="item tapable forlab" ui-mode="15px">
                          <div className="avatar">
                            <img width="45" height="45" src={ item.icon } />
                          </div>
                          <span className="text">
                            <span>{ item.name }</span>
                            <div className="brief text-ellipsis">{ item.desc }</div>
                          </span>
                          <input className="checkbox" type="radio" name="paytype" checked={ item.defaultFlag } onChange={ this.handleChange.bind(this, item) } />
                        </label>
                      }
                    </div>
                  );
                })
              }
            </div>
          }
        </section>
        { this.state.list.length > 0 &&
          <Bar component="footer" className="btm-fixed">
            <div className="button-group compact">
              <button className="button literal square text-left">应付: <span className="text-driving">{ Filter.currency(price) }</span></button>
              <button className="button driving square" disabled={ this.state.lose } onClick={ this.handlePayment }>立即支付</button>
            </div>
          </Bar>
        }
      </Page>
    );
  }
};

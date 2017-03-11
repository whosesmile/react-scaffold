/**
 * 流量兑换
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Bar from '../../components/bar';
import Page from '../../components/page';
import Input from '../../components/input';
import Modal from '../../components/modal';
import Toast from '../../components/toast';
import Filter from '../../support/filter';

export default class Package extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '流量兑换',
      invalid: false,
      loading: false,
      list: [],
      menus: [
        [{ icon: '&#xe60e;', label: '返回', className: 'text-gray', onClick: () => history.back() }],
        [{ label: '兑换说明', className: 'text-gray', onClick: () => { this.props.router.push('/integral/instruction') } }],
      ]
    };

    if (typeof CF !== 'undefined') {
      this.state.mobile = CF.member.memberMobile;
    }
  }

  clearWidget = () => {
    let widget = [].concat(this.state.widget || []);
    widget.pop();
    this.setState({ widget });
  }

  // 更改手机
  handleChange = (e) => {
    let mobile = e.target.value.trim();
    let invalid = !/^\d{11}$/.test(mobile);
    this.setState({
      invalid: invalid,
    });
    // 合法新手机号刷新流量包
    if (!invalid && mobile != this.state.mobile) {
      this.setState({
        mobile: mobile,
      }, this.refreshPackages);
    }
  }

  // 兑换确认
  handleConfirm(packet) {
    const props = {
      title: '温馨提示',
      message: <section>确认花费<span className="text-driving">{ packet.consumeIntegral }积分</span>兑换<span className="text-driving">{ packet.goodsName }</span>吗？</section>,
      buttons: [{
        text: '取消',
        onClick: this.clearWidget,
      }, {
        text: '确定',
        onClick: this.handleExcange.bind(this, packet),
      }],
    };
    this.setState({
      widget: <Modal { ...props }/>
    });
  }

  // 请求兑换
  handleExcange(packet) {
    this.setState({
      widget: <Toast icon="loading" message="请稍后" time={ 10000 } />
    });
    $.post('/integral/ajax/placeorder', {
      goodsId: packet.id,
      goodsType: 'FLOW',
      consigneeMobile: this.state.mobile,
    }, (res) => {
      if (res.code === 200) {
        this.props.router.push({ pathname: '/integral/success', query: { code: res.data.entity.orderCode } });
      } else {
        this.setState({
          widget: <Toast icon="failure" message={ res.data.message } callback={ this.clearWidget } />
        });
      }
    });
  }

  // 刷新流量包
  refreshPackages() {
    if (this.state.mobile) {
      if (this.request) {
        this.request.abort();
      }
      this.setState({
        loading: true,
        list: [],
      });
      this.request = $.get('/integral/ajax/packages', { mobile: this.state.mobile }, (res) => {
        if (res.code === 200) {
          this.setState({
            loading: false,
            list: res.data.list
          });
        } else {
          // TODO FAILURE
          this.setState({
            loading: false,
            list: [],
          });
        }
      });
    }
  }

  componentDidMount() {
    this.refreshPackages();
  }

  componentWillUnmount() {
    if (this.request) {
      this.request.abort();
    }
  }

  render() {
    return (
      <Page className="package" title={ this.state.title } widget={ this.state.widget } menus={ this.state.menus }>
        {/* main */}
        <section className="main has-footer">
          <div className="list compact">
            <label className="item">
              <span className="label">手机号</span>
              <Input className="input" type="tel" pattern="[0-9]*" maxLength="11" defaultValue={ this.state.mobile } placeholder="请输入您的手机号码(仅限中国大陆)" onChange={ this.handleChange } />
            </label>
          </div>

          <div className="list packets">
            { this.state.loading &&
              <div className="loadmore">
                <i className="loading"></i>
                <span className="tips text-gray">正在加载</span>
              </div>
            }

            { !this.state.loading &&
              this.state.list.map((item, idx) => {
                return (
                  <div key={ idx } className="item">
                    <div className="text">{ item.goodsName } <span className="text-sm text-driving">({ item.consumeIntegral }积分)</span></div>
                    <div className="interact narrow">
                      <button className="button literal text-primary" type="button" disabled={ this.state.invalid || item.exchangeStatus == 0 } onClick={ this.handleConfirm.bind(this, item) }>兑换</button>
                    </div>
                  </div>
                );
              })
            }
          </div>

          { !this.state.loading && this.state.list.length == 0 &&
            <div className="feedback">
              <div className="mark">
                <img width="220" height="220" src="//img1.qdingnet.com/b70973ae84276a865ae7ae673ea1e318.png" alt="空白" />
              </div>
              <div className="describe">暂时还没有相关流量包哦</div>
            </div>
          }

          { !this.state.loading && this.state.list.length > 0 &&
            <div className="article text-sm text-gray">
              <h3>充值说明</h3>
              <section>
                <p>1. 流量为全国流量，立即生效，月底失效，每个手机号码每月限充5次。</p>
                <p>2. 每月最后两天，中国移动手机号进入清算期，暂不支持兑换。</p>
                <p>3. 积分换取的流量，以实际运营商套餐为准，移动、联通、电信略有不同。</p>
                <p>4. 超过运营商冲抵限额、号码欠费、套餐互斥、非实名认证、运营商黑名单等充值失败，则积分会自动返还。</p>
              </section>
            </div>
          }
        </section>

        {  !this.state.loading &&
          <Bar component="footer" className="btm-fixed">
            <div className="button-group compact">
              <a className="button default square" href="tel:4000818181">如有疑问，请致电: 4000818181</a>
            </div>
          </Bar>
        }
      </Page>
    );
  }
};

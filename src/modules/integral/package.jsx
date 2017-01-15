/*!
 * 流量兑换
 */
import $ from 'webpack-zepto';
import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import Bar from '../../components/bar';
import Page from '../../components/page';
import Input from '../../components/input';
import MaskLayer from '../../components/masklayer';

export default class Package extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      title: '流量兑换',
      invalid: false,
      loading: false,
      show: false,
      processing: false,
      packet: {},
      list: [],
      failure: false,
      message: '',
    };

    if (typeof CF !== 'undefined') {
      this.state.mobile = CF.member.memberMobile;
    }
  }

  handleChange = (e) => {
    let mobile = e.target.value.trim();
    // 合法手机号
    if (/^\d{11}$/.test(mobile)) {
      this.setState({
        invalid: false,
      });

      // 是否需要刷新
      if (mobile != this.state.mobile) {
        this.setState({
          mobile: mobile,
        }, this.refreshPackages);
      }
    }
    // 非法手机号
    else {
      this.setState({
        invalid: true,
      });
    }
  }

  // 关闭
  dismiss = (e) => {
    this.setState({
      show: false,
      packet: {},
    });
  }

  confirmExchange = (data) => {
    this.setState({
      show: true,
      packet: data,
    });
  }

  handleExcange = (e) => {
    this.setState({
      show: false,
      processing: true,
    });

    let packet = this.state.packet;
    $.post('/integral/ajax/placeorder', {
      goodsId: packet.id,
      goodsType: 'FLOW',
      consigneeMobile: this.state.mobile,
    }, (res) => {
      if (res.code === 200) {
        let path = `/integral/success/${ res.data.entity.orderCode }`;
        browserHistory.push(path);
      } else {
        this.setState({
          processing: false,
          failure: true,
          message: res.data.message || '操作失败',
        });

        this.timer = setTimeout(() => { this.setState({ failure: false }) }, 2500);
      }
    });
  }

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
    clearTimeout(this.timer);
  }

  renderPackage() {
    if (this.state.loading) {
      return (
        <div className="loadmore">
          <i className="loading"></i>
          <span className="tips text-gray">正在加载</span>
        </div>
      );
    }

    return (
      this.state.list.map((item, idx) => {
        return (
          <div key={ idx } className="item">
            <div className="text">{ item.goodsName } <span className="text-sm text-driving">({ item.consumeIntegral }积分)</span></div>
            <div className="interact narrow">
              <button className="button literal text-primary" type="button" disabled={ this.state.invalid } onClick={ this.confirmExchange.bind(this, item) }>兑换</button>
            </div>
          </div>
        );
      })
    );
  }

  render() {
    return (
      <Page className="package" title={ this.state.title }>
        {/* main */}
        <section className="main has-footer">
          <div className="list compact">
            <label className="item">
              <span className="label">手机号</span>
              <div className="text">
                <Input className="input" type="tel" pattern="[0-9]*" maxLength="11" defaultValue={ this.state.mobile } placeholder="请输入您的手机号码(仅限中国大陆)" onChange={ this.handleChange } />
              </div>
            </label>
          </div>

          <div className="list packets">
            { this.renderPackage() }

            { this.state.list.length > 0 &&
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
          </div>
        </section>

        <Bar component="footer" className="btm-fixed">
          <div className="button-group compact">
            <a className="button default square" href="tel:4000818181">如有疑问，请致电: 4000818181</a>
          </div>
        </Bar>

        <MaskLayer show={ this.state.show }>
          <div className="modal">
            <h3 className="title">温馨提示</h3>
            <div className="content">确认花费<span className="text-driving">{ this.state.packet.consumeIntegral }积分</span>兑换<span className="text-driving">{ this.state.packet.goodsName }</span>吗？</div>
            <footer className="footer">
              <div className="button-group compact nesting">
                <a className="button square text-primary" onClick={ this.dismiss }>取消</a>
                <a className="button square text-primary text-strong" onClick={ this.handleExcange }>确定</a>
              </div>
            </footer>
          </div>
        </MaskLayer>

        <MaskLayer transparent={ true } show={ this.state.processing }>
          <div className="toast">
            <i className="icon waiting"></i>
            <span className="text">请稍后</span>
          </div>
        </MaskLayer>

        <MaskLayer transparent={ true } show={ this.state.failure }>
          <div className="toast">
            <i className="icon">&#xe61d;</i>
            <span className="text">{ this.state.message }</span>
          </div>
        </MaskLayer>
      </Page>
    );
  }
};

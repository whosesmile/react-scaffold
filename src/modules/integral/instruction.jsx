/*!
 * 兑换说明
 */
import React, { Component, PropTypes } from 'react';
import Page from '../../components/page';

export default class Instruction extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      title: '兑换说明',
    };
  }

  render() {
    return (
      <Page className="instruction" title={ this.state.title }>
        {/* main */}
        <section className="main">
          <div className="article">
            <h2>1. 充值说明</h2>
            <section>
              <p>1.1 流量为全国流量，立即生效，月底失效，每个手机号码每月限充5次。</p>
              <p>1.2 每月最后两天，中国移动手机号进入清算期，暂不支持兑换。</p>
              <p>1.3 积分换取的流量，以实际运营商套餐为准，移动、联通、电信略有不同。</p>
              <p>1.4 超过运营商冲抵限额、号码欠费、套餐互斥、非实名认证、运营商黑名单等充值失败，则积分会自动返还。</p>
            </section>

            <h2>2. 商城积分使用说明</h2>
            <section>
              <p>2.1 积分商城展示的图片仅供参考，请以实物为准。</p>
              <p>2.2 积分一经兑换，不予退还，请您谨慎选择，并仔细核对填写的相关信息。</p>
              <p>2.3 积分兑换的商品不在售后范围内，不可进行退换货。</p>
              <p>2.4 积分兑换的千丁券或流量会在2个小时内到账。</p>
            </section>
          </div>
        </section>
      </Page>
    );
  }
};

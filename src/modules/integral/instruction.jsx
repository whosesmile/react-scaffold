/*!
 * 兑换说明
 */
import React, { Component, PropTypes } from 'react';
import Page from '../../components/page';

export default class Instruction extends Component {

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
            <h2>商城积分使用说明</h2>
            <section>
              <p>1. 积分商城展示的图片仅供参考，请以实物为准。</p>
              <p>2. 积分一经兑换，不予退还，请您谨慎选择，并仔细核对填写的相关信息。</p>
              <p>3. 积分兑换的商品不在售后范围内，不可进行退换货。</p>
              <p>4. 积分兑换的千丁券或流量会在2个小时内到账。</p>
            </section>
          </div>
        </section>
      </Page>
    );
  }
};

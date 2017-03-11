/**
 * 积分协议
 */
import React, { Component, PropTypes } from 'react';
import Page from '../../components/page';

export default class Protocol extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '积分规则',
    };
  }

  render() {
    return (
      <Page className="protocol bgwhite" title={ this.state.title } widget={ this.state.widget } menus={ this.state.menus }>
        {/* main */}
        <section className="main">
          <div className="article">
            <section>
              <h2>1. 什么是千丁积分？</h2>
              <p>千丁积分专属于千丁，仅限在千丁APP内使用。</p>
            </section>
            <section>
              <h2>2.千丁积分的用处？</h2>
              <p>可用于在积分商城中兑换商品；</p>
              <p>可参与积分抽奖与积分兑换活动。</p>
            </section>
            <section>
              <h2>3. 如何获取千丁积分？</h2>
              <section>
                <h3>3.1 商品/服务的购买（非千丁账户预存消费）</h3>
                <p>在千丁平台成功下单支付后，按实际支付金额（不含用户使用的优惠券、千丁平台补贴款等促销金额）的2:1的比例进行积分累计<span className="text-gray">（例：实际支付100元，可获得50积分）</span>，如订单产生退款或取消，该订单增加的相应积分则被扣除。</p>
              </section>
              <section>
                <h3>3.2 商品/服务的评价</h3>
                <p>订单完成并成功评价后，获得20积分。</p>
              </section>
              <section>
                <h3>3.3 千丁预存账户消费<span className="text-gray">（不包括生活缴费，如水费、电费、燃气费、宽带费、物业费）</span></h3>
                <p>用户使用预存款金额购买商品/服务并对商品/服务评价时，积分计算规则与“1、商品/服务的购买<span className="text-gray">（非千丁账户预存消费）</span>”一致。</p>
              </section>
              <section>
                <h3>3.4 报事报修评价</h3>
                <p>报事报修完成并进行评价后可获得100积分。</p>
                <p>注：积分不能兑现、提现、不能转让。</p>
              </section>
            </section>
            <section>
              <h2>4. 相关声明</h2>
              <p>在相关法律允许范围内，千丁互联享有对积分的最终解释权。</p>
            </section>
          </div>
        </section>
      </Page>
    );
  }
};

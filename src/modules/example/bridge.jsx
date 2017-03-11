import React, { Component, PropTypes } from 'react';
import Page from '../../components/page';
import Toast from '../../components/toast';
import JSBridge from '../../support/bridge';
import Popup, { PopupHeader } from '../../components/popup';

export default class Bridge extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '桥接测试',
    };
  }

  // 清空组件
  clearWidget = () => {
    let widget = [].concat(this.state.widget || []);
    widget.pop();
    this.setState({ widget });
  }

  skmodel = (id, data) => {
    return (e) => {
      try {
        JSBridge.skmodel(id, data);
      } catch (e) {
        alert(e.toString());
      }
    };
  }

  share = () => {
    JSBridge.shareConfig({
      title: '关注千丁',
      desc: '精致服务 乐享生活',
      imgUrl: 'http://img1.qdingnet.com/318163c64963fdfc477d740be3426b77.jpg',
      link: 'http://m2.iqdnet.com/home',
    });
    // JSBridge.share({
    //   title: '关注千丁',
    //   desc: '精致服务 乐享生活',
    //   imgUrl: 'http://img1.qdingnet.com/318163c64963fdfc477d740be3426b77.jpg',
    //   link: 'http://m2.iqdnet.com/home',
    // });
  }

  goods = () => {
    JSBridge.goods(112242);
  }

  payment = () => {
    JSBridge.payment('NG02500011702201718285712', 23.80, 'NG');
  }

  channel = () => {
    JSBridge.channel(7);
  }

  scanner = () => {
    JSBridge.scanner();
  }

  person = () => {
    JSBridge.person(68074);
  }

  wallet = () => {
    JSBridge.wallet();
  }

  house = () => {
    JSBridge.house();
  }

  close = () => {
    JSBridge.close();
  }


  render() {
    return (
      <Page className="bridge" title={ this.state.title } widget={ this.state.widget }>
        {/* main */}
        <section className="main">
          <div className="list compact">
            <a className="item tapable" onClick={ this.skmodel(4000) }>
              <div className="text">我的首页</div>
              <div className="extra">SKMODEL</div>
              <i className="icon text-gray">&#xe61a;</i>
            </a>
            <a className="item tapable" onClick={ this.skmodel(2000) }>
              <div className="text">管家首页</div>
              <div className="extra">SKMODEL</div>
              <i className="icon text-gray">&#xe61a;</i>
            </a>
            <a className="item tapable" onClick={ this.skmodel(3012) }>
              <div className="text">邻聚广场</div>
              <div className="extra">SKMODEL</div>
              <i className="icon text-gray">&#xe61a;</i>
            </a>
            <a className="item tapable" onClick={ this.skmodel(3015, {id: 68074}) }>
              <div className="text">邻聚个人</div>
              <div className="extra">SKMODEL</div>
              <i className="icon text-gray">&#xe61a;</i>
            </a>
            <a className="item tapable" onClick={ this.skmodel(4100) }>
              <div className="text">我的钱包</div>
              <div className="extra">SKMODEL</div>
              <i className="icon text-gray">&#xe61a;</i>
            </a>
            <a className="item tapable" onClick={ this.skmodel(4200) }>
              <div className="text">我的资料</div>
              <div className="extra">SKMODEL</div>
              <i className="icon text-gray">&#xe61a;</i>
            </a>
            <a className="item tapable" onClick={ this.skmodel(4201) }>
              <div className="text">绑定房屋</div>
              <div className="extra">SKMODEL</div>
              <i className="icon text-gray">&#xe61a;</i>
            </a>
            <a className="item tapable" onClick={ this.skmodel(2300) }>
              <div className="text">物业账单</div>
              <div className="extra">SKMODEL</div>
              <i className="icon text-gray">&#xe61a;</i>
            </a>
            <a className="item tapable" onClick={ this.skmodel(5004, {id: 112242}) }>
              <div className="text">商品详情</div>
              <div className="extra">SKMODEL</div>
              <i className="icon text-gray">&#xe61a;</i>
            </a>
            <a className="item tapable" onClick={ this.share }>
              <div className="text">分享</div>
              <i className="icon text-gray">&#xe61a;</i>
            </a>
            <a className="item tapable" onClick={ this.payment }>
              <div className="text">支付</div>
              <i className="icon text-gray">&#xe61a;</i>
            </a>
            <a className="item tapable" onClick={ this.channel }>
              <div className="text">分类</div>
              <i className="icon text-gray">&#xe61a;</i>
            </a>
            <a className="item tapable" onClick={ this.scanner }>
              <div className="text">扫码</div>
              <i className="icon text-gray">&#xe61a;</i>
            </a>
            <a className="item tapable" onClick={ this.close }>
              <div className="text">关闭</div>
              <i className="icon text-gray">&#xe61a;</i>
            </a>
          </div>
        </section>
      </Page>
    );
  }
};

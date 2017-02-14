import React, { Component, PropTypes } from 'react';
import Page from '../../components/page';
import Toast from '../../components/toast';
import Popup, { PopupHeader } from '../../components/popup';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '千丁小区',
    };
  }

  // 清空组件
  clearWidget = () => {
    let widget = [].concat(this.state.widget || []);
    widget.pop();
    this.setState({ widget });
  }

  callback(item) {
    this.setState({
      widget: <Toast icon="warning" message={ '你选择了' + item } />
    });
  }

  handlePopup1 = () => {
    this.setState({
      widget: (
        <Popup className="test" onClick={ this.clearWidget }>
          <div className="content">
            <div className="list compact">
              {
                Array(5).fill(1).map((item, idx)=> {
                  return (
                    <div key={ idx } className="item" onClick={ this.callback.bind(this,idx) }>
                      <div className="text">我是项目：{ idx }</div>
                      <i className="icon">&#xe61a;</i>
                    </div>
                  );
                })
              }
            </div>
          </div>
        </Popup>
      ),
    });
  }

  handlePopup2 = () => {
    this.setState({
      widget: (
        <Popup className="test" onClick={ this.clearWidget }>
          <PopupHeader title="请选择" />
          <div className="content">
            <div className="list compact">
              {
                Array(5).fill(1).map((item, idx)=> {
                  return (
                    <div key={ idx } className="item" onClick={ this.callback.bind(this,idx) }>
                      <div className="text">我是项目：{ idx }</div>
                      <i className="icon">&#xe61a;</i>
                    </div>
                  );
                })
              }
            </div>
          </div>
        </Popup>
      ),
    });
  }

  handlePopup3 = () => {
    this.setState({
      widget: (
        <Popup className="test" onClick={ this.clearWidget }>
          <PopupHeader title="请选择" onCancel={ this.clearWidget } onConfirm={ this.clearWidget } />
          <div className="content">
            <div className="list compact">
              {
                Array(5).fill(1).map((item, idx)=> {
                  return (
                    <div key={ idx } className="item" onClick={ this.callback.bind(this,idx) }>
                      <div className="text">我是项目：{ idx }</div>
                      <i className="icon">&#xe61a;</i>
                    </div>
                  );
                })
              }
            </div>
          </div>
        </Popup>
      ),
    });
  }

  render() {
    return (
      <Page className="home" title={ this.state.title } widget={ this.state.widget }>
        {/* main */}
        <section className="main">
          <div className="list compact">
            <a className="item" href="/account">
              <div className="text">个人中心</div>
              <i className="icon">&#xe61a;</i>
            </a>
            <a className="item" href="/integral">
              <div className="text">积分商城</div>
              <i className="icon">&#xe61a;</i>
            </a>
            <a className="item" href="/">
              <div className="text">新版旅游</div>
              <div className="extra">待实现</div>
              <i className="icon">&#xe61a;</i>
            </a>
            <a className="item" href="/">
              <div className="text">物业交费</div>
              <div className="extra">待实现</div>
              <i className="icon">&#xe61a;</i>
            </a>
          </div>

          <div className="list">
            <div className="item tapable" onClick={ this.handlePopup1 }>
              <div className="text">POPUP示例</div>
              <div className="extra">无标题</div>
              <i className="icon">&#xe61a;</i>
            </div>
            <div className="item tapable" onClick={ this.handlePopup2 }>
              <div className="text">POPUP示例</div>
              <div className="extra">带标题</div>
              <i className="icon">&#xe61a;</i>
            </div>
            <div className="item tapable" onClick={ this.handlePopup3 }>
              <div className="text">POPUP示例</div>
              <div className="extra">带按钮</div>
              <i className="icon">&#xe61a;</i>
            </div>
          </div>
        </section>
      </Page>
    );
  }
};

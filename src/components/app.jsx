/**
 * 应用模板
 */
import FastClick from 'fastclick';
import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import Slot from './slot';
import Modal from './modal';
import Env from '../support/env';
import JSBridge from '../support/bridge';

// FASTCLICK: PROXY CLICK
window.addEventListener('load', () => FastClick.attach(document.body));

export default class App extends Component {

  static childContextTypes = {
    dump: PropTypes.object,
    store: PropTypes.object,
  };

  getChildContext() {
    return { dump: this.dump || {}, store: this.store, };
  }

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      action: 'ahead',
    };

    this.dump = null;
    this.store = {
      get current() {
        return this[location.pathname];
      },

      get: function(pathname) {
        return this[pathname];
      }
    };

    if (!history.state || !history.state.key || this.getRrkeys().indexOf(history.state.key) === -1) {
      localStorage.setItem('rrkeys', '[]');
    } else {
      this.state.index = this.getRrkeys().indexOf(history.state.key);
    }
  }

  getRrkeys() {
    let rrkeys = localStorage.getItem('rrkeys');
    return rrkeys ? JSON.parse(rrkeys) : []
  }

  setRrkeys(key) {
    let rrkeys = this.getRrkeys();
    rrkeys.push(key);
    localStorage.setItem('rrkeys', JSON.stringify(rrkeys));
    return rrkeys;
  }

  clearWidget = () => {
    let widget = [].concat(this.state.widget || []);
    widget.pop();
    this.setState({ widget });
  }

  componentDidMount() {
    // 切换动画
    browserHistory.listen((data) => {
      // 转存数据
      this.dump = data.state || null;
      let key = data.key;
      // 新增 PUSH
      if (data.action === 'PUSH') {
        let rrkeys = this.setRrkeys(data.key);
        this.setState({
          action: 'ahead',
          index: rrkeys.length,
        });
      }
      // 历史 POP
      else {
        let rrkeys = this.getRrkeys();
        let index = rrkeys.indexOf(data.key);
        // 如果在初始页面刷新, 因为rrkeys会被清空，此时前进index就会为 -1，此时补齐rrkeys
        // 仅当data.key存在 才是前进 不然会是后退到初始化页面
        if (data.key && index === -1) {
          rrkeys = this.setRrkeys(data.key);
          this.setState({
            action: 'ahead',
            index: rrkeys.length,
          });
        }
        // 历史前进
        else if (index > this.state.index) {
          this.setState({
            action: 'ahead',
            index: index,
          });
        }
        // 历史后退
        else {
          this.setState({
            action: 'backoff',
            index: index,
          });
        }
      }
    });

    // 异常拦截
    $(document).on('ajaxSuccess', (e, xhr, data, res) => {
      // 社区拦截
      if (res.code === 402) {
        const props = {
          title: '温馨提示',
          message: '您需要选择社区后才能继续操作',
          buttons: [{
            text: '取消',
            onClick: this.clearWidget,
          }, {
            text: '确定',
            onClick: () => {
              location.href = '/location?next=' + encodeURIComponent(location.href);
            },
          }],
        };
        this.setState({
          widget: <Modal { ...props }/>
        });
      }

      // 登录拦截
      if (res.code === 403) {
        const props = {
          title: '温馨提示',
          message: '您需要登录之后才能继续操作',
          buttons: [{
            text: '取消',
            onClick: this.clearWidget,
          }, {
            text: '确定',
            onClick: () => {
              if (Env.is('wx') || Env.is('ali')) {
                location.href = '/account/improve?next=' + encodeURIComponent(location.href);
              } else {
                location.href = '/account/login?next=' + encodeURIComponent(location.href);
              }
            },
          }],
        };
        this.setState({
          widget: <Modal { ...props }/>
        });
      }
    });

    // 微信分享
    if (Env.is('wx') && 'wx' in window) {
      wx.ready(function() {
        // 默认分享
        ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'].forEach(function(name) {
          wx[name]({
            title: '关注千丁',
            desc: '精致服务 乐享生活',
            imgUrl: 'http://img1.qdingnet.com/318163c64963fdfc477d740be3426b77.jpg',
            link: 'https://m2.iqdnet.com/home',
            success: function() {
              $(document).triggerHandler('event:share:success');
            },
            cancel: function() {
              $(document).triggerHandler('event:share:cancel');
            },
          });
        });

        // 隐藏部分渠道
        wx.hideMenuItems({
          menuList: ['menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:share:facebook', 'menuItem:share:QZone'],
        });
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    // 防止死循环刷新 参见:support/util {Reload}
    sessionStorage.removeItem(this.props.location.pathname);
    this.store[this.props.location.pathname] = this.refs.page.state;
  }

  render() {
    return (
      <Slot className={ this.state.action } transitionName="view" >
        { React.cloneElement(this.props.children, {ref: 'page', key: location.pathname}) }
        <Slot>
          {
            [].concat(this.state.widget || []).map((item, idx) => {
              return React.cloneElement(item, {key: idx});
            })
          }
        </Slot>
      </Slot>
    );
  }
};

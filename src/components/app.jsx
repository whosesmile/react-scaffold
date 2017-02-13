/*!
 * 应用模板
 */
import FastClick from 'fastclick';
import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { browserHistory } from 'react-router';
import Slot from './slot';
import Modal from './modal';
import Env from '../support/env';

// FASTCLICK: PROXY CLICK
window.addEventListener('load', () => FastClick.attach(document.body));

export default class App extends Component {

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      action: 'ahead',
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
    this.setState({
      widget: null
    });
  }

  componentDidMount() {
    // 切换动画
    browserHistory.listen((data) => {
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
  }

  componentWillUpdate(nextProps, nextState) {
    // 防止死循环刷新 参见:support/util {Reload}
    sessionStorage.removeItem(this.props.location.pathname);
  }

  render() {
    return (
      <ReactCSSTransitionGroup component="div" className={ this.state.action } transitionName="view"  transitionEnterTimeout={ 300 } transitionLeaveTimeout={ 300 }>
        { React.cloneElement(this.props.children, {key: location.pathname}) }
        <Slot>
          {
            [].concat(this.state.widget || []).map((item, idx) => {
              return React.cloneElement(item, {key: idx});
            })
          }
        </Slot>
      </ReactCSSTransitionGroup>
    );
  }
};

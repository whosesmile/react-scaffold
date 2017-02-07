/*!
 * 应用模板
 */
import FastClick from 'fastclick';
import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { browserHistory } from 'react-router';

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

  componentDidMount() {
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
  }

  render() {
    return (
      <ReactCSSTransitionGroup component="div" className={ this.state.action } transitionName="view"  transitionEnterTimeout={ 300 } transitionLeaveTimeout={ 300 }>
        { React.cloneElement(this.props.children, {key: location.pathname}) }
      </ReactCSSTransitionGroup>
    );
  }
};

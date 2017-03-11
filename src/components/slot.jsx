/**
 * 动态插槽
 */
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Env from '../support/env';

export default class Slot extends Component {
  static defaultProps = {
    component: 'div',
    transitionName: 'ex-widget',
    transitionEnterTimeout: 300,
    transitionLeaveTimeout: 300,
  };

  render() {
    let { className, ...others } = this.props;
    // Android关闭动画
    if (Env.is('android')) {
      return <div className="ex-close">{ this.props.children }</div>;
    }
    return (
      <ReactCSSTransitionGroup className={ classnames('ex-slot', className)} { ...others }>{ this.props.children }</ReactCSSTransitionGroup>
    );
  }
};

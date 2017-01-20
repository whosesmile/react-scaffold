/*!
 * 动态插槽
 */
import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Slot extends Component {
  static defaultProps = {
    component: 'div',
    className: 'ex-slot',
    transitionName: 'ex-widget',
    transitionEnterTimeout: 300,
    transitionLeaveTimeout: 300,
  };

  render() {
    return (
      <ReactCSSTransitionGroup { ...this.props }>{ this.props.children }</ReactCSSTransitionGroup>
    );
  }
};

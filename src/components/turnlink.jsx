/*!
 * TurnLink 将当前路径追加为参数: next, 一般用于从下个PAGE跳转回当前页面
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class TurnLink extends Component {
  render() {
    let next = location.pathname + location.search;
    let { to, ...others } = this.props;
    if (!to) {
      throw new Error('Failed prop type: The prop `to` is marked as required in `TurnLink`, but its value is `undefined`');
    }
    // 字符串追加next
    else if (typeof to === 'string') {
      to = { pathname: to, query: { next: next } };
    }
    // 对象追加next
    else if (typeof to === 'object') {
      to.query = Object.assign({ next: next }, to.query);
    }

    return (
      <Link { ...others } to={ to }>{ this.props.children }</Link>
    );
  }
}

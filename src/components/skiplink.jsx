/*!
 * SkipLink 翻译skipModel
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import skip from '../support/skip';

export default class SkipLink extends Component {
  render() {
    let { to, ...others } = this.props;
    let result = skip(to);

    // 可能是方法 以便执行不同的逻辑
    if (typeof result === 'funciton') {
      // TODO
    }

    // 优化同域路由
    const exp = new RegExp('^' + location.protocol + '//' + location.host);
    result.replace(exp, '');

    // 协议链接
    if (/^(https?:)?\/\//.test(result)) {
      return (<a { ...others } href={ result }>{ this.props.children }</a>);
    }

    return (<Link { ...others } to={ result }>{ this.props.children }</Link>);
  }
}

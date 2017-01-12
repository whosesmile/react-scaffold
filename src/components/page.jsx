/*!
 * 页面模板 待完善
 */
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Bar from './bar';

export default class Page extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    menus: PropTypes.array,
  };

  static defaultProps = {
    // 二维数组 第一个前置菜单，第二个后置菜单
    menus: [
      [{ icon: '&#xe60e;', label: '返回', className: 'text-gray', href: 'javascript:history.back()' }],
      [{ label: '刷新', className: 'text-gray', href: 'javascript:location.reload()' }],
    ],
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    document.title = this.props.title;

    // 在webview中，如APP内嵌或者微信、服务窗等，直接更改TITLE无效
    // TODO
    if (true) {
      var frame = document.createElement('iframe');
      frame.src = '//m.baidu.com/favicon.ico';
      frame.style.display = 'none';
      frame.onload = () => setTimeout(() => document.body.removeChild(frame), 10);
      document.body.appendChild(frame);
    }
  }

  renderBar() {

  }

  render() {
    let { title, menus, className, ...others } = this.props;
    let clazz = classnames('page', className);
    return (
      <div className={ clazz } { ...others }>
        <Bar menus={ menus }>{ title }</Bar>
        { this.props.children }
      </div>
    );
  }
};

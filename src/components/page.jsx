/*!
 * 页面模板
 */
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Bar from './bar';
import Slot from './slot';
import Env from '../support/env';

export default class Page extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    menus: PropTypes.array,
  };

  static defaultProps = {
    // 此处是示意 上线前会改动
    // 二维数组 第一个前置菜单，第二个后置菜单
    menus: [
      [{ icon: '&#xe60e;', label: '返回', className: 'text-gray', href: 'javascript:history.back()' }],
      [{ icon: '&#xe618;', className: 'text-gray', onClick: () => location.reload() }],
    ],
  };

  constructor(props) {
    super(props);
    this.state = {};

    // 设置菜单
    if (Env.is('app')) {
      // TODO 设置APP菜单
      // Env.proxy.setMenus();?
    }
  }

  componentDidMount() {
    document.title = this.props.title;

    // APP内嵌或微信、服务窗，直接更改TITLE无效
    if (Env.nested) {
      var frame = document.createElement('iframe');
      frame.src = '//m.baidu.com/favicon.ico';
      frame.style.display = 'none';
      frame.onload = () => setTimeout(() => document.body.removeChild(frame), 10);
      document.body.appendChild(frame);
    }
  }

  render() {
    let { title, menus, className, widget, ...others } = this.props;
    let clazz = classnames('ex-page', className);
    return (
      <div className={ clazz } { ...others }>
        { !Env.nested &&
          <Bar component="header" menus={ menus } title={ title }></Bar>
        }

        { this.props.children }

        {
        /*
          * 全局组件插槽
          * 注意：由于页面过度有动画，同时网络AJAX有延迟，因此有时会在错误的页面弹出组件
          * 如果不能接受这种情况，可以在当前PAGE手动加入slot元素，调用组件时将slot作为最后一个参数传递即可。
        */
        }

        <Slot>{ widget }</Slot>

      </div>
    );
  }
};

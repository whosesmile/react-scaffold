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

    // !!! 内嵌窗口如APP、微信、服务窗等,直接更改TITLE无效
    if (Env.nested) {
      var frame = document.createElement('iframe');
      frame.src = '//m.baidu.com/favicon.ico';
      frame.style.display = 'none';
      frame.onload = () => setTimeout(() => document.body.removeChild(frame), 10);
      document.body.appendChild(frame);
    }

    // !!! 修正fixed, 原因参考 less/preset.less !!!
    this.timer = setTimeout(this.handleFixed, 350);

    // !!! 修正偏移,防止前一个页面滚动
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  // !!! 修正fixed, 原因参考 less/preset.less !!!
  handleFixed = () => {
    $(this.refs.page).addClass('notrans');
  }

  render() {
    let { title, menus, className, widget, ...others } = this.props;
    let clazz = classnames('ex-page', className);
    return (
      <div ref="page" className={ clazz } { ...others } onTransitionEnd={ this.handleFixed }>
        { !Env.nested &&
          <Bar component="header" menus={ menus } title={ title }></Bar>
        }

        { this.props.children }

        {
          /*
          * 页面组件插槽
          */
        }

        <Slot>
          {
            [].concat(widget || []).map((item, idx) => {
              return React.cloneElement(item, {key: idx});
            })
          }
        </Slot>

      </div>
    );
  }
};

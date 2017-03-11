/**
 * 页面模板
 */
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { browserHistory } from 'react-router';
import Bar from './bar';
import Popdown from './popdown';
import Slot from './slot';
import Env from '../support/env';
import { uuid } from '../support/util';

export default class Page extends Component {

  // 记录菜单历史
  static menuEvents = [];

  static propTypes = {
    title: PropTypes.string.isRequired,
    menus: PropTypes.array,
  };

  static defaultProps = {
    // 此处是示意 上线前会改动
    // 二维数组 第一个前置菜单，第二个后置菜单
    menus: [
      [{ icon: '&#xe60e;', label: '返回', className: 'text-gray', onClick: () => browserHistory.goBack() }],
      // [{ icon: '&#xe618;', label: '刷新', className: 'text-gray', onClick: () => location.reload() }],
    ],
  };

  constructor(props) {
    super(props);
    this.state = {
      menus: this.props.menus,
      extra: [],
    };

    // 清理之前的菜单事件
    while (Page.menuEvents.length) {
      let eventId = Page.menuEvents.pop();
      $(document).off(eventId);
    }

    // 设置新菜单
    let menus = this.props.menus;
    if (menus[1]) {
      if (Env.is('app')) {
        // 生成回调
        let proxy = (item) => {
          const eventId = `event:${ uuid() }`;
          $(document).on(eventId, () => {
            if (item.onClick) this.toggleMenu(item.onClick);
            if (item.href) location.href = item.href;
          });
          Page.menuEvents.push(eventId);
          return eventId;
        };

        // JSBridge不可以直接调用 单页面刷新IFRME APP会清理menubar...
        this.state.extra = menus[1].map((item) => {
          return {
            name: item.label,
            content: proxy(item),
          };
        });
      }
      // 非内嵌网页
      else if (!Env.nested && menus[1].length > 1) {
        this.state.extra = menus[1];
        menus[1] = [{ label: '更多', className: 'text-gray', onClick: this.toggleMenu }];
        this.state.menus = menus;
      }
    }

  }

  componentDidMount() {
    document.title = this.props.title;

    // !!! 内嵌窗口如APP、微信、服务窗等,直接更改TITLE无效
    if (Env.nested) {
      var frame = document.createElement('iframe');
      frame.src = '//m.baidu.com/favicon.ico';
      frame.style.display = 'none';
      frame.onload = () => setTimeout(() => {
        document.body.removeChild(frame);
        JSBridge.menubar(this.state.extra)
      }, 10);;
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

  toggleMenu = (fn) => {
    this.setState({
      open: !this.state.open,
    }, typeof fn === 'function' ? fn : (() => {}));
  }

  render() {
    let { title, menus, className, widget, ...others } = this.props;
    let clazz = classnames('ex-page', className);
    return (
      <div ref="page" className={ clazz } { ...others } onTransitionEnd={ this.handleFixed }>
        { !Env.nested &&
          <Bar className="bulge" component="header" menus={ this.state.menus } title={ title }></Bar>
        }

        { this.props.children }

        { /* 页面菜单 */ }
        { this.state.extra.length > 0 &&
          <Slot>
            { this.state.open &&
              <Popdown style={ {top: 44} }onClick={ this.toggleMenu }>
                <div className="content">
                  <div className="list compact">
                    {
                      this.state.extra.map((item, idx)=> {
                        let {icon, label, className, onClick, ...others} = item;
                        return (
                          <a key={ idx } className="item" { ...others } onClick={ ()=>{this.toggleMenu(onClick)} }>
                            { icon && <i className="icon" dangerouslySetInnerHTML={{__html: icon}}></i> }
                            { label && <div className="text">{ label }</div> }
                          </a>
                        );
                      })
                    }
                  </div>
                </div>
              </Popdown>
            }
          </Slot>
        }

        { /* 组件插槽 */ }
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

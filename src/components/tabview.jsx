/*!
 * 选项卡 约定class(tabs,tabpane), 放弃使用Tab自定义标签,简化结构
 */
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class TabView extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    $(this.refs.panel).on('click', '.tabs .item', (e) => {
      let tab = $(e.target);
      if (!tab.is('.active')) {
        tab.addClass('active')
        tab.siblings().removeClass('active');
        $(tab.attr('href')).addClass('active').siblings().removeClass('active');

        // TODO 待实践是否合适
        window.scrollTo(0, 0);
      }
      e.preventDefault();
    });
  }

  componentWillUnmount() {
    $(this.refs.panel).off('click');
  }

  render() {
    let { className, ...others } = this.props;
    let clazz = classnames('tabview', className);
    return (
      <div ref="panel" className={ clazz }>
        { this.props.children }
      </div>
    );
  }
};

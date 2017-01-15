/*!
 * 遮罩容器
 */
import $ from 'webpack-zepto';
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class MaskLayer extends Component {

  static propTypes = {
    show: React.PropTypes.bool.isRequired,
    transparent: React.PropTypes.bool,
  };

  static defaultProps = {
    transparent: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      mount: false,
    };
  }

  componentDidMount() {
    // 关闭
    let fn = (e) => {
      let mask = $(this.refs.mask);
      if (mask.is('.ex-widget-out')) {
        this.setState({
          mount: false,
        });
      }
      if (mask.is('.ex-widget-in')) {
        this.setState({
          mount: true,
        });
      }
    };
    let events = 'animationend webkitAnimationEnd transitionend webkitTransitionEnd';
    events.split(' ').forEach(e => this.refs.mask.addEventListener(e, fn, false));
  }

  render() {
    let { show, transparent, className, ...others } = this.props;
    let clazz = classnames('ex-widget-layer', {
      'ex-widget-in': show,
      'ex-widget-out': this.state.mount && !show,
      'transparent': this.props.transparent,
    }, className);

    return (
      <div ref="mask" className={ clazz } {...others}>
        { this.props.children }
      </div>
    );
  }
}

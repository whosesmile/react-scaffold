/*!
 * 遮罩容器
 */
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class MaskLayer extends Component {

  static propTypes = {
    show: PropTypes.bool.isRequired,
    transparent: PropTypes.bool,
  };

  static defaultProps = {
    transparent: false,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { show, transparent, className, ...others } = this.props;
    let clazz = classnames('ex-widget-layer', {
      'transparent': this.props.transparent,
    }, className);

    if (show) {
      return (
        <div ref="mask" className={ clazz } {...others}>
          { this.props.children }
        </div>
      );
    } else {
      return null;
    }
  }
}

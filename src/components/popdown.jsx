/**
 * 下拉浮窗
 */
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import MaskLayer from './masklayer';

export default class Popdown extends Component {
  static propTypes = {
    show: PropTypes.bool,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    show: true,
    onClick: () => {},
  }

  constructor(props) {
    super(props)
    this.state = {
      show: this.props.show,
    };
  }

  render() {

    let { show, className, children, onClick, ...others } = this.props;

    return (
      <MaskLayer className="slight" show={ this.state.show } onClick={ onClick }>
        <div className={ classnames('popdown', className) } { ...others }>
          { children }
        </div>
      </MaskLayer>
    );
  }
};

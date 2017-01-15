/*!
 * Input 带关闭
 */
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class Input extends Component {

  clean = () => {
    this.refs.input.value = '';
    this.refs.input.focus();
  }

  render() {
    let { className, ...others } = this.props;
    let clazz = classnames('input', className);

    return (
      <div className="input-widget">
        <input ref="input" required className={ clazz }  { ...others} />
        <i className="icon text-darkgray" onClick={ this.clean }>&#xe61d;</i>
      </div>
    );
  }
}

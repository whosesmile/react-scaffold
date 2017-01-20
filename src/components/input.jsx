/*!
 * Input 带关闭
 */
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class Input extends Component {

  clean = () => {
    this.refs.input.focus();
    this.refs.input.value = '';
    this.refs.input.dispatchEvent(new Event('input', { bubbles: true }));
  }

  render() {
    let { className, ...others } = this.props;
    let clazz = classnames('input', className);

    return (
      <div className="input-widget">
        <input ref="input" required className={ clazz }  { ...others} />
        <i className="icon text-gray" onClick={ this.clean }>&#xe61d;</i>
      </div>
    );
  }
}

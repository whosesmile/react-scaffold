/*!
 * 浮窗
 */
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import MaskLayer from './masklayer';

export default class Popup extends Component {
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
      <MaskLayer show={ this.state.show } onClick={ onClick }>
        <div className={ classnames('popup', className) } { ...others }>
          { children }
        </div>
      </MaskLayer>
    );
  }
};

export class PopupHeader extends Component {
  static propTypes = {
    title: PropTypes.string,
    labels: PropTypes.object,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
  };

  static defaultProps = {
    show: true,
    labels: { cancel: '取消', confirm: '确定' },
  }

  constructor(props) {
    super(props)
    this.state = {};
  }

  render() {
    let { title, labels, onCancel, onConfirm, ...others } = this.props;
    return (
      <div className="header">
        { labels.cancel && onCancel &&
          <a className="button literal inline text-nm text-gray" onClick={ onCancel }>{ labels.cancel }</a>
        }
        <h4 className="title">{ title }</h4>
        { labels.confirm && onConfirm &&
          <a className="button literal inline text-nm text-driving" onClick={ onConfirm }>{ labels.confirm }</a>
        }
      </div>
    );
  }
};

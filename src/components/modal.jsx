import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import MaskLayer from './masklayer';

/**
 * Used to display a collection of actions that contain a set of interactivity, including descriptions, links, and so on. Popup from the bottom, generally used to respond to user clicks on the page.
 */
export default class Modal extends Component {
  static propTypes = {
    type: PropTypes.string,
    title: PropTypes.string,
    modal: PropTypes.bool,
    cancelText: PropTypes.string,
    confirmText: PropTypes.string,
    content: PropTypes.string.isRequired,
  };

  static defaultProps = {
    type: 'alert',
    modal: true,
    cancelText: '取消',
    confirmText: '确定',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  handlerCancel = (e) => {
    console.log('cancel')
  }


  handlerConfirm = (e) => {
    console.log('confirm')
  }

  renderHeader() {
    if (this.props.title) {
      return (
        <h3 className="title">{ this.props.title }</h3>
      );
    }
  }

  renderHeader() {
    if (this.props.title) {
      return (
        <h3 className="title">{ this.props.title }</h3>
      );
    }
  }
  renderContent() {
    return (
      <div className="content">本商品销售范围不支持您所在的社区或库存不足</div>
    );
  }

  renderFooter() {
    if (this.props.type == 'confirm') {
      return (
        <footer className="footer">
          <div className="button-group compact nesting">
            <a className="button square text-primary cancel" onClick={ this.handlerCancel }>{ this.props.cancelText }</a>
            <a className="button square text-primary text-strong submit" onClick={ this.handlerConfirm }>{ this.props.confirmText }</a>
          </div>
        </footer>
      );
    } else {
      return (
        <footer className="footer">
          <div className="button-group compact nesting">
            <a className="button square text-primary text-strong submit" onClick={ this.handlerConfirm }>{ this.props.confirmText }</a>
          </div>
        </footer>
      );
    }
  }

  render() {
    let { shown, type, title, modal, cancelText, confirmText, content, className, ...others } = this.props;
    let clazz = classnames('modal', className);
    return (
      <MaskLayer data-dismiss={ this.props.modal } shown={ shown }>
        <div className={ clazz } { ...others }>
          { this.renderHeader() }
          { this.renderContent() }
          { this.renderFooter() }
        </div>
      </MaskLayer>
    );
  }
};

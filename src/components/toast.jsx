/*!
 * 吐司
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import MaskLayer from './masklayer';

export default class Toast extends Component {
  static propTypes = {
    icon: PropTypes.string,
    message: PropTypes.string,
    show: PropTypes.bool,
    time: PropTypes.number,
    callback: PropTypes.func,
  };

  static defaultProps = {
    show: true,
    time: 3000,
  };

  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show,
      presets: {
        success: '&#xe61c;',
        failure: '&#xe61d;',
        warning: '&#xe601;',
      },
    };
  }

  dismiss = (e) => {
    this.setState({
      show: false,
    });
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  renderIcon() {
    let icon = this.props.icon;
    // PRESET ICON
    if (Object.keys(this.state.presets).includes(icon)) {
      return <i className="icon" dangerouslySetInnerHTML={{__html: this.state.presets[icon]}}></i>;
    }
    // LOADING
    if (icon === 'loading') {
      return <i className="icon waiting"></i>;
    }
    // OTHER ICON
    if (/^&#\w+;$/.test(icon)) {
      return <i className="icon" dangerouslySetInnerHTML={{__html: icon}}></i>;
    }
    // IMAGE ICON
    if (/^(https?)?\/\//.test(icon)) {
      return <i className="icon"><img src={ icon } /></i>;
    }
    // DEFAULT ICON
    return <i className="icon">&#xe601;</i>;
  }

  render() {
    let { icon, message, className, show, time, callback = this.dismiss, ...others } = this.props;
    let clazz = classnames('toast', className);
    clearTimeout(this.timer);
    this.timer = setTimeout(callback, time);
    return (
      <MaskLayer transparent={ true } show={ this.state.show }>
        <div className={ clazz } { ...others }>
          { this.renderIcon() }
          <span className="text">{ message || '木有提示' }</span>
        </div>
      </MaskLayer>
    );
  }
};

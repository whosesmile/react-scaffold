/*!
 * 吐司
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import MaskLayer from './masklayer';

class ToastWidget extends Component {
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
    callback: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      presets: {
        success: '&#xe61c;',
        failure: '&#xe61d;',
        warning: '&#xe601;',
      },
    };
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
    let { icon, message, className, show, time, callback, ...others } = this.props;
    let clazz = classnames('toast', className);
    this.timer = setTimeout(callback, time);
    return (
      <MaskLayer transparent={ true } show={ this.props.show }>
        <div className={ clazz } { ...others }>
          { this.renderIcon() }
          <span className="text">{ message || '木有提示' }</span>
        </div>
      </MaskLayer>
    );
  }
};

// 兼容参数
const vary = (opts, callback) => {
  if (typeof opts === 'string') {
    opts = { message: opts };
  }
  if (typeof callback === 'function') {
    opts.callback = callback;
  }
  return opts;
};

// 吐司代理
const Toast = {
  success: function() {
    return this.render(Object.assign({ icon: 'success' }, vary.apply(null, arguments)));
  },
  failure: function() {
    return this.render(Object.assign({ icon: 'failure' }, vary.apply(null, arguments)));
  },
  warning: function() {
    return this.render(Object.assign({ icon: 'warning' }, vary.apply(null, arguments)));
  },
  loading: function() {
    return this.render(Object.assign({ icon: 'loading', time: 10000, message: '请稍后' }, vary.apply(null, arguments)));
  },
  render: function(opts) {
    return React.createElement(ToastWidget, opts);
  },
};

export default Toast;
export { ToastWidget };

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import MaskLayer from './masklayer';

export default class Toast extends Component {
  static propTypes = {
    icon: PropTypes.string,
    message: PropTypes.string,
  };

  static defaultProps = {
    icon: null,
    message: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      shown: true,
      presets: {
        success: '&#xe61c;',
        failure: '&#xe61d;',
        warning: '&#xe601;',
      },
    };
  }

  componentDidMount() {
    let self = this;
    setTimeout(function() {
      self.setState({
        shown: false,
      });
    }, 2500);
  }

  renderIcon() {
    let icon = this.props.icon;
    // PRESET ICON
    if (Object.keys(this.state.presets).includes(icon)) {
      return <i className="icon" dangerouslySetInnerHTML={{__html: this.state.presets[icon]}}></i>;
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
    let { message, className, ...others } = this.props;
    let clazz = classnames('toast', className);
    return (
      <MaskLayer transparent={ true }>
        <div className={ clazz } { ...others }>
          { this.renderIcon() }
          <span className="text">{ message || '木有提示' }</span>
        </div>
      </MaskLayer>
    );
  }
};

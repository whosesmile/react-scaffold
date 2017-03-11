/**
 * 悬挂功能
 */
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class Swing extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      threshold: 0,
    };
  }

  handler = (e) => {
    $(this.refs.panel).toggleClass('fixed', window.scrollY > this.state.threshold);
  }

  reposition = (e) => {
    let panel = $(this.refs.panel);
    panel.css('height', panel.height());
    this.setState({
      threshold: panel.offset().top,
    });
  }

  componentDidMount() {
    // 顺序不能乱
    $(window).one('scroll', this.reposition);
    $(window).on('scroll', this.handler);
    $(window).on('resize', this.reposition);
  }

  componentWillUnmount() {
    $(window).off('scroll', this.reposition);
    $(window).off('scroll', this.handler);
    $(window).off('resize', this.reposition);
  }

  render() {
    let { className, ...others } = this.props;
    let clazz = classnames('swing', className);
    return (
      <div ref="panel" className={ clazz }>
        <div className="tablet">
          { this.props.children }
        </div>
      </div>
    );
  }
};

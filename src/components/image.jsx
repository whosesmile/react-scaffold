/*!
 * 延迟加载
 */
import $ from 'webpack-zepto';
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class LazyImage extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
  };

  static defaultProps = {
    src: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.events = ['scroll', 'resize', 'lookup'];
  }

  handler = () => {
    let th = 150;
    let img = $(this.refs.img);
    let $w = $(window);
    let wt = $w.scrollTop();
    let wb = wt + $w.height();
    let et = img.offset().top;
    let eb = et + img.height();
    if (eb >= wt - th && et <= wb + th) {
      this.release();
      img.trigger('unveil');
    }
  }

  release() {
    this.events.forEach((ename) => {
      $(window).off(ename, this.handler);
    });
  }

  componentDidMount() {
    let img = $(this.refs.img);
    img.one('unveil', () => {
      img.attr('src', this.props.src);
    });

    this.handler();
    this.events.forEach((ename) => {
      $(window).on(ename, this.handler);
    });
  }

  componentWillUnmount() {
    this.release();
  }

  render() {
    let { src, ...others } = this.props;
    return (
      <img ref="img" { ...others } src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" />
    );
  }
};

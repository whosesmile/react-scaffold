/*!
 * 延迟加载图片
 */
import $ from 'webpack-zepto';
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class Lazy extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
    this.events = ['scroll', 'resize', 'lookup'];

    this.handler = () => {
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
    };
  }

  release() {
    this.events.forEach((ename) => {
      $(window).off(ename, this.handler);
    });
  }

  componentDidMount() {
    let img = $(this.refs.img);
    img.one('unveil', () => {
      img.attr('src', img.attr('data-src'));
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
    let { src, className, ...others } = this.props;
    let clazz = classnames('lazyimg', className);
    return (
      <img ref="img" data-src={ src } className={ clazz } { ...others } src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" />
    );
  }
};

/*!
 * 延迟加载
 */
import $ from 'webpack-zepto';
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Slider from 'nuka-carousel';

export default class Carousel extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
  };

  static defaultProps = {
    speed: 300,
    autoplayInterval: 4500,
    autoplay: true,
    wrapAround: true,
    edgeEasing: 'linear',
    paddingTop: '93.333333%',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  decorators(count) {
    return [{
      component: React.createClass({
        render() {
          return (
            <nav>
              {
                [...Array(count)].map((_, i) => {
                  let clazz = this.props.currentSlide === i ? 'active' : '';
                  return <a key={ i } data-current={ this.props.currentSlide } className={ clazz } onClick={ this.props.goToSlide.bind(null, i) }></a>;
                })
              }
            </nav>
          );
        },

        position: 'BottomCenter',
      })
    }];
  }

  render() {
    let { list, className, paddingTop, ...others } = this.props;
    return (
      <div className="carousel" style={ {paddingTop: paddingTop} }>
        <Slider refs="panel" decorators={ this.decorators(list.length) } { ...others }>
          { list.map((item, idx) => <img key={ idx } src={ item } />) }
        </Slider>
      </div>
    );
  }
};

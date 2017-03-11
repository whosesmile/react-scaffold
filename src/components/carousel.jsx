/**
 * 旋转木马
 */
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
          if (this.props.slideCount === 1) {
            return null;
          }
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
      })
    }];
  }

  render() {
    let { list, className, paddingTop, wrapAround, ...others } = this.props;
    wrapAround = list.length > 1 ? wrapAround : false;
    return (
      <div className="carousel" style={ {paddingTop: paddingTop} }>
        <Slider refs="panel" decorators={ this.decorators(list.length) } { ...others }>
          { list.map((item, idx) => <img key={ idx } src={ item } />) }
        </Slider>
      </div>
    );
  }
};

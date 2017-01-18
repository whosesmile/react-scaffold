/*!
 * BAR
 */
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class Bar extends Component {

  static propTypes = {
    menus: PropTypes.array,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderPrev(list) {
    return list.map((menu, idx) => {
      let { icon, label, className, ...others } = menu;
      let clazz = classnames('menu', className);
      return (
        <a key={ idx } className={ clazz } { ...others }>
          { icon &&
            <i className="icon" dangerouslySetInnerHTML={{__html: icon}}></i>
          }
          { label &&
            <span className="label">{ label }</span>
          }
        </a>
      );
    });
  }

  renderNext(list) {
    return list.map((menu, idx) => {
      let { icon, label, className, ...others } = menu;
      let clazz = classnames('menu', className);
      return (
        <a key={ idx } className={ clazz } { ...others }>
          { label &&
            <span className="label">{ label }</span>
          }
          { icon &&
            <i className="icon" dangerouslySetInnerHTML={{__html: icon}}></i>
          }
        </a>
      );
    });
  }

  render() {
    let Tag = this.props.component || 'div';
    let clazz = classnames('bar', this.props.className);

    // header bar
    if (this.props.title && this.props.menus) {
      let prev = this.props.menus[0] || [];
      let next = this.props.menus[1] || [];
      return (
        <Tag className={ clazz }>
          { this.renderPrev(prev) }
          <h1 className="title"><b>{ this.props.title }</b></h1>
          { this.renderNext(next) }
        </Tag>
      );
    }
    // others bar
    else {
      return (
        <Tag className={ clazz }>{ this.props.children }</Tag>
      );
    }
  }
}

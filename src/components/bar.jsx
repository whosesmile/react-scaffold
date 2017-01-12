/*!
 * bar
 */
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class Bar extends Component {

  static propTypes = {
    menus: PropTypes.array.isRequired,
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
    let prev = this.props.menus[0] || [];
    let next = this.props.menus[1] || [];

    return (
      <header className="bar">
        { this.renderPrev(prev) }
        <h1 className="title"><b>{ this.props.children }</b></h1>
        { this.renderNext(next) }
      </header>
    );
  }
}

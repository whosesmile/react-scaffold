/*!
 * ActionSheet
 */
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import MaskLayer from './masklayer';

export default class ActionSheet extends Component {
  static propTypes = {
    title: PropTypes.string,
    label: PropTypes.string,
    menus: PropTypes.array.isRequired,
  };

  static defaultProps = {
    title: null,
    label: null,
    menus: [],
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderHeader() {
    if (this.props.title || this.props.label) {
      return (
        <header className="header">
          {(() => {
            if (this.props.title) {
              return <h4>{ this.props.title }</h4>
            }
          })()}
          { this.props.label }
        </header>
      );
    }
  }

  renderMenus() {
    let menus = this.props.menus;
    // CHECK GROUP
    if (!(menus[0] instanceof Array)) {
      menus = [menus];
    }

    // IF MISS CLOSE MENU
    let close = menus.reduce((x, y) => x.concat(y)).find((item) => item.dismiss);
    if (!close) {
      menus.push([{
        text: '取消',
        className: 'text-gray',
      }]);
    }

    // RENDER MENUS
    return menus.map((group, idx) => {
      // FILTER BLANK GROUP
      if (group.length) {
        return (
          <div key={ idx } className="menus">
          { group.map((menu, index) => {
            let { text, className, ...others } = menu;
            let clazz = classnames('item', className);

            return (
              <div key={ index } className={ clazz } data-dismiss="true" { ...others }>{ text }</div>
            );
          }) }
        </div>
        );
      }
    });
  }

  render() {
    let { menus, className, ...others } = this.props;
    let clazz = classnames('actionsheet', className);
    return (
      <MaskLayer data-dismiss="true">
        <div className={ clazz } { ...others }>
          { this.renderHeader() }
          { this.renderMenus() }
        </div>
      </MaskLayer>
    );
  }
};

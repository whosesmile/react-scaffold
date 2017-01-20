/*!
 * ActionSheet
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import MaskLayer from './masklayer';

class ActionSheetWidget extends Component {
  static propTypes = {
    show: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string,
    buttons: PropTypes.array.isRequired,
  };

  static defaultProps = {
    show: true,
  };

  render() {
    let { show, title, message, buttons, className, ...others } = this.props;
    let clazz = classnames('actionsheet', className);
    return (
      <MaskLayer show={ show }>
        <div className={ clazz } { ...others }>
          {/* HEADER */}
          { (title || message) &&
            <header className="header">
              { title &&
                <h4>{ title }</h4>
              }
              { message }
            </header>
          }

          {/* BUTTONS */}
          {
            buttons.map((group, idx) => {
              return (
                <div key={ idx } className="menus">
                  {
                    group.map((button, index) => {
                      let { text, className, ...rest } = button;
                      let clazz = classnames('item', className);

                      return (
                        <div key={ index } className={ clazz } { ...rest }>{ text }</div>
                      );
                    })
                  }
                </div>
              );
            })
          }
        </div>
      </MaskLayer>
    );
  }
};

// 弹窗代理
const ActionSheet = {
  render: (opts) => {
    return React.createElement(ActionSheetWidget, Object.assign({ key: Date.now() }, opts));
  }
};

export default ActionSheet;
export { ActionSheetWidget };

/**
 * ActionSheet
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import MaskLayer from './masklayer';

export default class ActionSheet extends Component {
  static propTypes = {
    show: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string,
    buttons: PropTypes.array.isRequired,
  };

  static defaultProps = {
    show: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show,
    };
  }

  dismiss = (e) => {
    this.setState({
      show: false,
    });
  }

  render() {
    let { show, title, message, buttons, className, ...others } = this.props;
    let clazz = classnames('actionsheet', className);
    return (
      <MaskLayer show={ this.state.show }>
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
                      let { text, className, onClick = this.dismiss, ...rest } = button;
                      let clazz = classnames('item', className);

                      return (
                        <div key={ index } className={ clazz } onClick={ onClick } { ...rest }>{ text }</div>
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

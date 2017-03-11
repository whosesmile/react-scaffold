/**
 * 弹窗
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import MaskLayer from './masklayer';

export default class Modal extends Component {

  static propTypes = {
    title: PropTypes.string,
    message: PropTypes.any.isRequired,
    show: PropTypes.bool,
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
    return (
      <MaskLayer show={ this.state.show }>
        <div className="modal">
          { this.props.title &&
            <h3 className="title">{ this.props.title }</h3>
          }
          <div className="content">{ this.props.message }</div>

          <footer className="footer">
            <div className="button-group compact nesting">
              {
                this.props.buttons.map((item, idx) => {
                  let { text, className='text-primary', onClick=this.dismiss, ...others } = item;
                  let clazz = classnames('button square', className);
                  return (
                    <button key={ idx } className={ clazz } onClick={ onClick } { ...others }>{ text }</button>
                  );
                })
              }
              </div>
          </footer>

        </div>
      </MaskLayer>
    );
  }
};

/*!
 * 弹窗
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import MaskLayer from './masklayer';

class ModalWidget extends Component {

  static propTypes = {
    title: PropTypes.string,
    message: PropTypes.string.isRequired,
    show: PropTypes.bool,
  };

  static defaultProps = {
    show: true,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <MaskLayer show={ this.props.show }>
        <div className="modal">
          { this.props.title &&
            <h3 className="title">{ this.props.title }</h3>
          }
          <div className="content" dangerouslySetInnerHTML={{__html: this.props.message}}></div>

          <footer className="footer">
            <div className="button-group compact nesting">
              {
                this.props.buttons.map((item, idx) => {
                  let { text, className='text-primary', ...others } = item;
                  let clazz = classnames('button square', className);
                  return (
                    <button key={ idx } className={ clazz } { ...others }>{ text }</button>
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

// 弹窗代理
const Modal = {
  render: (opts) => {
    return React.createElement(ModalWidget, Object.assign({ key: Date.now() }, opts));
  }
};

export default Modal;
export { ModalWidget };

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
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  dismiss = (e) => {
    if (this._mounted) {
      this.setState({
        show: false,
      });
    }
  }

  delegate(fn) {
    return (e) => {
      if (fn(e) !== false) {
        this.dismiss(e);
      }
      // 禁用防止重复提交
      else {
        let button = e.target;
        button.disabled = true;
        button.innerHTML = '<i class="loading"></i>请稍后';
      }
    };
  }

  render() {
    return (
      <MaskLayer show={ this.state.show }>
        <div className="modal">
          { this.props.title &&
            <h3 className="title">{ this.props.title }</h3>
          }
          <div className="content" dangerouslySetInnerHTML={{__html: this.props.message}}></div>

          <footer className="footer">
            <div className="button-group compact nesting">
              {
                this.props.buttons.map((item, idx) => {
                  let { text, className='text-primary', onClick, ...others } = item;
                  let clazz = classnames('button square', className);
                  onClick = this.delegate(typeof onClick === 'function' ? onClick : (() => {}));
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

// 弹窗代理
const Modal = {
  render: (opts, slot) => {
    slot = slot instanceof HTMLElement ? slot : document.querySelector('#gslot');
    return ReactDOM.render(React.cloneElement(<ModalWidget { ...opts } />, { key: Date.now() }), slot);
  },
};

export default Modal;

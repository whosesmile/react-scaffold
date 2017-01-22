/*!
 * 选择器
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import MaskLayer from './masklayer';

class PickerWidget extends Component {
  static propTypes = {
    title: PropTypes.string,
    show: PropTypes.bool,
    actions: PropTypes.array,
    groups: PropTypes.array,
    selected: PropTypes.array,
    onChange: PropTypes.func,
    onCancel: PropTypes.func,
    onGroupChange: PropTypes.func,
  };

  static defaultProps = {
    actions: [],
    groups: [],
    show: false,
    onChange: () => {},
    onCancel: () => {},
  }

  constructor(props) {
    super(props)

    this.state = {
      selected: this.props.selected ? this.props.selected : Array(this.props.groups.length).fill(-1),
      actions: this.props.actions.length > 0 ? this.props.actions : [{
        text: '取消',
        onClick: (e) => this.handleClose(() => { this.props.onCancel(e); }),
      }, {
        text: '确定',
        onClick: (e) => this.handleChanges(),
      }],
      closing: false
    }
  }

  handleChanges = () => {
    this.handleClose(() => {
      this.props.onChange(this.state.selected, this);
    });
  }

  handleChange = (item, i, groupIndex) => {
    let selected = this.state.selected;

    selected[groupIndex] = i;
    this.setState({ selected }, () => {
      if (this.props.onGroupChange) this.props.onGroupChange(item, i, groupIndex, this.state.selected, this)
    });
  }

  handleClose = (callback) => {
    this.setState({
      closing: true
    }, () => setTimeout(() => {
      this.setState({ closing: false });
      callback()
    }, 300))
  }

  renderActions() {
    let elActions = this.state.actions.map((action, i) => {
      let { label, ...others } = action;
      return <a {...others} key={i} className="weui-picker__action"> { label }</a>
    })

    return (
      <div className="weui-picker__hd">
        { elActions }
      </div>
    )
  }

  renderGroups() {
    return this.props.groups.map((group, i) => {
      return <PickerGroup  key={i} {...group} onChange={this.handleChange} groupIndex={i} defaultIndex={this.state.selected[i]} />;
    })
  }

  render() {
    // const { className, show, actions, groups, defaultSelect, onGroupChange, onChange, onCancel, ...others } = this.props;
    // const cls = classNames('weui-picker', {
    //   'weui-animate-slide-up': show && !this.state.closing,
    //   'weui-animate-slide-down': this.state.closing
    // }, className);

    // const maskCls = classNames({
    //   'weui-animate-fade-in': show && !this.state.closing,
    //   'weui-animate-fade-out': this.state.closing
    // })

    return (
      <div className="picker">
        <div className="header">
          <a className="menu text-gray">关闭</a>
          <h4 className="title">{ this.props.title }</h4>
          <a className="menu text-link">确定</a>
        </div>
        <div className="content">
          <div className="group">
            <div className="roller">
              <div className="item">北京</div>
              <div className="item">上海</div>
              <div className="item">天津</div>
              <div className="item">重庆</div>
              <div className="item">广州</div>
              <div className="item">深圳</div>
              <div className="item">南京</div>
              <div className="item">西安</div>
              <div className="item">苏州</div>
              <div className="item">武汉</div>
            </div>
          </div>
        </div>
      </div>
    );

    // return this.props.show ? (
    //   <div>
    //       <Mask className={maskCls} onClick={e=>this.handleClose( ()=> {if(this.props.onCancel) this.props.onCancel(e)} )} />
    //       <div className={cls} {...others}>
    //           { this.renderActions() }
    //           <div className="weui-picker__bd">
    //               { this.renderGroups() }
    //           </div>
    //       </div>
    //   </div>
    // ) : false;
  }
};

// 选择器代理
const Picker = {
  render: (opts) => {
    return React.createElement(PickerWidget, opts);
  }
};

export default Picker;
export { PickerWidget };

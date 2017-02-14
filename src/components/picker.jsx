/*!
 * 选择器
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import MaskLayer from './masklayer';

export default class Picker extends Component {
  static propTypes = {
    title: PropTypes.string,
    show: PropTypes.bool,
    groups: PropTypes.array.isRequired,
    labels: PropTypes.object,
    selected: PropTypes.array,
    onChange: PropTypes.func,
    onCancel: PropTypes.func,
    onChoose: PropTypes.func,
  };

  static defaultProps = {
    show: true,
    groups: [],
    labels: { cancel: '取消', confirm: '确定' }
  }

  constructor(props) {
    super(props)
    this.state = {
      show: this.props.show,
      selected: this.props.selected ? this.props.selected : Array(this.props.groups.length).fill(-1),
    };
  }

  dismiss = (e) => {
    this.setState({
      show: false,
    });
  }

  inValid() {
    let groups = this.props.groups;
    let selected = this.state.selected;
    let result = false;
    groups.forEach((group, i) => {
      let item = group.items[selected[i]];
      if (item && item.disabled) {
        result = true;
      }
    });
    return result;
  }

  // CORE METHOD
  handleChange = (item, i, groupIndex) => {
    let selected = this.state.selected;
    selected[groupIndex] = i;
    this.setState({
      selected: selected,
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(item, i, groupIndex, this.state.selected, this);
      }
    });
  }

  handleChoose = () => {
    if (this.props.onChoose) {
      let data = this.props.groups.map((group, i) => {
        return group.items[this.state.selected[i]];
      });
      this.props.onChoose(data, this.state.selected);
    }
  }

  render() {

    let { title, show, groups, labels, selected, onChange, onCancel, onChoose, ...others } = this.props;

    return (
      <MaskLayer show={ this.state.show } onClick={ onCancel || this.dismiss }>
        <div className="picker">
          <div className="header">
            <a className="button literal inline text-nm text-gray" onClick={ onCancel || this.dismiss }>{ labels.cancel }</a>
            <h4 className="title">{ this.props.title }</h4>
            <a className="button literal inline text-nm text-driving" disabled={ this.inValid() } onClick={ this.handleChoose || this.dismiss }>{ labels.confirm }</a>
          </div>
          <div className="content">
            {
              this.props.groups.map((group, idx) => {
                return <PickerGroup  key={ idx } index={ idx } selected={ this.state.selected[idx] } onChange={ this.handleChange } { ...group } />;
              })
            }
          </div>
        </div>
      </MaskLayer>
    );
  }
};

class PickerGroup extends Component {

  static propTypes = {
    height: PropTypes.number,
    itemHeight: PropTypes.number,
    aniamtion: PropTypes.bool,
    items: PropTypes.array.isRequired,
    index: PropTypes.number,
    selected: PropTypes.number,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    height: 238,
    itemHeight: 34,
    animation: true,
    index: 0,
    selected: -1,
    onChange: () => {},
  }

  constructor(props) {
    super(props);
    this.state = {
      touchId: null,
      touching: false,
      stpoint: 0,
      sttrans: 0,
      translate: 0,
      selected: this.props.selected,
      animating: this.props.animation,
    };
  }

  handleChange(propagate = true) {
    let { items, index } = this.props;
    if (propagate) {
      this.props.onChange(items[this.state.selected], this.state.selected, index);
    }
  }

  componentDidMount() {
    this.adjustOffset(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.adjustOffset(nextProps);
  }

  adjustOffset(props) {
    let { selected, items, height, itemHeight } = props;
    if (items.length === 0) {
      return;
    }
    let propagate = selected < 0;

    // 防止溢出
    if (selected > items.length - 1) {
      selected = items.length - 1;
    }
    // 找到最接近的值
    if (selected < 0) {
      selected = 0;
    }

    let volume = height / itemHeight;
    let median = (volume - 1) / 2;

    this.setState({
      touching: false,
      animating: true,
      sttrans: 0,
      stpoint: 0,
      touchId: null,
      selected: selected,
      translate: (median - selected) * itemHeight,
    }, () => {
      this.handleChange(propagate);
    });
  }

  handleTouchStart = (e) => {
    if (this.state.touching || this.props.items.length <= 1) {
      return;
    }

    this.setState({
      touching: true,
      animating: false,
      sttrans: this.state.translate,
      stpoint: e.targetTouches[0].pageY,
      touchId: e.targetTouches[0].identifier,
    });
  }

  handleTouchMove = (e) => {
    if (!this.state.touching || this.props.items.length <= 1) {
      return;
    }
    if (e.targetTouches[0].identifier !== this.state.touchId) {
      return;
    }

    e.preventDefault();
    this.setState({
      translate: this.state.sttrans + (e.targetTouches[0].pageY - this.state.stpoint),
    });
  }

  handleTouchEnd = (e) => {
    if (!this.state.touching || this.props.items.length <= 1) {
      return;
    }

    // 计算位置
    const { height, itemHeight } = this.props;
    let volume = height / itemHeight;
    let median = (volume - 1) / 2;
    let count = this.props.items.length;
    let translate = this.state.translate;

    // 超过上限
    if (translate > median * itemHeight) {
      translate = median * itemHeight;
    }
    // 超过下限
    else if (translate < (-count + median + 1) * itemHeight) {
      translate = (-count + median + 1) * itemHeight;
    }
    // 校准位置
    else if (translate % itemHeight !== 0) {
      let adjust = translate % itemHeight;
      if (Math.abs(adjust) > itemHeight / 2) {
        translate += adjust > 0 ? itemHeight - adjust : -itemHeight - adjust;
      } else {
        translate -= adjust;
      }
    }

    let selected = this.state.selected;
    this.setState({
      touching: false,
      animating: true,
      sttrans: 0,
      stpoint: 0,
      touchId: null,
      selected: median - translate / itemHeight,
      translate: translate,
    }, () => {
      if (selected !== this.state.selected) {
        this.handleChange();
      }
    });
  }

  render() {
    let styles = {
      'transform': `translateY(${ this.state.translate }px)`,
      'transition': this.state.animating ? 'transform .3s' : 'none',
    };
    return (
      <div className="group" onTouchStart={ this.handleTouchStart } onTouchMove={ this.handleTouchMove } onTouchEnd={ this.handleTouchEnd }>
        <div className="roller" style={ styles }>
          {
            this.props.items.map((item, idx) => {
              return <div key={ idx } className={ classnames('item', {disabled: item.disabled}) } dangerouslySetInnerHTML={{__html: item.label}}></div>;
            })
          }
        </div>
      </div>
    );
  }

}

/*!
 * 城市选择器
 */
import React, { PropTypes } from 'react';
import Picker from './picker';

export default class CityPicker extends React.Component {

  static propTypes = {
    list: PropTypes.array.isRequired,
    provinceId: PropTypes.number,
    cityId: PropTypes.number,
    areaId: PropTypes.number,
  }

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = this.parseData(this.props.list);
  }

  // 如果数据结构不满足情况 需要解析一次
  parseData(list) {
    let groups = Array(3).fill({ items: [] });
    let selected = Array(3).fill(-1);

    // 填充省份，其他列会自动调用updateGroup渲染
    groups[0] = {
      items: list.map((item) => {
        return { id: item.id, label: item.name, disabled: item.disabled, list: item.regions };
      })
    };

    const { provinceId, cityId, areaId } = this.props;

    // 复盘省份
    if (provinceId) {
      selected[0] = groups[0].items.findIndex((item) => {
        return item.id == provinceId;
      });

      // 复盘城市
      if (cityId) {
        groups[1] = {
          items: groups[0].items[selected[0]].list.map((item, index) => {
            if (item.id == cityId) {
              selected[1] = index;
            }
            return { id: item.id, label: item.name, disabled: item.disabled, list: item.districts };
          }),
        };

        // 复盘地区
        if (areaId) {
          groups[2] = {
            items: groups[1].items[selected[1]].list.map((item, index) => {
              if (item.id == areaId) {
                selected[2] = index;
              }
              return { id: item.id, label: item.name, disabled: item.disabled };
            }),
          };
        }
      }
    }

    return {
      selected: selected,
      groups: groups,
    };
  }


  updateGroup = (data, i, groupIndex, selected) => {
    let groups = this.state.groups;
    // 更改省份
    if (groupIndex === 0) {
      groups[1] = {
        items: data.list.map((item) => {
          return { id: item.id, label: item.name, list: item.districts };
        })
      };

      // 重要: 由于更改了城市，因为我们需要连锁更新区县, 这里需要将城市的索引设置为-1,程序会自动更新到0，然后再次触发一次updateGroup
      selected[1] = -1;
    }
    // 更改城市
    if (groupIndex === 1) {
      groups[2] = {
        items: data.list.map((item) => {
          return { id: item.id, label: item.name };
        })
      };
      // 重要：默认选择第一个，这里写成 0 是因为已经是最后一列，不会有连锁变动了，当然写成-1也无所谓，会多一次调用而已
      selected[2] = 0;
    }
    // 更改区县
    if (groupIndex === 2) {
      // NOTING
      console.log('nothing...')
    }

    // 刷新数据
    this.setState({
      groups: groups,
      selected: selected,
    });
  }

  render() {
    let props = {
      title: '所在地区',
      selected: this.state.selected,
      groups: this.state.groups,
      onChange: this.updateGroup,
      onCancel: this.props.onCancel,
      onChoose: this.props.onChoose,
    };

    return (
      <Picker { ...props } />
    );
  }
}

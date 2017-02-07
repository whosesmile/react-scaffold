/*!
 * 新增地址 编辑地址
 */
import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import classnames from 'classnames';
import Page from '../../components/page';
import Bar from '../../components/bar';
import Input from '../../components/input';
import Modal from '../../components/modal';
import Toast from '../../components/toast';
import Picker from '../../components/picker';
import CityPicker from '../../components/citypicker';

export default class Address extends Component {

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    if (this.props.params.id) {
      this.state = {
        title: '编辑地址',
        // 服务器加载
        model: null,
      };
    } else {
      this.state = {
        title: '新增地址',
        // 给个默认值
        model: {
          name: CF.member.memberName,
          mobile: CF.member.memberMobile,
        },
      };
    }
  }

  componentDidMount() {
    if (this.props.params.id) {
      this.request = $.get('/account/ajax/address', {
        id: this.props.params.id,
      }, (res) => {
        if (res.code === 200) {
          // 特殊数据处理下 保存时要反过来处理
          let model = res.data.entity;
          model.projectName = model.projectName || '其他社区';
          model.roomName = model.roomName || '其他房屋';
          this.setState({
            model: model,
          });
        }
      });
    }
  }

  componentWillUnmount() {
    if (this.request) {
      this.request.abort();
    }
  }

  // 清空组件
  clearWidget = () => {
    this.setState({ widget: null });
  }

  // 检查错误
  checkModel() {
    let message = null;
    let model = this.state.model;
    if (!model.name) {
      message = '请填写姓名';
    }
    // 空字符
    else if (!model.mobile) {
      message = '请填写手机';
    }
    // 格式
    else if (!/^\d{11}$/.test(model.mobile)) {
      message = '手机格式错误';
    }
    // 省市区
    else if (!model.provinceId || !model.cityId || !model.areaId) {
      message = '请选择地区';
    }
    // 因为可能是《其他社区》,所以同时判定ID和NAME,
    else if (!model.projectId && !model.projectName) {
      message = '请选择社区';
    }
    // 如果有组团
    else if (this.state.hasGroup && !model.groupId) {
      message = '请选择组团';
    }
    // 如果不是其他社区，需要选择房屋
    // 因为可能是《其他房屋》,所以同时判定ID和NAME
    else if (model.projectId && !model.roomId && !model.roomName) {
      message = '请选择房屋';
    }
    // 如果没有房屋，一定要写备注
    else if (!model.roomId && !model.address) {
      message = '请填写地址';
    }

    return message;
  }

  // 提交数据
  handleSubmit = () => {
    let message = this.checkModel();
    // 如果有错误
    if (message) {
      return this.setState({
        widget: <Toast icon="failure" message={ message } callback={ this.clearWidget } />
      });
    }

    // 处理数据
    let data = Object.assign({}, this.state.model);
    // 其他社区重置为空
    data.projectName = data.projectId ? data.projectName : null;
    // 其他房屋重置为空
    data.roomName = data.roomId ? data.roomName : null;

    // 提示
    this.setState({
      widget: <Toast icon="loading" message="请稍后" callback={ this.clearWidget } />
    });

    $.post('/account/ajax/address', data, (res) => {
      if (res.code === 200) {
        this.setState({
          widget: <Toast icon="success" message="保存成功" callback={ () => { history.back() } } />
        });
      } else {
        this.setState({
          widget: <Toast icon="failure" message="保存失败" callback={ this.clearWidget } />
        });
      }
    });
  }

  // 修改数据
  setModel = (e) => {
    this.state.model[e.target.name] = e.target.value;
    this.setState({
      model: this.state.model,
    });
  }

  // 渲染省市区
  renderLocation() {
    let model = this.state.model;
    if (model.provinceId) {
      return (
        <div className="item tapable" onClick={ this.handleLocation }>
          <span className="label">所在地区</span>
          <div className="text text-ellipsis text-right">
            { model.provinceName }-{ model.cityName }-{ model.areaName || '其他地区' }
          </div>
          <i className="icon text-gray">&#xe61a;</i>
        </div>
      );
    } else {
      return (
        <div className="item tapable" onClick={ this.handleLocation }>
          <span className="label">所在地区</span>
          <div className="text text-right text-gray">请选择</div>
          <i className="icon text-gray">&#xe61a;</i>
        </div>
      );
    }
  }

  // 获取城市并缓存，防止每次都查询
  getCities(callback) {
    if (this.state.cities) {
      return callback(this.state.cities);
    }

    $.get('/account/ajax/areadict', (res) => {
      if (res.code === 200) {
        this.setState({
          cities: JSON.parse(res.data.areaJsonStr),
        }, () => {
          callback(this.state.cities);
        });
      }
    });
  }

  // 选择城区
  handleLocation = () => {
    let model = this.state.model;

    this.setState({
      widget: <Toast icon="loading" message="请稍后" callback={ this.clearWidget } />
    });

    this.getCities((list) => {
      let props = {
        list: list,
        provinceId: model.provinceId,
        cityId: model.cityId,
        areaId: model.areaId,
        onCancel: this.clearWidget,
        onChoose: (data, selected) => {
          // 初始签名 用作对比
          let signing = JSON.stringify(model);
          let [p, c, a] = data;
          model.provinceId = p.id;
          model.provinceName = p.label;
          model.cityId = c.id;
          model.cityName = c.label;
          model.areaId = a.id;
          model.areaName = a.label;

          // 对比签名，是否需要重置社区、组团、房间
          if (signing !== JSON.stringify(model)) {
            // 社区数据
            model.projectId = null;
            model.projectName = null;
            model.street = null;
            // 组团数据
            model.groupId = null;
            model.groupName = null;
            model.groupAddress = null;
            // 房间数据
            model.roomId = null;
            model.roomName = null;
            model.address = null;
            // 重置组团标识
            this.setState({
              hasGroup: 0,
            });
          }
          this.setState({
            model: model,
          }, this.clearWidget);
        },
      };

      this.setState({
        widget: <CityPicker { ...props } />
      });
    });
  }

  // 渲染社区
  renderProject() {
    let model = this.state.model;
    // 这里的判断做例外处理,不判断projectId,因为选择《其他社区》时,projectId是空的
    if (model.projectName) {
      return (
        <div className="item tapable" onClick={ this.handleProject }>
          <span className="label">所属社区</span>
          <div className="text text-right">
            { model.projectName }
            { model.street && <div className="brief">{ model.street }</div> }
          </div>
          <i className="icon text-gray">&#xe61a;</i>
        </div>
      );
    } else {
      return (
        <div className="item tapable" onClick={ this.handleProject }>
          <span className="label">所属社区</span>
          <div className="text text-right text-gray">请选择</div>
          <i className="icon text-gray">&#xe61a;</i>
        </div>
      );
    }
  }

  // 获取社区并缓存，防止每次都查询
  getProjects(callback) {
    let model = this.state.model;
    let projects = this.state.projects || {};
    let key = `${ model.cityId }:${ model.areaId }`;
    if (projects[key]) {
      return callback(projects[key]);
    }
    $.get('/account/ajax/district', {
      cityId: model.cityId,
      areaId: model.areaId,
    }, (res) => {
      if (res.code === 200) {
        projects[key] = res.data.list.map((item) => {
          item.label = item.name;
          return item;
        });
        // 追加其他
        projects[key].push({ id: null, label: '其他社区' });

        this.setState({
          projects: projects,
        }, () => {
          callback(projects[key]);
        });
      }
    });
  }

  // 选择社区
  handleProject = () => {
    let model = this.state.model;

    // 前置条件
    if (!model.provinceId || !model.cityId || !model.areaId) {
      return this.setState({
        widget: <Toast icon="failure" message="请先选择地区" callback={ this.clearWidget } />
      });
    }

    // 加载提示
    this.setState({
      widget: <Toast icon="loading" message="请稍后" callback={ this.clearWidget } />
    });

    // 展示PICKER
    this.getProjects((list) => {
      let props = {
        title: '所属社区',
        groups: [{
          items: list,
        }],
        selected: [model.projectId ? list.findIndex((item) => item.id == model.projectId) : (model.projectName ? list.length - 1 : 0)],
        onCancel: this.clearWidget,
        onChoose: (data, selected) => {
          // 初始签名 用作对比
          let signing = JSON.stringify(model);
          let project = data[0];
          model.projectId = project.id;
          model.projectName = project.label;
          model.street = project.street;

          // 对比签名，是否需要重置组团和房间
          if (signing !== JSON.stringify(model)) {
            // 组团数据
            model.groupId = null;
            model.groupName = null;
            model.groupAddress = null;
            // 房间数据
            model.roomId = null;
            model.roomName = null;
            model.address = null;
          }

          this.setState({
            model: model,
            hasGroup: project.isGroupAddress,
          }, this.clearWidget);
        },
      };

      this.setState({
        widget: <Picker { ...props } />
      });
    });
  }

  // 渲染组团
  renderGroup() {
    let model = this.state.model;
    let groups = this.state.groups;
    // 复盘编辑的组团
    if (model.groupId) {
      return (
        <div className="item tapable" onClick={ this.handleGroups }>
          <span className="label">所属组团</span>
          <div className="text text-right">{ model.groupName }</div>
          <i className="icon text-gray">&#xe61a;</i>
        </div>
      );
    }
    // 选择的社区拥有组团
    else if (this.state.hasGroup) {
      return (
        <div className="item tapable" onClick={ this.handleGroups }>
          <span className="label">所属组团</span>
          <div className="text text-right text-gray">请选择</div>
          <i className="icon text-gray">&#xe61a;</i>
        </div>
      );
    }
    // 既不是编辑 社区也不包含组团 默认不显示
    else {
      return null;
    }
  }

  // 获取组团并缓存，防止每次都查询
  getGroups(callback) {
    let model = this.state.model;
    let groups = this.state.groups || {};
    let key = model.projectId;
    if (groups[key]) {
      return callback(groups[key]);
    }
    $.get('/account/ajax/groups', {
      projectId: model.projectId,
    }, (res) => {
      if (res.code === 200) {
        groups[key] = res.data.list.map((item) => {
          return { id: item.groupId, label: item.groupName, address: item.groupAddress };
        });
        this.setState({
          groups: groups,
        }, () => {
          callback(groups[key]);
        });
      }
    });
  }

  handleGroups = () => {
    let model = this.state.model;

    // 前置条件
    if (!this.state.model.projectId) {
      return this.setState({
        widget: <Toast icon="failure" message="请先选择社区" callback={ this.clearWidget } />
      });
    }

    // 加载提示
    this.setState({
      widget: <Toast icon="loading" message="请稍后" callback={ this.clearWidget } />
    });

    this.getGroups((list) => {
      let props = {
        title: '所属组团',
        groups: [{
          items: list,
        }],
        selected: [model.groupId ? list.findIndex((item) => item.id == model.groupId) : 0],
        onCancel: this.clearWidget,
        onChoose: (data, selected) => {
          let signing = JSON.stringify(model);
          let group = data[0];
          model.groupId = group.id;
          model.groupName = group.label;
          model.groupAddress = group.address;

          // 切换组团, 需要重置房间
          if (signing !== JSON.stringify(model)) {
            model.roomId = null;
            model.roomName = null;
            model.address = null;
          }
          this.setState({
            model: model,
          }, this.clearWidget);
        },
      };

      this.setState({
        widget: <Picker { ...props } />
      });
    });
  }

  // 渲染房屋
  renderHouse() {
    let model = this.state.model;
    // 如果存在projectName，但是不存在projectId，说明选择《其他社区》
    if (!model.projectId && model.projectName) {
      return null;
    }
    // 这里的判断做例外处理,不判断roomId,因为选择《其他房屋》时,roomId是空的
    else if (model.roomName) {
      return (
        <div className="item tapable" onClick={ this.handleHouse }>
          <span className="label">所属房屋</span>
          <div className="text text-right">{ model.roomName }</div>
          <i className="icon text-gray">&#xe61a;</i>
        </div>
      );
    } else {
      return (
        <div className="item tapable" onClick={ this.handleHouse }>
          <span className="label">所属房屋</span>
          <div className="text text-right text-gray">请选择</div>
          <i className="icon text-gray">&#xe61a;</i>
        </div>
      );
    }
  }

  // 获取房间并缓存，防止每次都查询
  getHouses(callback) {
    let model = this.state.model;
    let houses = this.state.houses || {};
    let key = model.projectId;
    if (houses[key]) {
      return callback(houses[key]);
    }

    // 如果包含组团 查询社区当前组团名下房屋
    if (model.groupName) {
      $.get('/house/ajax/bygroup', {
        groupName: model.groupName,
        projectId: model.projectId,
      }, (res) => {
        if (res.code === 200) {
          houses[key] = res.data.list.map((item) => {
            return { id: item.id, label: item.name };
          });
          // 追加其他
          houses[key].push({ id: null, label: '其他房屋' });
          this.setState({
            houses: houses,
          }, () => {
            callback(houses[key]);
          });
        }
      });
    }
    // 不包含组团 直接查询社区名下的房屋
    else {
      $.get('/house/ajax/list', {
        projectId: model.projectId,
      }, (res) => {
        if (res.code === 200) {
          houses[key] = res.data.list.map((item) => {
            return { id: item.room.id, label: item.room.name };
          });
          // 追加其他
          houses[key].push({ id: null, label: '其他房屋' });
          this.setState({
            houses: houses,
          }, () => {
            callback(houses[key]);
          });
        }
      });
    }
  }

  handleHouse = () => {
    let model = this.state.model;

    // 前置条件
    if (!model.projectId) {
      return this.setState({
        widget: <Toast icon="failure" message="请先选择社区" callback={ this.clearWidget } />
      });
    }
    if (this.state.hasGroup && !model.groupId) {
      return this.setState({
        widget: <Toast icon="failure" message="请先选择组团" callback={ this.clearWidget } />
      });
    }

    // 加载提示
    this.setState({
      widget: <Toast icon="loading" message="请稍后" callback={ this.clearWidget } />
    });

    // 展示PICKER
    this.getHouses((list) => {
      let props = {
        title: '所属房屋',
        groups: [{
          items: list,
        }],
        selected: [model.roomId ? list.findIndex((item) => item.id == model.roomId) : (model.roomName ? list.length - 1 : 0)],
        onCancel: this.clearWidget,
        onChoose: (data, selected) => {
          let room = data[0];
          model.roomId = room.id;
          model.roomName = room.label;
          // 选择房屋清空地址
          if (model.roomId) {
            model.address = null;
          }
          this.setState({
            model: model,
          }, this.clearWidget);
        },
      };

      this.setState({
        widget: <Picker { ...props } />
      });
    });
  }

  // 渲染备注
  renderRemark() {
    let model = this.state.model;
    if (model.roomId) {
      return null;
    }
    return (
      <div className="item">
        <div className="text">
          <textarea className="textarea" rows="3" placeholder="请填写详细地址" name="address" maxLength={ 100 } value={ model.address || '' } onChange={ this.setModel }></textarea>
          <div className="textarea-counter"><span>{ (model.address || '').length }</span>/100</div>
        </div>
      </div>
    );
  }

  render() {
    let model = this.state.model;
    return (
      <Page className="address" title={ this.state.title } widget={ this.state.widget }>
        <section className="main has-footer">
          { !model &&
            <div className="loadmore">
              <i className="loading"></i>
              <span className="tips text-gray">正在加载</span>
            </div>
          }

          { model &&
            <div className="noop">
              <div className="list compact overlap">
                <label className="item">
                  <span className="label">姓名</span>
                  <Input className="input" type="text" placeholder="联系人姓名" name="name" value={ model.name || '' } maxLength="20" onChange={ this.setModel } />
                </label>
                <label className="item">
                  <span className="label">手机</span>
                  <Input className="input" type="tel" pattern="[0-9]*" placeholder="联系人手机" name="mobile" value={ model.mobile || '' } maxLength="11" onChange={ this.setModel } />
                </label>
              </div>
              <div className="list">
                { this.renderLocation() }
                { this.renderProject() }
                { this.renderGroup() }
                { this.renderHouse() }
                { this.renderRemark() }
              </div>
            </div>
          }
        </section>

        <Bar component="footer" className="btm-fixed">
          <div className="button-group compact">
            <button className="button driving square" onClick={ this.handleSubmit }>保存地址</button>
          </div>
        </Bar>
      </Page>
    );
  }
};

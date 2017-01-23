/*!
 * 新增地址 编辑地址
 */
import $ from 'webpack-zepto';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import Page from '../../components/page';
import Bar from '../../components/bar';
import Input from '../../components/input';
import Modal from '../../components/modal';
import Toast from '../../components/toast';
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
          this.setState({
            model: res.data.entity,
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

  // 修改数据
  setModel = (e) => {
    this.state.model[e.target.name] = e.target.value;
    this.setState({
      model: this.state.model,
    });
  }

  // 渲染省市区
  getLocation() {
    let model = this.state.model;
    if (model.provinceName) {
      return (
        <div className="text text-ellipsis text-right">
          { model.provinceName }-{ model.cityName }-{ model.areaName || '其他地区' }
        </div>
      );
    } else {
      return (<div className="text text-right text-gray">请选择</div>);
    }
  }

  // 渲染社区
  getProject() {
    let model = this.state.model;
    if (model.projectName) {
      return (
        <div className="text text-right">
          { model.projectName }
          { model.street && <div className="brief">{ model.street }</div> }
        </div>
      );
    } else {
      return (<div className="text text-right text-gray">请选择</div>);
    }
  }

  getHouse() {
    let model = this.state.model;
    if (model.roomName) {
      return (
        <div className="text text-right">
          { model.roomName }
        </div>
      );
    } else {
      return (<div className="text text-right text-gray">请选择</div>);
    }
  }

  // 清空组件
  clearWidget = () => {
    this.setState({ widget: null });
  }

  // 提交数据
  handleSubmit = () => {
    if (!this.state.model.name) {
      return this.setState({
        widget: <Toast icon="failure" message="请填写收货人" callback={ this.clearWidget } />
      });
    }
    if (!/^\d{11}$/.test(this.state.model.mobile)) {
      return this.setState({
        widget: <Toast icon="failure" message="手机号不正确" callback={ this.clearWidget } />
      });
    }
  }

  handleLocation = () => {

    this.setState({
      widget: <Toast icon="loading" message="请稍后" callback={ this.clearWidget } />
    });

    // 待优化
    let fn = () => {
      let list = this.state.list;
      let model = this.state.model;

      let props = {
        list: list,
        provinceId: model.provinceId,
        cityId: model.cityId,
        areaId: model.areaId,
        onCancel: this.clearWidget,
        onChoose: (data, selected) => {
          let [p, c, a] = data;
          model.provinceId = p.id;
          model.provinceName = p.label;
          model.cityId = c.id;
          model.cityName = c.label;
          model.areaId = a.id;
          model.areaName = a.label;
          this.setState({
            model: model,
          }, this.clearWidget);
        },
      };

      this.setState({
        widget: <CityPicker { ...props } />
      });
    };

    // 加载数据
    this.state.list ? fn() : $.get('/account/ajax/areadict', (res) => {
      if (res.code === 200) {
        let list = JSON.parse(res.data.areaJsonStr);
        this.setState({
          list: list,
        }, fn);
      } else {
        this.setState({
          widget: <Toast icon="failure" message="加载失败" callback={ this.clearWidget } />
        });
      }
    });
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
                <div className="item tapable" onClick={ this.handleLocation }>
                  <span className="label">所在地区</span>
                  { this.getLocation() }
                  <i className="icon text-gray">&#xe61a;</i>
                </div>
                <div className="item tapable">
                  <span className="label">所属社区</span>
                  { this.getProject() }
                  <i className="icon text-gray">&#xe61a;</i>
                </div>
                <div className="item tapable">
                  <span className="label">所属房屋</span>
                  { this.getHouse() }
                  <i className="icon text-gray">&#xe61a;</i>
                </div>
                <label className="item">
                  <div className="text">
                    <textarea className="textarea" placeholder="请填写详细地址" maxLength={ 100 } defaultValue={ model.address }></textarea>
                    <div className="textarea-counter"><span>{ (model.address || '').length }</span>/100</div>
                  </div>
                </label>
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

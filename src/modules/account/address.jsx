/*!
 * 新增地址 编辑地址
 */
import $ from 'webpack-zepto';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Page from '../../components/page';
import Bar from '../../components/bar';
import Input from '../../components/input';
import Carousel from '../../components/carousel';
import Filter from '../../support/filter';

export default class Details extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    if (this.props.params.id) {
      this.state = {
        title: '编辑地址',
        address: null,
      };
    } else {
      this.state = {
        title: '新增地址',
        address: {},
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
            address: res.data.entity,
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

  // 渲染省市区
  getLocation() {
    let address = this.state.address;
    if (address.projectName) {
      return (
        <div className="text text-right">
          { address.provinceName }-{ address.cityName }-{ address.areaName || '其他地区' }
        </div>
      );
    } else {
      return (<div className="text text-right text-gray">请选择</div>);
    }
  }

  // 渲染社区
  getProject() {
    let address = this.state.address;
    if (address.projectName) {
      return (
        <div className="text text-right">
          { address.projectName }
          { address.street && <div className="brief">{ address.street }</div> }
        </div>
      );
    } else {
      return (<div className="text text-right text-gray">请选择</div>);
    }
  }

  getHouse() {
    let address = this.state.address;
    if (address.roomName) {
      return (
        <div className="text text-right">
          { address.roomName }
        </div>
      );
    } else {
      return (<div className="text text-right text-gray">请选择</div>);
    }
  }

  render() {
    let address = this.state.address;
    return (
      <Page className="address" title={ this.state.title } widget={ this.state.widget }>
        <section className="main has-footer">
          { !address &&
            <div className="loadmore">
              <i className="loading"></i>
              <span className="tips text-gray">正在加载</span>
            </div>
          }

          { address &&
            <div className="noop">
              <div className="list compact overlap">
                <label className="item">
                  <span className="label">姓名</span>
                  <Input className="input" type="text" placeholder="联系人姓名" defaultValue={ address.name } maxLength="20" />
                </label>
                <label className="item">
                  <span className="label">手机</span>
                  <Input className="input" type="tel" pattern="[0-9]*" placeholder="联系人手机" defaultValue={ address.mobile } maxLength="11" />
                </label>
              </div>
              <div className="list">
                <div className="item tapable">
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
                    <textarea className="textarea" placeholder="请填写详细地址" maxLength={ 100 } defaultValue={ address.address }></textarea>
                    <div className="textarea-counter"><span>{ address.address ? address.address.length : 0 }</span>/100</div>
                  </div>
                </label>
              </div>
            </div>
          }
        </section>

        <Bar component="footer" className="btm-fixed">
          <div className="button-group compact">
            <button className="button driving square">保存地址</button>
          </div>
        </Bar>
      </Page>
    );
  }
};

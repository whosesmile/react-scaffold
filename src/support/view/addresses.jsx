/**
 * 通用选择地址
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Page from '../../components/page';
import Bar from '../../components/bar';
import Loader from '../../components/loader';
import ActionSheet from '../../components/actionsheet';
import Toast from '../../components/toast';
import Modal from '../../components/modal';
import Env from '../../support/env';
import Filter from '../../support/filter';

export default class Addresses extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '选择地址',
      loading: true,
      list: [],
      validList: [],
      invalidList: [],
      prefix: location.pathname.split('/')[1],
      lock: this.props.location.query.lock, // 锁定社区
      next: this.props.location.query.next || '',
      query: {},
    };

    // 防止pathname带参
    let index = this.state.next.indexOf('?');
    if (index !== -1) {
      let next = this.state.next;
      this.state.next = next.substring(0, index);
      let search = next.substring(index + 1);
      let query = search.split('&').map((item) => {
        let pairs = item.split('=');
        return {
          [pairs[0]]: decodeURIComponent(pairs[1]),
        };
      });
      this.state.query = Object.assign(...query);
    }
  }

  // 清空组件
  clearWidget = () => {
    let widget = [].concat(this.state.widget || []);
    widget.pop();
    this.setState({ widget });
  }

  componentDidMount() {
    $.get('/account/ajax/addresses', { _: Date.now() }, (res) => {
      if (res.code === 200) {
        this.setState({
          loading: false,
          list: res.data.list,
        });
        // 是否限定社区
        if (this.state.lock) {
          let list = res.data.list;
          let validList = list.filter((item) => {
            return item.projectId === CF.project.id;
          });
          let invalidList = list.filter((item) => {
            return item.projectId !== CF.project.id;
          });
          this.setState({ validList, invalidList });
        }
      }
    });
  }

  handleDefault = (item) => {
    if (!item.defaultFlag) {
      this.setState({
        widget: <Toast icon="loading" message="请稍后" time={ 10000 } callback={ this.clearWidget } />
      });
      $.post('/account/ajax/default', {
        id: item.id,
      }, (res) => {
        if (res.code === 200) {
          this.setState({
            widget: <Toast icon="success" message="设置成功" callback={ this.clearWidget } />,
            list: this.state.list.map((x) => {
              x.defaultFlag = x === item ? 1 : 0;
              return x;
            }),
          });
        } else {
          this.setState({
            widget: <Toast icon="failure" message="设置失败" callback={ this.clearWidget } />
          });
        }
      });
    }
  }

  handleDelete = (address) => {
    // ActionSheet Demo
    const props = {
      title: '警告',
      message: '您确认要删除这条记录吗？',
      buttons: [
        [{
          text: '删除',
          className: 'text-warning',
          onClick: () => {
            this.setState({
              widget: <Toast icon="loading" message="请稍后" time={ 10000 } />
            });
            $.ajax({
              url: '/account/ajax/address',
              type: 'delete',
              data: { id: address.id },
              success: (res) => {
                if (res.code === 200) {
                  let list = this.state.list;
                  list.splice(list.indexOf(address), 1)
                  this.setState({
                    list: list,
                    widget: <Toast icon="success" message="删除成功" callback={ this.clearWidget } />
                  });
                }
              },
            });
          },
        }],
        [{
          text: '取消',
          className: 'text-gray',
          onClick: this.clearWidget,
        }]
      ]
    };

    this.setState({
      widget: <ActionSheet { ...props } />
    });
  }

  showMessage(item) {
    // Modal
    const props = {
      title: '温馨提示',
      message: <div>当前服务仅在 <span className="text-driving">{ CF.project.name }</span> 提供支持，您可以重新编辑地址</div>,
      buttons: [{
        text: '取消',
        onClick: this.clearWidget,
      }, {
        text: '编辑',
        onClick: () => {
          this.props.router.push(`/${ this.state.prefix }/address/${ item.id }`);
        },
      }]
    };

    this.setState({
      widget: <Modal { ...props } />
    });
  }

  renderAddress() {

    let renderItem = (item, idx, valid) => {
      return (
        <div key={ idx} className="list">
          { valid &&
            <Link is class="item" ui-mode="15px" to={ {pathname: this.state.next || `/${ this.state.prefix }/address/${ item.id }`, query: {...this.state.query, addressId: item.id}, state: {address: item}} }>
              <i className="icon text-xl text-darkgray">&#xe60d;</i>
              <div className="text">
                <p className="text-justify text-md">
                  <span>{ item.name }</span>
                  <span className="value text-right">{ item.mobile }</span>
                </p>
                <div className="brief">{ item.addressStr }</div>
              </div>
              <i className="icon">&#xe61a;</i>
            </Link>
          }
          { !valid &&
            <div is class="item" ui-mode="15px" onClick={ this.showMessage.bind(this, item) }>
              <i className="icon text-xl text-darkgray">&#xe60d;</i>
              <div className="text">
                <p className="text-justify text-md">
                  <span>{ item.name }</span>
                  <span className="value text-right">{ item.mobile }</span>
                </p>
                <div className="brief">{ item.addressStr }</div>
              </div>
            </div>
          }
          <div className="item">
            <label className="text text-sm text-darkgray">
              <input className="checkbox" type="radio" name="defaultFlag" checked={ item.defaultFlag } onChange={ this.handleDefault.bind(this, item) } />设为默认
            </label>
            <div className="extra">
              <div className="button-group">
                <Link className="button default sm" to={ `/${ this.state.prefix }/address/${ item.id }` }><i className="icon">&#xe627;</i>编辑</Link>
                <a className="button default sm"  disabled={ item.defaultFlag } onClick={ this.handleDelete.bind(this, item) }><i className="icon">&#xe629;</i>删除</a>
              </div>
            </div>
          </div>
        </div>
      );
    };

    if (this.state.lock) {
      return (
        <div className="">
          { this.state.validList.map(renderItem) }
          {
            this.state.invalidList.length > 0 &&
            <div is class="divider text-gray" ui-mode="20%">以下地址不在服务范围内</div>
          }
          {
            this.state.invalidList.map((item, idx) => {
              return renderItem(item, idx, false);
            })
          }
        </div>
      );
    } else {
      return this.state.list.map(renderItem);
    }
  }

  render() {
    let wallet = this.state.wallet;
    return (
      <Page className="addresses" title={ this.state.title } widget={ this.state.widget }>
        {/* main */}
        <section className="main has-footer">
          <div className="content" >

            {/* 正在加载 */}
            { this.state.loading &&
              <div className="loadmore">
                <i className="loading"></i>
                <span className="tips text-gray">正在加载</span>
              </div>
            }

            {/* 没有收货地址 */}
            { !this.state.loading && this.state.list.length === 0 &&
              <div className="feedback">
                <div className="mark">
                  <img width="220" height="220" src="//img1.qdingnet.com/b70973ae84276a865ae7ae673ea1e318.png" alt="空白" />
                </div>
                <div className="describe">还没有地址，去添加一个吧！</div>
                <div className="vspace hspace">
                  <Link className="button driving" to={ `/${ this.state.prefix }/address` }>新增地址</Link>
                </div>
              </div>
            }

            {/* 没有收货地址 */}
            { !this.state.loading && this.renderAddress() }
          </div>
        </section>

        { this.state.list.length > 0 &&
          <Bar component="footer" className="btm-fixed">
            <div className="button-group compact">
              <Link className="button driving square" to={ `/${ this.state.prefix }/address` }><i className="icon">&#xe62c;</i>新增地址</Link>
            </div>
          </Bar>
        }
      </Page>
    );
  }
};

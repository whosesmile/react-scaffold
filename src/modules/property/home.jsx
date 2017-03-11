import React, { Component, PropTypes } from 'react';
import App from '../../components/app';
import Page from '../../components/page';
import { Link } from 'react-router';
import Swing from '../../components/swing';
import TabView from '../../components/tabview';
import Filter from '../../support/filter';
import Loader from '../../components/loader';
import Toast from '../../components/toast';
import JSBridge from '../../support/bridge';
import Popup, { PopupHeader } from '../../components/popup';
import Bar from '../../components/bar';
import classnames from 'classnames';
import Modal from '../../components/modal';
import Env from '../../support/env';

export default class Home extends Component {
  static contextTypes = {
    dump: PropTypes.object,
    store: PropTypes.object,
  };

  // 清空组件
  clearWidget = () => {
    let widget = [].concat(this.state.widget || []);
    widget.pop();
    this.setState({ widget });
  }

  constructor(props) {
    super(props);
    this.state = {
      title: '物业缴费',
      list1: [],
      list2: [],
      list3: [],
      loading1: true,
      loading2: true,
      loading3: true,
      tabIndex: 1,

      // 房屋接口
      rooms: [],
      room: null,

      // 账单接口
      owners: [],
      metadata: {},
    };
  }

  componentDidMount() {
    let backup = this.context.store.current;
    // 有备份: 通过返回查看页面
    if (backup) {
      this.setState(backup);
    }
    // 没有备份
    else {
      $.get('/property/ajax/rooms', (res) => {
        let list = res.data.list || [];
        // 拥有房屋
        if (list.length > 0) {
          this.setState({
            room: list[0].room,
            rooms: list,
          });
        }
        // 没有房屋
        else {
          this.houseModal();
        }
      });
    }
  }

  // 我的账单
  appendCharge(list, data) {
    this.setState({
      loading1: false,
      list1: this.state.list1.concat(list),
      owners: data.ownerInfos,
      metadata: data,
    });
  }

  // 缴费记录
  appendRecord(list) {
    this.setState({
      loading2: false,
      list2: this.state.list2.concat(list),
    });
  }

  // 房屋账单
  appendHistory(list) {
    this.setState({
      loading3: false,
      list3: this.state.list3.concat(list),
    });
  }

  // 渲染我的账单
  renderCharge() {
    if (!this.state.loading1 && this.state.list1.length == 0) {
      return (
        <div className="feedback">
          <div className="mark">
            <img width="220" height="220" src="//img1.qdingnet.com/b70973ae84276a865ae7ae673ea1e318.png" alt="空白" />
          </div>
          <div className="describe">暂时还没有相关信息哦</div>
        </div>
      );
    }
    return this.state.list1.map((item, idx) => {
      return (
        <div className="list compact" key={idx}>
          <div className="item-divider">{item.year}</div>
          {
            item.billsList.map((bill, index) =>
              <Link key={index} className="item text-md" to={ {pathname: `/property/charge/${ bill.feeDueDate }`, query: {roomId: this.state.room.id, monthstr: bill.feeDueDateStrMonth}} }>
                <div className="text">{bill.feeDueDateStrMonth}</div>
                <div className="text-driving">¥{bill.dueAmount}</div>
                <i className="icon text-gray">&#xe61a;</i>
              </Link>
            )
          }
        </div>
      );
    });
  }

  // 渲染缴费记录
  renderRecords() {
    if (!this.state.loading2 && this.state.list2.length == 0) {
      return (
        <div className="feedback">
          <div className="mark">
            <img width="220" height="220" src="//img1.qdingnet.com/b70973ae84276a865ae7ae673ea1e318.png" alt="空白" />
          </div>
          <div className="describe">暂时还没有相关信息哦</div>
        </div>
      );
    }

    const STATUS = { 101: '待缴', 105: '已缴', 108: '已退款', 200: '已取消' };

    return this.state.list2.map((item, idx) => {
      return (
        <div key={idx} className="list compact">
          <div className="item-divider text-sm">
            <span className="text text-gray">{ Filter.date(Number(item.createAt), 'yyyy-MM-dd hh:mm:ss') }</span>
            <span className="extra">{ STATUS[item.payStatus] || '未知' }</span>
          </div>
            <Link className="item thread" to={ {pathname: `/property/order/${ item.orderCode }`, query: {roomId: this.state.room.id}} }>
              <div className="text">
                <div className="text-justify">
                  <span className="label">时间跨度</span>
                  <span className="value">{item.timeSpan}</span>
                </div>
                <div className="text-justify">
                  <span className="label">待缴金额</span>
                  <span className="value">{Filter.currency(item.totalPrice)}</span>
                </div>
                <div className="text-justify">
                  <span className="label">优惠金额</span>
                  <span className="value">{Filter.currency(item.totalDiscount)}</span>
                </div>
              </div>
              <i className="icon text-gray">&#xe61a;</i>
            </Link>
            <div className="item">
              <div className="text text-sm">
                <span className="text-driving">优惠后应缴：¥{item.totalRealpay}</span>
              </div>
              {item.payStatus != '105' && item.payStatus != '108' &&
                <div className="extra">
                  <button onClick={ this.cancelOrder.bind(this, item)} className="button default sm">取消订单</button>
                </div>
              }
            </div>
        </div>
      )
    })
  }

  // 渲染房屋账单
  renderHistory() {
    if (!this.state.loading3 && this.state.list3.length == 0) {
      return (
        <div className="feedback">
          <div className="mark">
            <img width="220" height="220" src="//img1.qdingnet.com/b70973ae84276a865ae7ae673ea1e318.png" alt="空白" />
          </div>
          <div className="describe">暂时还没有相关信息哦</div>
        </div>
      );
    }

    // 判断是否添加分割线
    let year = null;
    return (
      <div className="list compact">
        {
          this.state.list3.map((item, idx) => {
            let tuple = [];
            if (year !== item.year) {
              year = item.year;
              tuple.push(<div className="item-divider">{item.year}</div>);
            }
            tuple.push(
              <Link key={ idx } className="item" to={ {pathname: `/property/details/${ item.feeDueDate }`, query: {roomId:this.state.room.id, monthstr: item.feeDueDateStrMonth} } }>
                <div className="text text-md">
                  { Filter.currency(item.dueAmount) }
                  <div className="text-sm">{item.feeDueDateStrMonth}</div>
                </div>
                { item.feeStatus == '已缴' &&
                  <div className="extra text-sm">
                    <div className="text-gray">{item.feeStatus}</div>
                  </div>
                }
                { item.feeStatus == '未缴' &&
                  <div className="extra text-sm">
                    <div className="text-driving">
                      { Filter.currency(item.debtsAmount) }
                      <p>{ item.feeStatus }</p>
                    </div>
                  </div>
                }
                <i className="icon">&#xe61a;</i>
              </Link>
            );
            return tuple;
          })
        }
      </div>
    );
  }

  // 立即缴费
  chargeOrder = (e) => {
    $.get('/property/ajax/chargesorder', { roomId: this.state.room.id }, (res) => {
      if (res.code == 200) {
        this.setState({
          widget: null,
        }, () => {
          let data = res.data.entity;
          JSBridge.payment(data.orderCode, data.totalPrice, data.type);
        });
      } else {
        const props = {
          title: '温馨提示',
          message: <section>{ res.data.message || '非常抱歉，操作失败' }</section>,
          buttons: [{
            text: '好的',
            onClick: this.clearWidget,
          }],
        };
        this.setState({
          widget: <Modal { ...props }/>
        });
      }
    })
  }

  // 取消订单
  cancelOrder(order) {
    this.setState({
      widget: <Toast icon="loading" message="请稍后" time={ 10000 } callback={ this.clearWidget } />
    });
    $.get('/property/ajax/cancelorder', { code: order.orderCode }, (res) => {
      if (res.code == 200) {
        let list = this.state.list2;
        list.splice(list.indexOf(order), 1);
        this.setState({
          list2: list,
          widget: <Toast icon="success" message="取消成功" callback={ this.clearWidget } />
        });
      } else {
        this.setState({
          widget: <Toast icon="failure" message="取消失败" callback={ this.clearWidget } />
        });
      }
    })
  }

  // 选择房屋
  chooseRoom = () => {
    this.setState({
      widget: (
        <Popup onClick={ this.clearWidget }>
          <PopupHeader title="请选择" />
          <div className="content">
            <div className="list compact rooms">
              {
                this.state.rooms.map((item, idx)=> {
                  return (
                    <div key={ idx } className="item" onClick={ this.switchRoom.bind(this, item.room) }>
                      <div className="text">{ this.renderRoom(item.room) }</div>
                      <i className="icon">&#xe61a;</i>
                    </div>
                  );
                })
              }
            </div>
            <Bar component="footer">
              <div className="button-group compact">
                <button className="button default square" onClick={ this.bindHouse }><i className="icon">&#xe62c;</i>添加房屋</button>
              </div>
            </Bar>

          </div>
        </Popup>
      ),
    });
  }

  // 切换房屋 重置数据
  switchRoom(room) {
    this.setState({
      widget: null,
    });
    if (room.id != this.state.room.id) {
      this.setState({
        list1: [],
        list2: [],
        list3: [],
        loading1: true,
        loading2: true,
        loading3: true,
        room: room,
        metadata: {},
      });
    }
  }

  // 切换选项卡
  changeTab = (index) => {
    // 重置列表数据 以便重新刷新
    if (this.state.tabIndex !== index) {
      this.setState({
        tabIndex: index,
        list1: [],
        list2: [],
        list3: [],
        loading1: true,
        loading2: true,
        loading3: true,
        metadata: {},
      });
    }
  }

  // 无房屋提示
  houseModal() {
    const props = {
      title: '温馨提示',
      message: <section>您还没有房屋，去绑定房屋？</section>,
      buttons: [{
        text: '取消',
        onClick: () => {
          if (Env.is('app')) {
            JSBridge.close();
          } else {
            history.back();
          }
        },
      }, {
        text: '确定',
        onClick: this.bindHouse,
      }],
    };
    this.setState({
      widget: <Modal { ...props }/>
    });
  }

  // 去绑定房屋
  bindHouse = () => {
    if (Env.is('app')) {
      JSBridge.skmodel(4201);
    } else {
      location.href = '/house';
    }
  }

  // 渲染房屋信息
  renderRoom(room) {
    if (!room) return null;
    if (room.groupName) {
      return `${room.groupName}-${room.buildingName}-${room.name}`;
    } else {
      return `${room.buildingName}-${room.name}`;
    }
  }

  // 渲染业主信息
  renderOwner() {
    if (!this.state.owners || !this.state.owners.length) return '......';
    let owner = this.state.owners[0];
    return `${owner.name}/${owner.mobile}`;
  }

  render() {
    return (
      <Page className="home" title={ this.state.title } widget={ this.state.widget }>
        {/* main */}
        <section className={ classnames('main', {'has-footer': this.state.tabIndex === 1}) }>
          <div className="list compact banner" onClick={ this.chooseRoom }>
            { !this.state.room &&
              <div className="item">
                <div className="text">
                  <div className="loadmore">
                    <i className="loading"></i>
                    <span className="tips text-gray">正在加载</span>
                  </div>
                </div>
              </div>
            }
            { this.state.room &&
              <div className="item">
                <div className="text text-white">
                  <span className="text-md">{ this.renderRoom(this.state.room) }</span>
                  <div className="brief text-ellipsis">
                    <span className="text-white">{ this.renderOwner() }</span>
                    { this.state.owners.length > 1 &&
                      <Link className="hspace text-white text-opacity" to={ {pathname: '/property/owners', state: { owners: this.state.owners, room: this.renderRoom(this.state.room) }} }>[查看全部业主]</Link>
                    }
                  </div>
                </div>
                <i className="icon text-white">&#xe61a;</i>
              </div>
            }
          </div>

          <Swing>
            <div className="navbar underline driving">
              <a className={classnames("item", {"active": this.state.tabIndex == 1})} onClick={e => this.changeTab(1)}>我的账单</a>
              <a className={classnames("item", {"active": this.state.tabIndex == 2})} onClick={e => this.changeTab(2)}>APP缴费记录</a>
              <a className={classnames("item", {"active": this.state.tabIndex == 3})} onClick={e => this.changeTab(3)}>房屋账单</a>
            </div>
          </Swing>

          {/* 我的账单 */}
          { this.state.tabIndex == 1 &&
            <div className="list compact">
              <div is class="item" ui-mode="0px">
                <div className="pleft">
                  <div className="avatar">
                    <img className="pull-left hspace" width="34" height="34" src="//img1.qdingnet.com/03ede176286b83519f4a35d800702d02.png" />
                  </div>
                  <div className="text pull-left">
                    <div className="text-sm">待缴金额合计</div>
                    <h4 className="text-driving text-md">¥ {this.state.metadata.sumDebt || 0}</h4>
                  </div>
                </div>
                <div className="pright">
                  <div className="avatar">
                    <img className="pull-left hspace" width="34" height="34" src="//img1.qdingnet.com/7021080e680d9e832accacef4f407334.png" />
                  </div>
                  <div className="text pull-left">
                    <div className="text-sm">优惠金额</div>
                    <h4 className="text-md">¥ {this.state.metadata.discountAmount || 0}</h4>
                  </div>
                </div>
              </div>
              { this.state.room &&
                <Loader url="/property/ajax/billindex" query={{roomId:this.state.room.id}} page={ Math.floor(this.state.list1.length / 20) + 1 } load={ this.state.list1.length === 0 } callback={ this.appendCharge.bind(this) }>
                  { this.renderCharge() }
                </Loader>
              }
            </div>
          }

          {/* 我的账单:是否有后台信息 */}
          { this.state.tabIndex == 1 && this.state.metadata.canPayFee == 1 &&
            <div className="message">{this.state.metadata.remindMsg}</div>
          }

          {/* 缴费记录 */}
          { this.state.tabIndex == 2 && this.state.room &&
            <Loader url="/property/ajax/feeorders" query={{roomId:this.state.room.id}} page={ Math.floor(this.state.list2.length / 20) + 1 } load={ this.state.list2.length === 0 } callback={ this.appendRecord.bind(this) }>
              { this.renderRecords() }
            </Loader>
          }

          {/* 房屋账单 */}
          { this.state.tabIndex == 3 && this.state.room &&
            <Loader url="/property/ajax/feebymonth" query={{roomId:this.state.room.id}} page={ Math.floor(this.state.list3.length / 20) + 1 }  load={ this.state.list3.length === 0 } callback={ this.appendHistory.bind(this) }>
              { this.renderHistory() }
            </Loader>
          }
        </section>

        {/* 仅我的账单需要 */}
        { this.state.tabIndex === 1 && this.state.list1.length > 0 &&
          <Bar component="footer" className="btm-fixed">
            <div className="button-group compact">
              <button className="button literal square text-left"><span className="text-driving">优惠后应缴:{ Filter.currency(this.state.metadata.shouldPay || 0) }</span></button>
              <button className="button driving square" disabled={ this.state.metadata.canPayFee == 1 } onClick={this.chargeOrder} >立即缴费</button>
            </div>
          </Bar>
        }
      </Page>
    );
  }
};

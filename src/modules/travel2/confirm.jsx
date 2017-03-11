/**
 * 订单确认
 */
import React, { Component, PropTypes } from 'react';
import Page from '../../components/page';
import Bar from '../../components/bar';
import Toast from '../../components/toast';
import TurnLink from '../../components/turnlink';
import Input from '../../components/input';
import JSBridge from '../../support/bridge';
import { Link } from 'react-router';

export default class Confirm extends Component {

  static contextTypes = {
    dump: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      title: '订单确认',
      model: {},
      orderInfo: {},
      passengers: [],
      address: {},
      loaded: false,
      passenger: [],
      peopleType: ""
    };
  }

  // 清空组件
  clearWidget = () => {
    let widget = [].concat(this.state.widget || []);
    widget.pop();
    this.setState({ widget });
  }

  componentDidMount() {
    this.setState({
      hasGoodsList: this.context.dump.hasGoodsList,
      peopleNum: this.context.dump.model,
      passenger: this.context.dump.passenger,
      type: this.context.dump.type
    })

    $.get('/travel2/ajax/getCacheData', { key: this.props.params.id }, (res) => {
      if (res.code === 200) {
        this.state.orderInfo = JSON.parse(res.data.data)
        this.setState({
          orderInfo: this.state.orderInfo,
        });

        var tmpList = [];
        for (var i = 0; i < this.state.orderInfo.skuList.length; i++) {
          var text = this.state.orderInfo.skuList[i].num + this.state.orderInfo.skuList[i].name;
          tmpList.push(text);
        }
        this.state.peopleType = tmpList.join("+");

        this.setState({
          orderInfo: this.state.orderInfo,
          peopleType: this.state.peopleType
        });

        console.log(this.state.peopleType)

        this.request = $.get('/travel2/ajax/detailLine', {
          lineId: this.state.orderInfo.lineId,
        }, (res) => {
          if (res.code === 200) {
            console.log(res.data.entity);
          }
          this.state.loaded = true;
          this.setState({
            goodsInfo: res.data.entity,
            loaded: this.state.loaded
          });

        });

      }
    });

    if (this.props.location.query.addressId) {
      $.get('/account/ajax/address', { id: this.props.location.query.addressId }, (res) => {
        if (res.code === 200) {
          this.setState({
            address: res.data,
          });
        }
      });
    }

  }

  renderspecFilterList() {
    return this.state.orderInfo.specFilter.map((spec, index) => {
      return (
        <div key={index} className="type-ico">{spec}</div>
      )
    })
  }

  renderTravelPeopleList() {

    var skuList = this.state.orderInfo.skuList;
    var skuTmpList = [];
    for (var i = 0; i < skuList.length; i++) {
      for (var j = 0; j < skuList[i].num; j++) {
        var item = {};
        item.name = skuList[i].name;
        item.id = skuList[i].id + (j + 1);
        skuTmpList.push(item);
      }
    }

    console.log(skuTmpList)
    if (this.state.goodsInfo && this.state.goodsInfo.passengerAck != 2) {
      return skuTmpList.map((sku, index) => {

        if (this.state.passenger && this.state.passenger.length > 0) {
          return (
            <TurnLink key={index} is class="item" to={ {pathname:`/travel2/passengers`, query: {num: skuTmpList.length}} } >
            <span className="label">出行人</span>
            <div className="text text-gray">{this.state.passenger[index].contacts.name}</div>
            <i className="icon text-gray">&#xe61a;</i>
          </TurnLink>
          )

        } else {
          return (
            <TurnLink key={index} is class="item" to={ {pathname:`/travel2/passengers`, query: {num: skuTmpList.length}} }  >
            <span className="label">出行人</span>
            <div className="text text-gray">请选择出行人</div>
            <i className="icon text-gray">&#xe61a;</i>
        </TurnLink>
          )
        }

      })

    }

  }

  // 修改数据
  setModel = (e) => {
    this.state.model[e.target.name] = e.target.value;
    this.setState({
      model: this.state.model,
    });
  }

  // 下一步
  renderConfirm = (e) => {
    var data = {};
    data.memberId = CF.member.memberId;
    data.memberAddressId = this.state.address.id
    data.productStartDate = Date.parse(new Date(this.state.orderInfo.selectDay.year + "-" + this.state.orderInfo.selectDay.month + "-" + this.state.orderInfo.selectDay.day));

    data.projectId = CF.project.id
    data.productId = this.state.orderInfo.lineId
    data.orderSource = 0;
    data.userComment = this.state.model.remark;

    data.needPrice = this.state.orderInfo.needPrice;
    // // data.hkMid =
    // // data.hkTaskId =
    data.passengerIdList = [];
    data.skuList = [];
    data.passengerDesc = [];
    for (var i = 0; i < this.state.orderInfo.skuList.length; i++) {
      var item = {};
      item.id = this.state.orderInfo.skuList[i].specPeople;
      item.name = this.state.orderInfo.skuList[i].name;
      item.num = this.state.orderInfo.skuList[i].num;
      data.passengerDesc.push(item);

      var item2 = {};
      item2.skuId = this.state.orderInfo.skuList[i].id;
      item2.num = this.state.orderInfo.skuList[i].num;
      data.skuList.push(item2);
    }

    for (var i = 0; i < this.state.passenger.length; i++) {
      for (var j = 0; j < this.state.passenger[i].cardList.length; j++) {
        if (this.state.passenger[i].cardList[j].cardType == this.state.type) {
          data.passengerIdList.push(this.state.passenger[i].cardList[j].id)
        }
      }
    }

    data.spm = 0;

    console.log(JSON.stringify(data))

    this.request = $.post('/travel2/ajax/saveOrderLine', {
      data: data,
    }, (res) => {
      if (res.code === 200) {
        JSBridge.payment(res.data.entity.orderCode, this.state.orderInfo.needPrice / 100, 'TL');
      } else {
        this.setState({
          widget: <Toast icon="failure" message={ res.data.message || '下单失败' } callback={ this.clearWidget } />
        });
      }
    })

  }

  render() {
    let model = this.state.model;
    let selectDay = this.state.orderInfo.selectDay;

    return (
      <Page className="confirm" title={ this.state.title } widget={ this.state.widget }>
        {/* main */}
        <section className="main has-footer">
          <div className="list">
          {this.state.loaded&&
            <a is class="item" ui-mode="15px">
              <div className="avatar">
                <img width="60" src={this.state.goodsInfo.mainImg} />
              </div>

              <div className="text">
                <h4>{this.state.goodsInfo.title}</h4>
                  <div className="brief">{selectDay.year} -{selectDay.month} -{selectDay.day}</div>
                <div className="brief">
                {this.renderspecFilterList()}
                <div className="type-ico"> {this.state.peopleType}</div>
                </div>
              </div>

            </a>
          }
          </div>
          {this.state.loaded &&
          <div className="list">
            {this.state.address.name &&
               <TurnLink is class="item address " to="/travel2/addresses" >
                  <i className="icon"> &#xe60d;</i>
                  <div className="text text-gray">{this.state.address.name}</div>
                  <div className="extra text-gray">{this.state.address.mobile}</div>

                  <i className="icon text-gray"></i>
                </TurnLink>
            }
            {!this.state.address.name &&
               <TurnLink is class="item address " to="/travel2/addresses" >
                  <i className="icon"> &#xe60d;</i>
                  <div className="text text-gray"> 请选择联系人</div>
                  <i className="icon text-gray"></i>
                </TurnLink>
            }

            {this.state.goodsInfo && this.state.goodsInfo.passengerAck!=2&&
            <div className="item-divider">出行人 </div>
            }

            {this.renderTravelPeopleList()}


          </div>
          }

           {/*
          <div className="list">
              <a className="item" href="javascript:;">
                <div className="text">千丁劵</div>
                <div className="extra">无可用的千丁劵</div>
                <i className="icon"></i>
              </a>
          </div>
          main */}
          <div className="list">
              <a className="item"  >
                <div className="text">总价</div>
                <div className="extra">￥{this.state.orderInfo.needPrice/100}</div>
              </a>
               {/*
              <a className="item"  >
                <div className="text">千丁劵</div>
                <div className="extra">-￥10.00</div>
              </a>
               */}
          </div>
          <div className="list">
            <label className="item">
              <div className="text">
                <Input className="input" type="text" placeholder="备注（可不填）：" name="remark" value={ model.remark || '' }  onChange={ this.setModel }/>
              </div>
            </label>
          </div>
          <div className="tip">请尽快支付，避免被别人抢先哦！</div>
        </section>
          <Bar component="footer" className="btm-fixed">
              <div className="hspace text-sm">应付金额: <span className="text-driving">￥{this.state.orderInfo.needPrice/100}</span></div>
              <div className="text text-right">
              {this.state.goodsInfo && this.state.goodsInfo.passengerAck==0&&
                <button className="button inline driving square" disabled={ !(this.state.address.name &&(this.state.passenger&& this.state.passenger.length > 0 )) } onClick={ this.renderConfirm }>立即支付</button>
              }
              {this.state.goodsInfo && this.state.goodsInfo.passengerAck!=0&&
                <button className="button inline driving square" disabled={ !this.state.address.name } onClick={ this.renderConfirm }>立即支付</button>
              }
              </div>
          </Bar>
      </Page>
    );
  }
};

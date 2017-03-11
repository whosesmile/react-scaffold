/**
 * 订单详情
 */
import React, { Component, PropTypes } from 'react';
import Page from '../../components/page';
import Bar from '../../components/bar';
import JSBridge from '../../support/bridge';
import { Link } from 'react-router';
import Filter from '../../support/filter';
export default class Order extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '订单详情',
      model: null
    };
  }

  // 清空组件
  clearWidget = () => {
    let widget = [].concat(this.state.widget || []);
    widget.pop();
    this.setState({ widget });
  }

  componentDidMount() {
    $.get('/travel2/ajax/orderDetailLine', {
      orderCode: this.props.params.id,
    }, (res) => {
      if (res.code === 200) {
        this.state.model = res.data.entity;
        this.setState({
          model: this.state.model,
        });
      }
    });
  }

  // 渲染规格
  renderTypes() {
    if (this.state.model && this.state.model.orderContactsList) {
      var typsNames = this.state.model.orderContactsList[0].skuPackageName.split("/");
      typsNames.splice(0, 2); //删除数组前固定两个不需要的规格(人群&日期)
      return typsNames.map((item, idx) => {
        return (
          <div key={ idx} className="text-gray">规格名称：{item}</div>
        );
      });
    }
  }

  // 渲染出行人
  renderPassengersList() {
    let cardTypes = { 1: '身份证', 3: '护照' };
    if (this.state.model && this.state.model.orderContactsList && this.state.model.orderContactsList.length > 0) {
      return this.state.model.orderContactsList.map((item, idx) => {
        return (
          <div key={ idx} className="item">
            <span>出行人{idx+1}：</span>
            <div className="text">
              <h4>{item.name || '未知'}</h4>
              <div className="brief">{ cardTypes[item.cardType] || '未知' }：{item.id}</div>
            </div>
          </div>
        );
      });
    }
  }

  toPay = (e) => {
    JSBridge.payment(this.state.model.orderCode, this.state.model.totalRealPrice / 100, 'TL');
  }

  render() {
    let payTypes = { 11: "现金", 21: "pos支付", 22: "交行POS", 31: "支付宝", 41: "微信", 51: "微信", 61: "预存款", 71: "洗车次卡", 81: "预付卡", 101: "保洁预存卡", 121: "积分", 103: "转账", 104: "银行转账", 91: "组合支付", 24: "支付宝-交行扫码付", 25: "微信-交行扫码付", 26: "百度钱包-交行扫码付", 27: "QQ钱包-交行扫码付", 151: "供方现金收款" };
    let orderStatus = { 0: "待处理", 1: "待确认", 2: "待出游", 3: "已完成", 4: "已取消" }
    return (
      <Page className="order" title={ this.state.title } widget={ this.state.widget }>
        {/* main */}
        <section className="main has-footer">


          { !this.state.model &&
            <div className="loadmore">
              <i className="loading"></i>
              <span className="tips text-gray">正在加载</span>
            </div>
          }
          { this.state.model &&


        <div>
          <div className="list compact">
            <a className="item" href="javascript:;">
              <i className="icon"><img className="img-icon" src="//img1.qdingnet.com/8e3701927ca23d773f4c919125170dba.png"></img></i>
              订单状态：
              <div className="text text-driving">{orderStatus[this.state.model.orderStatus]}</div>
            </a>
          </div>


          <div className="list">
            <a className="item address vspace" href="javascript:;">
               <i className="icon"> &#xe60d;</i>
               <div className="text">联系人 : {this.state.model.contactName}</div>
               <div className="text text-right">{this.state.model.contactMobile}</div>
            </a>

            <div className="item">
              <div className="text text-nm">
                <div className="text-gray">商品名称：{this.state.model.title}</div>
                { this.renderTypes() }
                <div className="text-gray">日期：{Filter.date(parseInt(this.state.model.productStartDate), 'yyyy-MM-dd') }</div>
                <div className="text-gray">购买数量：{this.state.model.passengerDesc}</div>
              </div>
            </div>

            <div className="item-divider">
              出行人
            </div>
            { this.renderPassengersList() }
          </div>


          <div className="list">
            <a className="item">
              <div className="text">订单总额</div>
              <div className="extra">￥{this.state.model.totalPrice/100}</div>
            </a>

            <a className="item">
              <div className="text">千丁劵</div>
              <div className="extra">-￥10.00</div>
            </a>
            <a className="item">
              <div className="text">实付金额</div>
              <div className="extra">￥{this.state.model.totalRealPrice/100}</div>
            </a>
          </div>

          <div className="list">
            <div className="item">
              <div className="text">
                <div className="brief">提交订单时间：{ Filter.date(parseInt(this.state.model.createAt), 'yyyy-MM-dd hh:mm:ss') }</div>
                <div className="brief">订单编号：{this.state.model.orderCode}</div>
                <div className="brief">支付方式：{payTypes[this.state.model.payType]}</div>
              </div>
            </div>
          </div>
        </div>

       }
        </section>
        { this.state.model &&
          <Bar component="footer" className="btm-fixed">
              <div className="hspace text-sm">应付金额: <span className="text-driving">￥{this.state.model.totalRealPrice/100}</span></div>
              <div className="text text-right">
                <button className="button inline driving square" onClick={ this.toPay }>去支付</button>
              </div>
          </Bar>
        }

      </Page>
    );
  }
};

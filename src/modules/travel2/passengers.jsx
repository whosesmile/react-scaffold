/**
 * 选择出行人
 */
import React, { Component, PropTypes } from 'react';
import Page from '../../components/page';
import Bar from '../../components/bar';
import Toast from '../../components/toast';
import { Link } from 'react-router';
import Picker from '../../components/picker';
import classnames from 'classnames';
export default class Addresses extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '选择出行人',
      list: [],
      passenger: [],
      prefix: location.pathname.split('/')[1],
      next: this.props.location.query.next || '',
      query: {},
      selectedPassenger: [],
      lightText: null

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

  // 选择证件后回调&& 清空组件
  selectCardAndclearWidget = (item, id) => {

    let widget = [].concat(this.state.widget || []);
    let selectedPassenger = this.state.selectedPassenger
    widget.pop();
    this.state.passenger.push(id);

    for (var i = 0; i < this.state.passenger.length; i++) {
      for (var j = 0; j < this.state.list.length; j++) {
        if (this.state.list[j].contacts.id == this.state.passenger[i]) {
          selectedPassenger.push(this.state.list[j]);
        }
      }
    }

    this.setState({
      passenger: this.state.passenger,
      selectedPassenger: selectedPassenger,
      widget: null
    });

  }

  componentDidMount() {
    this.request = $.get('/travel2/ajax/travelPeopleLine', {
      memberId: CF.member.memberId,
    }, (res) => {
      if (res.code === 200) {

        this.setState({
          list: res.data.list,

        });
      }
    });
  }

  // 选择证件
  handleCard = (list, id) => {
    for (var i = 0; i < list.length; i++) {
      if (list[i].cardType == 1) {
        list[i].typeName = "身份证";
      } else if (list[i].cardType == 3) {
        list[i].typeName = "护照";
      }
    }

    this.setState({
      widget: <Toast icon="loading" message="请稍后" callback={ this.clearWidget } />
    });

    let props = {
      title: '证件类型',
      groups: [{
        items: list,
        label: 'typeName',
      }],

      onCancel: this.clearWidget,
      onChoose: (data, selected) => {
        // 初始签名 用作对比
        let group = data[0];

        var tmpObj = {}
        tmpObj.id = group.id;
        tmpObj.cardType = group.cardType;

        this.state.lightText = group.cardType;

        this.setState({
          lightText: this.state.lightText
        });

        this.selectCardAndclearWidget(tmpObj, id);
      },
    };

    this.setState({
      widget: <Picker { ...props } />
    });
  }

  handlePassenger = (item, idx) => {
    var index = this.state.passenger.indexOf(item.contacts.id);
    if (index == -1) {

      if (item.cardList.length > 1) {

        this.handleCard(item.cardList, item.contacts.id);

      } else {
        this.state.lightText = item.cardList[0].cardType;
        this.state.passenger.push(item.contacts.id);
        for (var i = 0; i < this.state.passenger.length; i++) {
          for (var j = 0; j < this.state.list.length; j++) {
            if (this.state.list[j].contacts.id == this.state.passenger[i]) {
              this.state.selectedPassenger.push(this.state.list[j]);
            }
          }
        }

      }

    } else {
      this.state.passenger.splice(index, 1);
      var tmpList = [];
      for (var i = 0; i < this.state.selectedPassenger.length; i++) {
        if (this.state.selectedPassenger[i].contacts.id != item.contacts.id) {
          tmpList.push(this.state.selectedPassenger[i]);
        }
      }

      this.state.selectedPassenger = tmpList;

    }

    this.setState({
      passenger: this.state.passenger,
      selectedPassenger: this.state.selectedPassenger,
      lightText: this.state.lightText
    });

  }

  // 去重
  unique(arr) {
    var result = []
    for (var i = 0; i < arr.length; i++) {
      if (result.indexOf(arr[i]) == -1) {
        result.push(arr[i])
      }
    }
    return result;
  }

  // 确定
  renderConfirm = (e) => {

    var self = this;

    var selectedPassenger = this.unique(this.state.selectedPassenger)

    if (selectedPassenger.length != this.props.location.query.num) {
      this.setState({
        widget: <Toast icon="failure" message={"请选择"+this.props.location.query.num+"名出行人"} callback={ self.clearWidget } />
      })
    } else {
      this.props.router.push({ pathname: this.state.next, query: { ...this.state.query }, state: { passenger: selectedPassenger, type: this.state.lightText } });

    }

  }

  renderList() {
    let cardTypes = { 1: '身份证', 3: '护照' };
    return this.state.list.map((item, idx) => {
      return (
        <div key={ idx} className="item" >
          <input className="checkbox " type="checkbox"  checked={this.state.passenger.indexOf(item.contacts.id)>-1  } onChange={ this.handlePassenger.bind(this, item, idx) }  />

          <div className="text" onClick={ this.handlePassenger.bind(this, item, idx) }>
            <h4>{item.contacts.name}</h4>
            { item.cardList &&
               item.cardList.map((card, index) =>{
                  return (
                    <div key={index}  className={ classnames('brief', {active: card.cardType == this.state.lightText }) }>{ cardTypes[card.cardType] || '未知' }：{card.cardNo}</div>
                  )
               }
              )
            }
          </div>
          <Link className="icon" to={ '/travel2/passenger/'+item.contacts.id}></Link>
        </div>
      )
    })
  }

  render() {
    return (
      <Page className="addresses" title={ this.state.title } widget={ this.state.widget }>
        {/* main */}
        <section className="main has-footer">
          <div className="list">
              <Link className="item" to={ '/travel2/passenger'}>
                <div className="text text-center text-primary">  <i className="icon text-primary hspace"></i>新增出行人</div>
              </Link>
              <div className="item-divider">
                提示：出境游必须有护照信息
              </div>
              { this.renderList() }
          </div>

        </section>
          <Bar component="footer" className="btm-fixed">
              <div className="button-group compact">
                <button className="button driving square" onClick={ this.renderConfirm }>确认</button>
              </div>
          </Bar>

      </Page>
    );
  }
};

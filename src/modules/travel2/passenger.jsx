/**
 * 新增出行人
 */
import React, { Component, PropTypes } from 'react';
import Page from '../../components/page';
import Bar from '../../components/bar';
import Picker from '../../components/picker';
import Input from '../../components/input';
import Modal from '../../components/modal';
import Toast from '../../components/toast';

export default class Address extends Component {

  constructor(props) {
    super(props);
    if (this.props.params.id) {
      this.state = {
        title: '编辑出行人',
        // 服务器加载
        model: {
          birthdate: {

          },
          expdate: {

          }
        },

      };
    } else {
      this.state = {
        title: '新增出行人',
        // 给个默认值
        model: {
          name: null,
          mobile: null,
          sex: 1,
          birthdate: {

          },
          expdate: {

          }
        },

      };
    }
  }

  stampToymdList(stamp) {
    var tmpDate = new Date(parseInt(stamp)).toLocaleString();
    var tmp = tmpDate.split(" ")[0];
    var list = tmp.split("/");
    return list;
    //返回["1970", "1", "1"]
  }

  // 选择证件后回调&& 清空组件
  selectCardAndclearWidget = (item) => {

    console.log(item)
    let widget = [].concat(this.state.widget || []);
    widget.pop();
    this.setState({ widget });
  }

  componentDidMount() {
    if (this.props.params.id) {
      let model = this.state.model;
      // 加载所选出行人信息
      this.request = $.get('/travel2/ajax/travelPeopleLine', {
        memberId: CF.member.memberId,
      }, (res) => {
        if (res.code === 200) {
          for (var i = 0; i < res.data.list.length; i++) {
            if (res.data.list[i].contacts.id == this.props.params.id) {
              var info = res.data.list[i];
              this.state.model.list = info.cardList;
              this.state.model.name = info.cardList[0].name;
              this.state.model.mobile = info.cardList[0].mobile;

              this.state.model.sex = info.cardList[0].sex;
              this.state.model.lastName = info.cardList[0].familyName;
              this.state.model.firstName = info.cardList[0].givenName;
              this.state.model.cardType = info.cardList[0].cardType;
              this.state.model.idCode = info.cardList[0].cardNo;
              this.state.model.memberContactsId = info.cardList[0].memberContactsId;
              this.state.model.id = info.cardList[0].id;

              var birthdate = this.stampToymdList(info.cardList[0].birthdate);
              var expires = this.stampToymdList(info.cardList[0].expires);

              this.state.model.birthdate.yearId = birthdate[0];
              this.state.model.birthdate.monthId = birthdate[1];
              this.state.model.birthdate.dayId = birthdate[2];
              this.state.model.birthdate.yearName = birthdate[0];
              this.state.model.birthdate.monthName = birthdate[1];
              this.state.model.birthdate.dayName = birthdate[2];

              this.state.model.expdate.yearId = expires[0];
              this.state.model.expdate.monthId = expires[1];
              this.state.model.expdate.dayId = expires[2];
              this.state.model.expdate.yearName = expires[0];
              this.state.model.expdate.monthName = expires[1];
              this.state.model.expdate.dayName = expires[2];

              this.setState({
                model: this.state.model,
              });
            }
          }
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
    let widget = [].concat(this.state.widget || []);
    widget.pop();
    this.setState({ widget });
  }

  // 清空组件  ***修改回调内容***
  clearWidgetAndOther = () => {
    let widget = [].concat(this.state.widget || []);
    widget.pop();
    this.setState({ widget });
    var cardInfo = false;
    let model = this.state.model;
    for (var i = 0; i < model.list.length; i++) {
      if (model.list[i].cardType == model.cardType) {
        cardInfo = true;
        this.state.model.cardType = model.list[i].cardType;
        this.state.model.idCode = model.list[i].cardNo || 0;
        var expires = this.stampToymdList(model.list[i].expires);
        this.state.model.expdate.yearId = expires[0];
        this.state.model.expdate.monthId = expires[1];
        this.state.model.expdate.dayId = expires[2];
        this.state.model.expdate.yearName = expires[0];
        this.state.model.expdate.monthName = expires[1];
        this.state.model.expdate.dayName = expires[2];
        this.state.model.id = model.list[i].id;
      }
    }
    if (!cardInfo) {
      var expires = this.stampToymdList(0);
      this.state.model.idCode = "";
      this.state.model.id = null;
      this.state.model.expdate.yearId = expires[0];
      this.state.model.expdate.monthId = expires[1];
      this.state.model.expdate.dayId = expires[2];
      this.state.model.expdate.yearName = expires[0];
      this.state.model.expdate.monthName = expires[1];
      this.state.model.expdate.dayName = expires[2];
    }
    this.setState({
      model: this.state.model,
    });
  }

  // 修改数据
  setModel = (e) => {
    this.state.model[e.target.name] = e.target.value;
    this.setState({
      model: this.state.model,
    });
  }

  // 渲染证件
  renderCard() {
    let model = this.state.model;
    let cardTypes = { 1: '身份证', 3: '护照' };
    if (model.cardType) {
      return (
        <a className="item" href="javascript:;" onClick={ this.handleCard } >
            <div className="label-text">证件类型:</div>
            <div className="text text-ellipsis text-left">
              { cardTypes[model.cardType] || '未知' }
            </div>
            <i className="icon">&#xe61a;</i>
        </a>
      );
    } else {
      return (
        <a className="item" href="javascript:;" onClick={ this.handleCard } >
            <div className="text">证件类型:</div>
            <i className="icon">&#xe61a;</i>
        </a>
      );
    }

  }

  // 选择证件
  handleCard = () => {
    let model = this.state.model;
    this.setState({
      widget: <Toast icon="loading" message="请稍后" callback={ this.clearWidget } />
    });
    let list = [{ "id": 1, "label": "身份证" }, { "id": 3, "label": "护照" }]
    let props = {
      title: '证件类型',
      groups: [{
        items: list,
      }],
      selected: [model.cardType ? list.findIndex((item) => item.id == model.cardType) : 1],
      onCancel: this.clearWidget,
      onChoose: (data, selected) => {
        // 初始签名 用作对比
        let group = data[0];
        model.cardType = group.id;
        model.cardName = group.label;
        this.setState({
          model: model,
        }, this.clearWidgetAndOther);
      },
    };

    this.setState({
      widget: <Picker { ...props } />
    });
  }

  // 渲染有效期
  renderEndtime() {
    let expdate = this.state.model.expdate;
    if (expdate && expdate.yearId) {
      return (
        <a className="item" href="javascript:;" onClick={ this.handleEndtime } >
            <div className="label-text">有效期至:</div>
            <div className="text text-ellipsis text-left">
              { expdate.yearId } - { expdate.monthId } - { expdate.dayId }
            </div>
            <i className="icon">&#xe61a;</i>
        </a>
      );
    } else {
      return (
        <a className="item" href="javascript:;" onClick={ this.handleEndtime } >
            <div className="text">有效期至:</div>
            <i className="icon">&#xe61a;</i>
        </a>
      );
    }
  }
  // 创建日期数组格式
  makeDate(start, end, text) {
    var list = []
    var maxLength = end - start + 1;
    for (var i = 0; i < maxLength; i++) {
      var item = {};
      item.id = start + i;
      item.label = (start + i) + text;
      list.push(item);
    }
    return list;
  }

  // 选择有效期
  handleEndtime = () => {
    let model = this.state.model;
    this.setState({
      widget: <Toast icon="loading" message="请稍后" callback={ this.clearWidget } />
    });

    let years = this.makeDate(2017, 2026, "年");
    let months = this.makeDate(1, 12, "月");
    let days = this.makeDate(1, 31, "日");

    let props = {
      title: '请选择有效期',
      groups: [{
        items: years,
      }, {
        items: months,
      }, {
        items: days,
      }],
      yearId: model.expdate.yearId,
      monthId: model.expdate.monthId,
      dayId: model.expdate.dayId,
      onCancel: this.clearWidget,
      onChoose: (data, selected) => {
        // 初始签名 用作对比
        let group = data;
        model.expdate.yearId = group[0].id;
        model.expdate.yearName = group[0].label;
        model.expdate.monthId = group[1].id;
        model.expdate.monthName = group[1].label;
        model.expdate.dayId = group[2].id;
        model.expdate.dayName = group[2].label;

        this.setState({
          model: model,
        }, this.clearWidget);
      },
    };

    this.setState({
      widget: <Picker { ...props } />
    });

  }

  // 渲染生日
  renderBirthday() {
    let birthdate = this.state.model.birthdate;
    if (birthdate && birthdate.yearId) {
      return (
        <a className="item" href="javascript:;" onClick={ this.handleBirthday } >
            <div className="label-text">出生日期:</div>
            <div className="text text-ellipsis text-left">
              { birthdate.yearId } - { birthdate.monthId } - { birthdate.dayId }
            </div>
            <i className="icon">&#xe61a;</i>
        </a>
      );
    } else {
      return (
        <a className="item" href="javascript:;" onClick={ this.handleBirthday } >
            <div className="text">出生日期:</div>
            <i className="icon">&#xe61a;</i>
        </a>
      );
    }

  }

  // 选择生日
  handleBirthday = () => {
    let model = this.state.model;
    this.setState({
      widget: <Toast icon="loading" message="请稍后" callback={ this.clearWidget } />
    });

    let years = this.makeDate(1950, 2020, "年");
    let months = this.makeDate(1, 12, "月");
    let days = this.makeDate(1, 31, "日");

    let props = {
      title: '请选择生日',
      yearId: model.birthdate.yearId,
      monthId: model.birthdate.monthId,
      dayId: model.birthdate.dayId,
      groups: [{
        items: years,
      }, {
        items: months,
      }, {
        items: days,
      }],

      onCancel: this.clearWidget,
      onChoose: (data, selected) => {
        // 初始签名 用作对比
        let group = data;

        model.birthdate.yearId = group[0].id;
        model.birthdate.yearName = group[0].label;
        model.birthdate.monthId = group[1].id;
        model.birthdate.monthName = group[1].label;
        model.birthdate.dayId = group[2].id;
        model.birthdate.dayName = group[2].label;
        this.setState({
          model: model,
        }, this.clearWidget);
      },

    };

    this.setState({
      widget: <Picker { ...props } />
    });

  }

  // 修改数据
  setSex = (e) => {
    this.state.model.sex = e.target.value;

    this.setState({
      model: this.state.model,
    });
  }

  // 保存
  renderSave = (e) => {

    // 新建
    let data = {};
    let model = this.state.model;
    data.memberId = CF.member.memberId;
    data.name = model.name;
    data.mobile = model.mobile;
    data.cardType = model.cardType;
    data.cardNo = model.idCode;
    data.expires = Date.parse(new Date(model.expdate.yearId + "-" + model.expdate.monthId + "-" + model.expdate.dayId));
    data.sex = model.sex;
    data.birthdate = Date.parse(new Date(model.birthdate.yearId + "-" + model.birthdate.monthId + "-" + model.birthdate.dayId));
    data.familyName = model.lastName;
    data.givenName = model.firstName;
    console.log(data)

    // 编辑
    if (this.props.params.id) {
      data.memberContactsId = model.memberContactsId;
      data.id = model.id;
      this.request = $.post('/travel2/ajax/editTravelPeople', {
        data: data,
      }, (res) => {
        if (res.code === 200) {
          this.setState({
            widget: <Toast icon="success" message="保存成功" callback={ () => { history.back() } } />
          });
        } else {
          this.setState({
            widget: <Toast icon="failure" message="保存失败" callback={ this.clearWidget } />
          });
        }
      })
    } else {
      // 新建
      this.request = $.post('/travel2/ajax/saveTravelPeople', {
        data: data,
      }, (res) => {
        if (res.code === 200) {
          this.setState({
            widget: <Toast icon="success" message="保存成功" callback={ () => { history.back() } } />
          });
        } else {
          this.setState({
            widget: <Toast icon="failure" message="保存失败" callback={ this.clearWidget } />
          });
        }
      })
    }

  }

  render() {
    let model = this.state.model;
    return (
      <Page className="address" title={ this.state.title } widget={ this.state.widget }>
        {/* main */}
        <section className="main">
          <div className="list text-gray bottom-h">
            <label className="item">
              <span className="label">姓名:</span>
              <div className="text">
              <Input className="input" type="text" placeholder="必填" name="name" value={ model.name || '' } maxLength="20" onChange={ this.setModel } />
              </div>
            </label>
            <label className="item">
              <span className="label">手机号:</span>
              <div className="text">
                <Input className="input" type="tel" pattern="[0-9]*" placeholder="请输入手机号" name="mobile" value={ model.mobile || '' } maxLength="11" onChange={ this.setModel } />
              </div>
            </label>
            <div className="item-divider text-center">
            请确认：您填写的姓名和出行人所持证件一致
            出境游必须填写护照信息
            </div>
            { this.renderCard() }
            <label className="item">
              <span className="label">证件号码:</span>
              <div className="text">
                <Input className="input" type="text" placeholder="必填" name="idCode" value={ model.idCode || '' } maxLength="20" onChange={ this.setModel } />
              </div>
            </label>

            { this.renderEndtime() }

            <label is class="item" ui-mode="0px">
              <span className="label">性别:</span>
              <div className="text">
                <div className="select-arrow">
                  <select className="select" value={model.sex} onChange={ this.setSex }>
                    <option value="1">男</option>
                    <option value="0">女</option>
                  </select>
                </div>
              </div>
            </label>

            { this.renderBirthday() }

            <label className="item">
              <span className="label">姓（拼音）:</span>
              <div className="text">
                <Input className="input" type="text" placeholder="LastName，如HAN" name="lastName" value={ model.lastName || '' } maxLength="20" onChange={ this.setModel } />
              </div>
            </label>
            <label className="item">
              <span className="label">名（拼音）:</span>
              <div className="text">
                <Input className="input" type="text" placeholder="FirstName，如MEIMEI" name="firstName" value={ model.firstName || '' } maxLength="20" onChange={ this.setModel }/>
              </div>
            </label>
          </div>
        </section>
          <Bar component="footer" className="btm-fixed">
              <div className="button-group compact">
                <button className="button driving square" onClick={ this.renderSave }>保存</button>
              </div>
          </Bar>
      </Page>
    );
  }
};

/**
 * 选择日期
 */
import React, { Component, PropTypes } from 'react';
import Page from '../../components/page';
import Bar from '../../components/bar';
import Slot from '../../components/slot';
import MaskLayer from '../../components/masklayer';
import Toast from '../../components/toast';
import classnames from 'classnames';
export default class Calendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '选择日期',
      model: {
        pricediff: 0,
        child: 0,
        bedchild: 0,
        nobedchild: 0,
        man: 0,
        travelday: null
      },
      allMonthDay: null,
      today: {
        y: null,
        m: null,
        d: null
      },
      specList: [],
      similars: null,
      reSimilars: null,
      specFilter: [
        "special1": "",
        "special2": "",
        "special3": "",
        "special4": "",
        "special5": "",
        "special6": "",
        "special7": "",
      ],
      hasGoodsList: [],
      peopleShow: false,
      needPrice: 0,
      selectDay: null,
      loaded: false,
      monthList: [],
      tabIndex: 0

    };
  }

  // 清空组件
  clearWidget = () => {
    let widget = [].concat(this.state.widget || []);
    widget.pop();
    this.setState({ widget });
  }

  handleFilter(filter) {
    this.setState({
      filter: this.state.filter == filter ? null : filter,
    });
  }

  // 计算应付金额
  needPay = () => {
    var hasGoodsList = this.state.hasGoodsList;
    var model = this.state.model;
    this.state.needPrice = 0;
    for (var i = 0; i < hasGoodsList.length; i++) {
      var peopleTypes = { "成人": 'man', "单房差": 'pricediff', "儿童": 'child', "占床儿童": 'bedchild', "不占床儿童": 'nobedchild' };
      this.state.needPrice = this.state.needPrice + hasGoodsList[i].sellPrice * model[peopleTypes[hasGoodsList[i].specPeopleVal]];
    }

    this.setState({
      needPrice: this.state.needPrice,
    });

  }

  // 减少
  handleMinus = (type) => {
    this.state.model[type] = Math.max(0, parseInt(this.state.model[type]) - 1);
    this.setState({
      model: this.state.model,
    }, this.needPay);

  }

  // 增加
  handlePlus = (type) => {
    this.state.model[type] = this.state.model[type] + 1;
    this.setState({
      model: this.state.model,
    }, this.needPay);
  }

  //获取日历
  setDatepicker(y, m) {
    var allMonthDay = {}
    var daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var date = new Date(y, m - 1, 1);
    var year = date.getFullYear();
    var month = date.getMonth();
    // 计算当月1号星期几
    var day = new Date(year, month, 1).getDay();
    // 计算当月有几天
    var days = daysOfMonth[month];
    // 防止闰年
    if (month === 1 && (year % 4 === 0 || (year % 100 === 0 && year % 400 === 0))) {
      days = 29;
    }
    // 跨度几周
    var weeks = [];
    for (var i = 0; i < Math.ceil((days + day) / 7); i++) {
      weeks.push(i);
    }
    // 1号前空格
    var dayList = []
    for (var i = 0; i < day; i++) {
      var item = {};
      dayList.push(item);
    }
    allMonthDay.day = dayList;
    // 1号至月底
    var daysList = []
    for (var i = 0; i < days; i++) {
      var item = {};
      item.month = month + 1;
      item.year = year;
      item.day = i + 1;
      daysList.push(item);
    }
    allMonthDay.days = daysList;
    allMonthDay.weeks = weeks;

    var specDateStart = Date.parse(new Date(year + "-" + (month + 1) + "-" + 1));
    var specDateEnd = Date.parse(new Date(year + "-" + (month + 1) + "-" + days));

    this.request = $.get('/travel2/ajax/skuDateLine', {
      lineId: this.props.params.id,
      specDateStart: specDateStart,
      specDateEnd: specDateEnd
    }, (res) => {
      if (res.code === 200) {
        this.state.loaded = true;
        var list = res.data.list
        for (var i = 0; i < list.length; i++) {
          var tmp = new Date(parseInt(list[i].specDate)).toLocaleString();
          tmp = tmp.split(" ")[0];
          var goodsTime = tmp.split("/");
          if (goodsTime[1] == m) {
            allMonthDay.days[goodsTime[2] - 1].sellPrice = list[i].sellPrice;
          }
        }
        this.setState({
          allMonthDay: allMonthDay,
          loaded: this.state.loaded
        });
      }
    });
  }

  componentDidMount() {
    // 月份数组
    var today = new Date();
    var y = this.state.today.y = today.getFullYear();
    var m = this.state.today.m = today.getMonth() + 1;
    var tmpYear = y;
    var tmpMonth = m;

    for (var i = 0; i < 4; i++) {
      var item = {}
      if ((tmpMonth + i) > 12) {
        if (tmpYear == y) {
          tmpYear++
        }
        item.m = tmpMonth + i - 12;
      } else {
        item.m = tmpMonth + i;
      }
      item.y = tmpYear
      this.state.monthList.push(item);
    }

    this.setState({
      today: this.state.today,
      monthList: this.state.monthList
    });

    this.setDatepicker(y, m);
  }

  componentWillUnmount() {
    if (this.request) {
      this.request.abort();
    }
  }

  // 月份选择
  handleDatepicker = (item, idx) => {
    // 重置所选日期
    this.state.model.travelday = null;

    if (this.state.tabIndex !== idx) {
      this.setState({
        tabIndex: idx,
      });
    }

    this.setState({
      model: this.state.model,
      allMonthDay: null,
      specList: [],
      hasGoodsList: [],
      needPrice: 0
    });

    var y = item.y;
    var m = item.m;
    this.setDatepicker(y, m)
  }

  peopleShow() {
    var specList = this.state.specList;
    if (specList.length == 0) {
      this.state.peopleShow = true;
      this.state.hasGoodsList = this.state.similars;
      this.setState({
        peopleShow: this.state.peopleShow,
        hasGoodsList: this.state.hasGoodsList
      })
    }
  }

  // 选择日期
  handleSetDay = (day) => {
    this.state.selectDay = day;
    this.setState({
      specList: [],
      hasGoodsList: [],
      similars: [],
      selectDay: this.state.selectDay
    })

    var specDate = Date.parse(new Date(this.state.selectDay.year + "-" + this.state.selectDay.month + "-" + this.state.selectDay.day));

    var self = this;
    if (day.sellPrice) {
      var selectTimeStamp = Date.parse(new Date(day.year + "-" + day.month + "-" + day.day));
      var now = Date.parse(new Date());

      if (now > selectTimeStamp) {
        this.setState({
          widget: <Toast icon="failure" message="当日和之前的日期不可选" callback={ self.clearWidget } />
        })
      } else {
        self.state.model.travelday = day.day;
        self.setState({
          model: self.state.model,
        });
        self.request = $.get('/travel2/ajax/skuLine', {
          lineId: this.props.params.id,
          specDate: specDate
        }, (res) => {
          if (res.code === 200) {
            this.setState({
              specList: res.data.specList,
              similars: res.data.list
            }, this.peopleShow)
            //console.log(this.state)
          }
        })
      }

    } else {
      this.setState({
        widget: <Toast icon="failure" message="无行程" callback={ self.clearWidget } />
      })
    }
  }

  // 渲染日历1号之前空格
  renderDatepickerEmpty() {
    if (this.state.allMonthDay && this.state.allMonthDay.day) {
      return this.state.allMonthDay.day.map((item, idx) => {
        return (
          <a key={ idx} className="item">
          <div className="label"></div>
          </a>
        );
      });
    }
  }
  // 渲染日历日期
  renderDatepicker() {
    if (this.state.loaded && this.state.allMonthDay && this.state.allMonthDay.days) {
      return this.state.allMonthDay.days.map((item, idx) => {
        return (
          <a key={ idx}  className={ classnames('item', {active: this.state.model.travelday == item.day }) }  onClick={ this.handleSetDay.bind(this, item) }>
            <div className="label">{item.day} { item.sellPrice && <span>￥{item.sellPrice/100}</span> } </div>
          </a>
        );
      });
    }
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

  checkType(num) {
    // num 已选择类型数
    var specList = this.state.specList;

    var specFilter = this.state.specFilter;
    if (specList.length == num) {
      this.state.peopleShow = true;
      this.setState({
        peopleShow: this.state.peopleShow,
      })
    }

  }

  // 选规格
  handleSelectspec = (e, conf, id) => {
    var similars = this.state.similars;
    var key = "special" + id;
    this.state.specFilter[key] = conf.name;
    this.setState({
      specFilter: this.state.specFilter,
    })
    var tmpSpec = this.state.specFilter;
    var specList = [];
    for (var i = 0; i < tmpSpec.length; i++) {
      var spKey = "special" + i;
      if (tmpSpec[spKey]) {
        specList.push(tmpSpec[spKey]);
      }
    }

    var tmpList = [];
    var hasGoodsList = [];
    for (var g = 0; g < similars.length; g++) {
      similars[g].flag = true;
      for (var j = 0; j < specList.length; j++) {
        if ((similars[g].packageName.indexOf(specList[j]) > -1) && (similars[g].flag)) {
          similars[g].flag = true;
        } else {
          similars[g].flag = false;
        }
        if (similars[g].flag) {
          tmpList.push(similars[g]);
        }
      }
    }
    for (var t = 0; t < tmpList.length; t++) {
      if (tmpList[t].flag == true) {
        hasGoodsList.push(tmpList[t]);
      }
    }
    // 去重
    this.state.hasGoodsList = this.unique(hasGoodsList);

    this.setState({
      hasGoodsList: this.state.hasGoodsList,
    })

    this.checkType(specList.length);

  }

  renderMonthlist() {
    if (this.state.monthList) {
      return this.state.monthList.map((item, idx) => {
        if (idx == 0) {
          return (
            <a key={ idx} className={classnames("item", {"active": this.state.tabIndex == idx})} onClick={ this.handleDatepicker.bind(this, item,idx) }>{item.y}年{item.m}月</a>
          );
        } else {
          return (
            <a key={ idx} className={classnames("item", {"active": this.state.tabIndex == idx})} onClick={ this.handleDatepicker.bind(this, item,idx) }>{item.m}月</a>
          );
        }
      });
    }
  }

  renderTypelist() {
    if (this.state.specList && this.state.specList.length > 0) {
      return this.state.specList.map((item, idx) => {
        return (
          <div key={ idx} className="vspace type-box">
            <div className="vspace hspace">选择{item.name}</div>
              {  item.subConf &&
                  item.subConf.map((conf, index) =>{
                    return (
                      <div key={index} className={ classnames('item', {active: (this.state.specFilter["special" +(idx+1)] == conf.name)}) }  onClick={ this.handleSelectspec.bind(this, item,conf,idx+1) }>
                        <div className="holder text-center">{conf.name}</div>
                      </div>
                    )
                 }
                )
              }
          </div>
        );
      });
    }
  }

  renderPeopleNum() {
    let model = this.state.model;
    return this.state.hasGoodsList.map((item, idx) => {
      var peopleTypes = { "成人": 'man', "单房差": 'pricediff', "儿童": 'child', "占床儿童": 'bedchild', "不占床儿童": 'nobedchild' };
      return (
        <label className="item" key={idx}>
          <span className="label">{item.specPeopleVal}</span>
          <div className="panel text-center">
            <span className="minus" onClick={ this.handleMinus.bind(this, peopleTypes[item.specPeopleVal]) }><i className="icon">&#xe62d;</i></span>
            <input type="text" className="number man text-center" value={ model[peopleTypes[item.specPeopleVal]] || 0 } readOnly="readonly" />
            <span className="plus" onClick={ this.handlePlus.bind(this, peopleTypes[item.specPeopleVal]) }><i className="icon">&#xe62c;</i></span>
          </div>
        </label>
      )
    })
  }

  renderPeopleNumTip() {
    let model = this.state.model;
    return this.state.hasGoodsList.map((item, idx) => {
      var peopleTypes = { "成人": 'man', "单房差": 'pricediff', "儿童": 'child', "占床儿童": 'bedchild', "不占床儿童": 'nobedchild' };
      return (
        <div className="text-gray clear" key={idx}><div className="text pull-left">{item.specPeopleVal}： </div><div className="extra pull-right"><span className="text-driving"> ￥{item.sellPrice*model[peopleTypes[item.specPeopleVal]]/100} </span> x {model[peopleTypes[item.specPeopleVal]]} </div></div>
      )
    })
  }

  // 下一步
  Next = (e) => {
    var data = {}
    data.lineId = this.props.params.id;
    data.selectDay = this.state.selectDay;
    data.needPrice = this.state.needPrice;
    data.specFilter = []
    for (var i = 0; i < 7; i++) {
      var key = "special" + (i + 1);
      if (this.state.specFilter[key] && this.state.specFilter[key] != "") {
        data.specFilter.push(this.state.specFilter[key]);
      }
    }

    var tmpList = [];
    var list = this.state.hasGoodsList;
    for (var i = 0; i < list.length; i++) {
      var peopleTypes = { "成人": 'man', "单房差": 'pricediff', "儿童": 'child', "占床儿童": 'bedchild', "不占床儿童": 'nobedchild' };
      if (this.state.model[peopleTypes[list[i].specPeopleVal]] > 0) {
        var item = {};
        item.name = list[i].specPeopleVal;
        item.id = list[i].skuId;
        item.specPeople = list[i].specPeople;
        item.specPeopleVal = list[i].specPeopleVal;
        item.num = this.state.model[peopleTypes[item.name]];
        tmpList.push(item);
      }

    }

    data.skuList = tmpList;

    this.request = $.post('/travel2/ajax/cacheOrder', {
      data: JSON.stringify(data),
    }, (res) => {
      if (res.code === 200) {
        this.props.router.push({ pathname: '/travel2/confirm/' + res.data.key });
      }
    })

  }

  render() {
    let model = this.state.model;
    return (
      <Page className="calendar" title={ this.state.title } widget={ this.state.widget }>
        {/* main */}
        <section className="main has-footer">

          <div className="calendar-box">
            <div className="navbar underline driving month" ref="month">
              {this.renderMonthlist()}
            </div>

            <div className="week">
              <a className="item">
                <div className="label">日</div>
              </a>
              <a className="item">
                <div className="label">一</div>
              </a>
              <a className="item">
                <div className="label">二</div>
              </a>
              <a className="item">
                <div className="label">三</div>
              </a>
              <a className="item">
                <div className="label">四</div>
              </a>
              <a className="item">
                <div className="label">五</div>
              </a>
              <a className="item">
                <div className="label">六</div>
              </a>
            </div>

            { this.state.allMonthDay &&
            <div className="date" >
            { this.renderDatepickerEmpty() }
            { this.renderDatepicker() }
            </div>
            }
            { !this.state.allMonthDay &&
            <div className="loadmore">
              <i className="loading"></i>
              <span className="tips text-gray">正在加载</span>
            </div>
            }
          </div>


          {this.renderTypelist()}


          { this.state.peopleShow && this.state.hasGoodsList.length > 0 &&
            <div className="list people">
                <div className=" people-title hspace"><img  src="//img1.qdingnet.com/19534549ab94cc99314458c15a01ad58.png"></img>选择数量</div>
                {this.renderPeopleNum()}
            </div>
          }

          <div className={ classnames('info-detail','before-mask', {active: this.state.filter}) } >
            <div className="item">
              <div className="text text-nm">
              {this.renderPeopleNumTip()}
              </div>
            </div>
          </div>

          <Slot>
            { this.state.filter &&
              <MaskLayer show={ true } className="reduce" onClick={ this.handleFilter.bind(this, null) } />
             }
          </Slot>

        </section>
          <Bar component="footer" className="btm-fixed before-mask">
            <div className="hspace text-sm">应付金额: <span className="text-driving">￥{this.state.needPrice/100}</span></div>
            { this.state.peopleShow && this.state.hasGoodsList.length > 0 &&
              <div  className={ classnames('more-info', {active: this.state.filter}) } onClick={ this.handleFilter.bind(this, 'type') }>
              <img src="//img1.qdingnet.com/fababa972fb106e0a2d041d0d26eb766.png"></img>
              </div>
            }
            <div className="text text-right">
            {this.state.needPrice > 0 &&
              <button className="button inline driving square" onClick={ this.Next }>下一步</button>
            }
            {this.state.needPrice == 0 &&
              <button className="button inline default square disabled">下一步</button>
            }
            </div>
          </Bar>
      </Page>
    );
  }
};

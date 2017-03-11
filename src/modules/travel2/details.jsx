/**
 * 商品详情
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import Page from '../../components/page';
import Bar from '../../components/bar';
import Swing from '../../components/swing';
import Toast from '../../components/toast';
import { scrollToY } from '../../support/util';

export default class Details extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: this.props.location.query.name || '线路详情',
      tabs: [1, 2, 3, 4],
      goods: null,
      tabIndex: 0,
      Safeguard: false,

    };
  }

  // 清空组件
  clearWidget = () => {
    let widget = [].concat(this.state.widget || []);
    widget.pop();
    this.setState({ widget });
  }

  componentDidMount() {
    $.get('/travel2/ajax/detailLine', {
      lineId: this.props.params.id,
    }, (res) => {
      if (res.code === 200) {
        this.setState({
          goods: res.data.entity,
        }, () => {
          $(window).on('scroll.travel', this.handleScroll);
        });
      }
    });
  }

  componentWillUnmount() {
    // 重要
    $(window).off('scroll.travel');
  }

  handleSafeguard() {
    this.setState({
      Safeguard: this.state.Safeguard == true ? false : true,
    });
  }

  handleTab(item, index) {
    this.setState({
      tabIndex: index,
    });
    let end = Math.ceil($(this.refs[`panel_${ index }`]).offset().top - 54);
    scrollToY(end, this.handleScroll);
  }

  handleScroll = () => {
    let scrollY = window.scrollY;
    for (let i = this.state.tabs.length - 1; i >= 0; i--) {
      let offset = $(this.refs[`panel_${ i }`]).offset().top - 54;
      // if (scrollY >= offset) {
      //   this.setState({
      //     tabIndex: i,
      //   });
      //   break;
      // }
    }
  }

  handleMeiqia = () => {
    this.setState({
      widget: <Toast icon="warning" message="TODO" callback={ this.clearWidget } />
    });
  }

  renderSafeguardList() {
    if (this.state.goods && this.state.goods.productSafeguardList && this.state.goods.productSafeguardList.length > 3) {
      return this.state.goods.productSafeguardList.map((item, idx) => {
        return (
          <div key={ idx} className="safeguard">
             <span>{item.clauseName}</span>
             <p className="hspace vspace">{item.clauseDetail}</p>
            </div>
        );
      });
    }
  }

  render() {
    return (
      <Page className="details" title={ this.state.title } widget={ this.state.widget }>
        {/* main */}
        <section className="main has-footer">
          { !this.state.goods &&
            <div className="loadmore">
              <i className="loading"></i>
              <span className="tips text-gray">正在加载</span>
            </div>
          }
          { this.state.goods &&
            <div className="noop">
              <div className="card">
                <div className="banner autofix">
                  <img src={this.state.goods.mainImg } />
                  <span className="from">{ this.state.goods.travel }</span>
                </div>

                <div className="information">
                  { this.state.goods.title }
                  <p className="text-sm text-gray">{ this.state.goods.subTitle }</p>
                  <div className="price text-red">
                    <div className="text text-xl">
                      ￥{ this.state.goods.lowestPrice }
                      <span className="text-xs">起/{ this.state.goods.priceUnit }</span>
                    </div>
                    <div className="text-sm text-gray">
                      已售{ this.state.goods.soldProduct }笔
                    </div>
                  </div>
                </div>
              </div>

              <div className="list compact safety">
                <a className="item text-gray text-sm">
                  { this.state.goods.productSafeguardList.map((item, index) =>{
                    if(index >2){
                     return ;
                    }else{
                       return(
                        <div key={index} className="text text-center">
                          <i className="icon text-green">&#xe696;</i>
                          <span is class="hspace" ui-mode="10px">{ item.clauseName }</span>
                        </div>
                      );
                    }
                    })
                  }
                  { this.state.goods.productSafeguardList.length > 3 &&
                   <i className="icon text-gray" onClick={ this.handleSafeguard.bind(this) }>&#xe61a;</i>
                  }
                </a>
              </div>

              <Swing>
                <div className="navbar underline driving">
                  { this.state.tabs.map((item, idx) => {
                      return (
                        <a key={ idx } className={ classnames('item', {active: idx === this.state.tabIndex}) } onClick={ this.handleTab.bind(this, item, idx) }>{ this.state.goods[`modelName${ idx + 1 }`] }</a>
                      )
                    })
                  }
                </div>
              </Swing>

              <div className="panel">
                <article className="article">
                  <h2>产品概要</h2>
                  <div className="text-control">
                    <span className="label">产品编号</span>
                    <span className="value">{ this.state.goods.id }</span>
                  </div>
                  <div className="text-control">
                    <span className="label">出发城市</span>
                    <span className="value">{ this.state.goods.cityName }</span>
                  </div>
                  <div className="text-control">
                    <span className="label">地点</span>
                    <span className="value">{ this.state.goods.address }</span>
                  </div>
                  <div className="text-control">
                    <span className="label">出游天数</span>
                    <span className="value">{ this.state.goods.daysNights }</span>
                  </div>
                  <div className="text-control">
                    <span className="label">交通方式</span>
                    <span className="value">{ this.state.goods.transport }</span>
                  </div>
                  <div className="text-control">
                    <span className="label">住宿标准</span>
                    <span className="value">{ this.state.goods.accommodation }</span>
                  </div>
                  <div className="text-control">
                    <span className="label">适合人群</span>
                    <span className="value">{ this.state.goods.suitableFor }</span>
                  </div>
                </article>
              </div>

              { this.state.tabs.map((item, idx) => {
                  return (
                    <div ref={ `panel_${ idx }` } key={ idx } className="panel">
                      <article className="article">
                        <h2 className="text-driving">
                          { this.state.goods[`modelName${ idx + 1 }`] }
                        </h2>
                        <div dangerouslySetInnerHTML={ {__html: this.state.goods[`model${ idx + 1 }`]} }></div>
                      </article>
                    </div>
                  )
                })
              }

              {
              /*
                // <img src="//img1.qdingnet.com/3b298212cdb6624eb87e1c877dca7d90.png" alt="" />
                // <img src="//img1.qdingnet.com/f92c825bfc366d59b0911a337aa0be13.png" alt="" />
                // <img src="//img1.qdingnet.com/d7d6d058659023068088aa30c0dae4d7.png" alt="" />
                // <img src="//img1.qdingnet.com/f6a1d3b6fa3ce9a377ade8152f0010a5.png" alt="" />
              */
              }
            </div>
          }
        </section>

        { this.state.goods &&
          <Bar component="footer" className="btm-fixed">
            <div className="button-group compact">
              <button className="button default square text-warning ucenter" onClick={ this.handleMeiqia }><img width="24" src="//img1.qdingnet.com/c670983808f940607e66aefe74512773.png" alt="" />在线客服</button>
              <Link className="button driving square" to={ `/travel2/calendar/${this.props.params.id}` }>立即购买</Link>
            </div>
          </Bar>
        }
        { this.state.Safeguard &&
        <div className="cover">
          <div className="title hspace vspace text-center">服务保障细则</div>
          <div className="safeguards hspace">
            {this.renderSafeguardList()}
          </div>
          <img onClick={ this.handleSafeguard.bind(this) } src="//img1.qdingnet.com/cb151ac5d3d41305dca6c1364784c853.png" />
        </div>
        }
      </Page>
    );
  }
};

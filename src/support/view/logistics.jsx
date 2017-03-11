/**
 * 状态追踪
 */
import React, { Component, PropTypes } from 'react';
import Page from '../../components/page';
import Filter from '../../support/filter';

export default class Logistics extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '状态追踪',
      loading: true,
    };
  }

  componentDidMount() {
    this.request = $.get('/shopping/ajax/logistics', {
      id: this.props.params.id,
    }, (res) => {
      if (res.code === 200) {
        this.setState({
          loading: false,
          data: res.data,
        });
      } else {
        this.setState({
          loading: false,
        });
      }
    });
  }

  componentWillUnmount() {
    if (this.request) {
      this.request.abort();
    }
  }

  render() {
    return (
      <Page className="logistics" title={ this.state.title }>
        {/* main */}
        <section className="main">
          { this.state.loading &&
            <div className="loadmore">
              <i className="loading"></i>
              <span className="tips text-gray">正在加载</span>
            </div>
          }

          { this.state.data &&
            <div className="noop">
              <div className="list compact overlap">
                <div className="item">
                  <span className="text text-sm">
                    <p>承运来源: { this.state.data.logisticsName }</p>
                    <p>运单编号: { this.state.data.logisticsCode }</p>
                  </span>
                </div>
              </div>
              <div className="list compact text-gray flow">
                {
                  this.state.data.list.map((item, idx) => {
                    return (
                      <div is key={ idx } class="item" ui-mode="0px">
                        <div className="time text-right">
                          <p className="text-xs">{ Filter.date(item.recordTime, 'yyyy-MM-dd') }</p>
                          <p className="text-ts">{ Filter.date(item.recordTime, 'hh:mm') }</p>
                        </div>
                        <div className="text text-sm hspace">{ item.orderStatusContent }</div>
                      </div>
                    );
                  })
                }
              </div>
            </div>
          }
          { !this.state.loading && !this.state.data &&
            <div className="feedback">
              <div className="mark">
                <img width="220" height="220" src="//img1.qdingnet.com/b70973ae84276a865ae7ae673ea1e318.png" alt="空白" />
              </div>
              <h3 className="title">非常抱歉</h3>
              <div className="describe">暂时还没有此订单的物流信息<br />如有疑问，您可以致电 <a className="link" href="tel:4000818181">4000818181</a> 咨询</div>

              <div className="vspace hspace">
                <a className="button default" href="javascript:history.back();">返回</a>
              </div>
            </div>
          }
        </section>
      </Page>
    );
  }
};

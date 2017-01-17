/*!
 * 状态追踪
 */
import $ from 'webpack-zepto';
import React, { Component, PropTypes } from 'react';
import Page from '../../components/page';

export default class Logistics extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      title: '状态追踪',
      loading: true,
    };
  }

  componentDidMount() {
    this.request = $.get('/integral/ajax/logistics', {
      id: this.props.params.id,
    }, (res) => {
      if (res.code === 200) {
        this.setState({
          loading: false,
          data: res.data.entity,
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
                <div className="item" ui-mode="15px">
                  <span className="text text-sm">
                    <p>承运来源: { this.state.data.logisticsName }</p>
                    <p>运单编号: { this.state.data.logisticsCode }</p>
                  </span>
                </div>
              </div>
              <div className="list compact flow">
                {
                  this.state.list.map((item, idx) => {
                    return (
                      <div key={ idx } className="item">
                        <span className="time">
                          <i className="text-xs text-gray">{ item.recordTime }</i>
                          <i className="text-sm">{ item.recordTime }</i>
                        </span>
                        <span className="text text-wrap text-sm">{ item.orderStatusContent }</span>
                      </div>
                    );
                  })
                }
              </div>
            </div>
          }
          { !this.state.loading && !this.state.data &&
            <div class="feedback">
              <div class="mark">
                <img width="220" height="220" src="./images/feedback/1.png" alt="空白" />
              </div>
              <h3 class="title">非常抱歉</h3>
              <div class="describe">暂时还没有此订单的物流信息，请您耐心等待</div>
              <div className="describe">如有疑问，您可以致电 <a className="link" href="tel:4000818181">4000818181</a> 咨询</div>
              <div class="vspace hspace">
                <a class="button default" href="javascript:history.back();">返回订单</a>
              </div>
            </div>
          }
        </section>
      </Page>
    );
  }
};

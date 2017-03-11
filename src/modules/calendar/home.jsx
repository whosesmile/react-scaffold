import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import Page from '../../components/page';
import Toast from '../../components/toast';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '千丁日历',
    };
  }

  // 清空组件
  clearWidget = () => {
    let widget = [].concat(this.state.widget || []);
    widget.pop();
    this.setState({ widget });
  }

  render() {
    return (
      <Page className="home" title={ this.state.title } widget={ this.state.widget }>
        {/* main */}
        <section className="main">

          <div className="bar switcher">
            <a className="menu">
              <img width="16" src="//img1.qdingnet.com/321cad59e847fa546ef251e9c3ca38da.png" />
            </a>
            <h1 className="title"><b>2017年03月</b></h1>
            <a className="menu">
              <img width="16" src="//img1.qdingnet.com/c068d531fe7284f69d57c8f96850de05.png" />
            </a>
          </div>

          <div className="calendar clearfix">
            <div className="weeks text-center text-gray text-sm">
              <div className="item">一</div>
              <div className="item">二</div>
              <div className="item">三</div>
              <div className="item">四</div>
              <div className="item">五</div>
              <div className="item">六</div>
              <div className="item">日</div>
            </div>
            <div className="dates text-center">
              {
                new Array(30).fill(1).map((item, idx) => {
                  return (
                    <div key={ idx } className={ classnames('item', {today: idx==25}) }>
                      <div className="text">
                        <span>{ idx }</span>
                        <p className="text-xs text-gray">初九</p>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>

          <div className="spotlight">
            <div className="banner autofix">
              <img src="//img1.qdingnet.com/cb3e831bfa2a2abdedef525dc6178d45.png" />
              <div className="information">
                <div className="figure">
                  <h3>21</h3>
                  <span>清明节</span>
                </div>
                <div className="text">
                  <h3>今日活动</h3>
                  <p>
                    <a href="">我是第一个活动的标题活动的标题</a>
                    <i className="icon">&#xe61a;</i>
                  </p>
                  <p>
                    <a href="">我是第二个活动的标题活动的标题</a>
                    <i className="icon">&#xe61a;</i>
                  </p>
                  <p>
                    <a href="">我是第三个活动的标题活动的标题</a>
                    <i className="icon">&#xe61a;</i>
                  </p>
                </div>
              </div>
            </div>
            <div className="describe">
              清明节又叫踏青节，在仲春与暮春之交，也就是冬至后的第108天。是中国传统节日，也是最重要的祭祀节日之一，是祭祖和扫墓的日子。中华民族传统的清明节大约始于周代，距今已有二千五百多年的历史。
            </div>
          </div>
        </section>
      </Page>
    );
  }
};

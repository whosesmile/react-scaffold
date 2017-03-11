import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Page from '../../components/page';
import Toast from '../../components/toast';
import Popup, { PopupHeader } from '../../components/popup';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '测试用例',
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
          <div className="list compact">
            <Link className="item" to="/example/bridge">
              <div className="text">桥接测试</div>
              <i className="icon">&#xe61a;</i>
            </Link>
          </div>
        </section>
      </Page>
    );
  }
};

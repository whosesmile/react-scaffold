/**
 * 兑换失败
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Page from '../../components/page';

export default class Owners extends Component {

  static contextTypes = {
    dump: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      title: '所有业主'
    };

  }

  rendertemp() {
    return this.state.owners && this.state.owners.map(function(item, index) {
      return (
        <div key={index} className="item">
          <span className="text">业主：{item.name} {item.mobile}</span>
        </div>
      )
    })
  }

  componentDidMount() {
    this.setState({
      owners: this.context.dump.owners
    })
  }

  render() {
    return (
      <Page className="owners bgwhite" title={ this.state.title } widget={ this.state.widget }>
        {/* main */}
        <section className="main">
          <div className="list compact">
            <div className="item">
              <span className="text">房屋：{this.context.dump.room}</span>
            </div>
            {this.rendertemp()}
          </div>
        </section>
      </Page>
    );
  }
};

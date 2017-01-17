import React, { Component, PropTypes } from 'react';
import Page from '../../components/page';

export default class Home extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      title: '千丁小区',
    };
  }

  render() {
    return (
      <Page className="home" title={ this.state.title }>
        {/* main */}
        <section className="main">
          TODO
        </section>
      </Page>
    );
  }
};

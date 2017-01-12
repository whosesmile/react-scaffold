/*!
 * 订单详情
 */
import React, { Component, PropTypes } from 'react';
import Page from '../../components/page';

export default class Order extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      title: '订单详情',
    };
  }

  render() {
    return (
      <Page className="order" title={ this.state.title }>
        {/* main */}
        <section className="main">
          { this.props.params.id }
        </section>
      </Page>
    );
  }
};

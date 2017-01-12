/*!
 * 商品详情
 */
import React, { Component, PropTypes } from 'react';
import Page from '../../components/page';

export default class Details extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      title: '商品详情',
    };
  }

  render() {
    return (
      <Page className="details" title={ this.state.title }>
        {/* main */}
        <section className="main">
          { this.props.params.id }
        </section>
      </Page>
    );
  }
};

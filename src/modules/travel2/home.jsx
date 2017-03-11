/**
 * 旅游
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Page from '../../components/page';
import Slot from '../../components/slot';
import MaskLayer from '../../components/masklayer';
import Loader from '../../components/loader';
import classnames from 'classnames';
import LazyImage from '../../components/image';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '旅游',
      list: []
    };
  }

  appendList(list) {
    this.setState({
      list: this.state.list.concat(list),
    });
  }

  renderList() {
    return this.state.list.map((item, idx) => {
      return (
        <Link key={ idx } className="card" to={ {pathname:`/travel2/details/${item.id}`, query: {name: item.title}} }>
          <div className="banner autofix">
            <LazyImage className="center-block" src={ item.mainImg } />
            <span className="from text-ellipsis">{ item.travel }，{ item.startArea }出发</span>
          </div>
          <div className="information">
            { item.title }
            <p className="text-sm text-gray">{ item.subTitle }</p>
            <div className="price text-red">
              <div className="text text-xl">
                ￥{ item.lowestPrice }
                <span className="text-xs">/起</span>
              </div>
            </div>
          </div>
        </Link>
      );
    });
  }

  render() {
    return (
      <Page className="home" title={ this.state.title } widget={ this.state.widget }>
        <section className="main">
          <Loader url="/travel2/ajax/listLine" callback={ this.appendList.bind(this) }>
            { this.renderList() }
          </Loader>
        </section>
      </Page>
    );
  }
};

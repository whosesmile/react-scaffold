/*!
 *我的地址
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Page from '../../components/page';
import Bar from '../../components/bar';
import Loader from '../../components/loader';
import Env from '../../support/env';
import Filter from '../../support/filter';

export default class Addresses extends Component {

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      title: '我的地址',
      list: [],
    };
  }

  appendList = (list) => {
    this.setState({
      list: this.state.list.concat(list),
    });
  }

  renderList() {
    return this.state.list.map((item, idx) => {
      return (
        <div key={ idx} className="list">
          <Link is class="item" ui-mode="15px" to={ `/account/address/${ item.id }` }>
            <i className="icon text-xl text-darkgray">&#xe60d;</i>
            <div className="text">
              <p className="text-justify text-md">
                <span>{ item.name }</span>
                <span className="value text-right">{ item.mobile }</span>
              </p>
              <div className="brief">{ item.addressStr }</div>
            </div>
            <i className="icon">&#xe61a;</i>
          </Link>
          <div className="item thread">
            <label className="text text-sm text-darkgray">
              <input className="checkbox" type="radio" name="radio1" defaultChecked={ item.defaultFlag } />设为默认
            </label>
            <div className="extra">
              <div className="button-group">
                <Link className="button default sm" to={ `/account/address/${ item.id }` }><i className="icon">&#xe627;</i>编辑</Link>
                <a className="button default sm"  disabled={ item.defaultFlag }><i className="icon">&#xe629;</i>删除</a>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    let wallet = this.state.wallet;
    return (
      <Page className="addresses" title={ this.state.title }>
        {/* main */}
        <section className="main has-footer">
          <Loader url="/account/ajax/addresses" callback={ this.appendList } ends={ null }>
            <div className="content" >
              { this.renderList() }
            </div>
          </Loader>
        </section>
        <Bar component="footer" className="btm-fixed">
          <div className="button-group compact">
            <Link className="button driving square" to='/account/address'>新增地址</Link>
          </div>
        </Bar>
      </Page>
    );
  }
};

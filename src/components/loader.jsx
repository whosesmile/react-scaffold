/*!
 * 自动加载
 */
import $ from 'webpack-zepto';
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class Loader extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    page: PropTypes.number,
    size: PropTypes.number,
    load: PropTypes.bool,
  };

  static defaultProps = {
    page: 1,
    size: 20,
    load: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      threshold: 300,
      hasmore: true,
      loading: false,
      count: 0,
      page: this.props.page,
    };
    this.events = ['scroll', 'resize', 'lookup'];

    this.handler = (e) => {
      // CHECK IS HIDDEN
      if (!this.refs.panel.offsetParent) {
        return;
      }
      if (document.body.scrollHeight - document.body.scrollTop - document.documentElement.clientHeight < this.state.threshold) {
        this.loadMore((data) => {
          let callback = this.props.callback || $.noop;
          callback(data);
        });
      }
    };
  }

  loadMore(fn) {
    if (!this.state.hasmore || this.state.loading) {
      return;
    }
    this.setState({
      loading: true,
    });

    this.request = $.get(this.props.url, {
      page: this.state.page,
      size: this.props.size,
    }, (res) => {
      this.setState({
        loading: false,
      });
      if (res.code === 200) {
        this.setState({
          page: this.state.page + 1,
          count: this.state.count + res.data.list.length, // 备份
        });
        fn(res.data.list);
        if (res.data.list.length < this.props.size) {
          this.release();
          this.setState({
            hasmore: false,
          });
        }
      } else {
        fn([]);
        // TODO FAILURE
      }
    });
  }

  release() {
    if (this.request) {
      this.request.abort();
    }
    this.events.forEach((ename) => {
      $(window).off(ename, this.handler);
    });
  }

  componentDidMount() {
    this.events.forEach((ename) => {
      $(window).on(ename, this.handler);
    });

    // 自动加载首页
    if (this.props.load) {
      this.loadMore((data) => {
        let callback = this.props.callback || $.noop;
        callback(data);
      });
    }
    // 如果不需要自动加载并且当前页码是第一页 说明服务器端已经初始化好了 从page:2翻页
    else if (this.state.page === 1) {
      this.setState({
        page: 2,
      });
    }
  }

  componentWillUnmount() {
    this.release();
  }

  renderLoading() {
    if (this.state.loading) {
      return (
        <div className="loadmore">
          <i className="loading"></i>
          <span className="tips text-gray">正在加载</span>
        </div>
      );
    } else if (!this.state.hasmore && this.state.count) {
      return (
        <div is class="divider" ui-mode="30%">已经到底啦</div>
      );
    }
  }

  render() {
    let { className, ...others } = this.props;
    let clazz = classnames('loader', className);
    return (
      <div ref="panel" className={ clazz }>
        { this.props.children }
        { this.renderLoading() }
      </div>
    );
  }
};

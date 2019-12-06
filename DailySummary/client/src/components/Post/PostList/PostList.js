import React, { Component } from 'react';
import { List, message, Spin } from 'antd';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';


const config = require('../../../config');

class PostsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      hasMore: true,
    };
  }

  componentDidMount() {
    this.fetchData(res => {
      this.setState({
        data: res,
      });
    });
  }

  fetchData = () => {
    const year = this.props.match.params.year;
    const month = this.props.match.params.month;
    //const day = this.props.match.params.day;
    let url = config.serverUrl +'/api/posts/';
    url += year !== '' ? year + '/' : '';
    url += month !== '' ? month + '/' : '';
    //url += day == '' ? day + '/' : '';
    
    console.log(url);
    axios.get(url)
    .then((response) => {
      console.log(response);
      this.setState({
        data: response.data,
      });
    })
  };

  handleInfiniteOnLoad = () => {
    let { data } = this.state;
    this.setState({
      loading: true,
    });
    if (data.length > 14) {
      message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    this.fetchData(res => {
      data = data.concat(res);
      this.setState({
        data,
        loading: false,
      });
    });
  };
  
  renderItem = (item) => {
    return (
      <List.Item key={item.postId}>
        <List.Item.Meta title={<a href={"/post/"+item.postId}>{item.createdDt}</a>} className="list-item-wrap" />
        <div>{item.paragraph}</div>
      </List.Item>
    );
  }

  render() {
    return (
      <div className="demo-infinite-container one-list">
        <InfiniteScroll initialLoad={false} pageStart={0} loadMore={this.handleInfiniteOnLoad} hasMore={!this.state.loading && this.state.hasMore} useWindow={false} >
          <List dataSource={this.state.data} renderItem={this.renderItem} >
            {this.state.loading && this.state.hasMore && (
              <div className="demo-loading-container">
                <Spin />
              </div>
              )}
          </List>
        </InfiniteScroll>
      </div>
    );
  }
}

export default PostsList;
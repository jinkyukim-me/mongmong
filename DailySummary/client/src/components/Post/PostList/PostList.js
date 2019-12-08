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
    axios.post(config.serverUrl + "/api/post_list", 
      {
        yyyy: this.props.match.params.year,
        mm: this.props.match.params.month,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`,
        },
      }
    )    
    .then((response) => {
      console.log(response.data);
      this.setState({
        data: response.data.list,
      });
    })
    .catch((error) => {
      console.error(error)
      alert("에러 발생: " + error.message)
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
      <List.Item key={item.userEmail}>
        <List.Item.Meta title={<a href={"/post/"+item.post_id}>{item.created_data_time}</a>} className="list-item-wrap" />
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
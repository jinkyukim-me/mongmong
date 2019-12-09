import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import axios from 'axios';

const config = require('../../../config');

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      visible: false,
    };
  }
  
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    const postId = this.props.match.params.view;
    axios.delete(config.serverUrl +'/api/posts/'+ postId)
    .then((response) => {
      alert("삭제되었습니다!")
      this.setState({
        visible: false,
      });
      this.props.history.goBack()
      })
    .catch((error) => {
      console.error(error)
    })
  }

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  onChange(event) {
    
  }

  componentDidMount = () => {
    axios.post(config.serverUrl + '/api/post_list_day',
      {
        post_id: this.props.match.params.view,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`,
      },
    })    
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
  }

  render() {

    return (
      <div className="one-selected-review">
        <div className="one-selected-date-emo-wrapper flex"  key={this.state.data.post_id}>
          <p className="one-selected-date flex"
            // type="date"           
          >
          {this.state.data.created_data_time}
          </p>
          <div className="one-selected-emotion flex" type="input">
            {this.state.data.strength_of_feeling}
          </div>
        </div>
        <p className="one-selected-textarea"> 
          {this.state.data.paragraph}
        </p>
      
        <div className="one-selected-btnContainer flex">
          <Button type="dashed" onClick={this.showModal} onChange={this.onChange} className="btn btn-delete">삭제</Button>
            <Modal title="Basic Modal" visible={this.state.visible} okType= 'danger' onOk={this.handleOk} onCancel={this.handleCancel} >
              <p>정말 삭제하시겠습니까?</p>
            </Modal>
          <Button type="primary" className="btn btn-submit" >
            목록으로
          </Button>           
        </div>
      </div>
    )
  }
}
export default Review         
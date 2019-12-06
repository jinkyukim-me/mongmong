import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import { Link } from 'react-router-dom'
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
    axios.delete(config.serverUrl +'/api/posts/' + postId)
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
    const postId = this.props.match.params.view;
    axios.get(config.serverUrl + '/api/posts/' + postId)
    .then((response) => {
      console.log(response);
      this.setState({
        data: response.data,
      });
    })
  }

  render() {

    return (
      <div className="one-selected-review">
        <div className="one-selected-date-emo-wrapper flex">
          <p className="one-selected-date flex"
            // type="date"           
          >
          {this.state.data.createdDt}
          </p>
          <div className="one-selected-emotion flex" type="input">
            {this.state.data.affectivity}
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
          
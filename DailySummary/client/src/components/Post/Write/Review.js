import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import axios from 'axios';
import Emotion from './Emotion';
import { faTired, faFrownOpen, faMeh, faSmile, faLaughSquint } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const config = require('../../../config');

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      visible: false,
      emotions: [faTired, faFrownOpen, faMeh, faSmile, faLaughSquint],
    };
  }
  
  showModal = () => {
    this.setState({
      visible: true,
    });    
  };

  rmhandleOk = e => {
    let postId = this.props.match.params.view;
    axios.post(config.serverUrl +'/api/post_remove',
      {
        post_id: postId,
        // post_id: this.props.match.params.view,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`,
      },
    })    
    .then((response) => {
      // alert("삭제되었습니다!")
      this.setState({
        visible: false,
      });
      this.props.history.goBack()
      })
    .catch((error) => {
      console.error(error)
    })
  }

  rmhandleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  btnToList = e => {
    console.log(e)
    this.props.history.goBack()
  }


  componentDidMount = () => {
    axios.post(config.serverUrl + '/api/post',
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
        data: response.data.list[0],
      });
    })
    .catch((error) => {
      console.error(error)
      alert("에러 발생: " + error.message)
    })
  }

  render() { 
    let date = new Date()
    this.date = date.toLocaleString()
    console.log(typeof this.state.emotions[this.state.data.strength_of_feeling]);
    
    
    return (
      <div className="one-selected-review">
        <div className="one-selected-date-emo-wrapper flex"  key={this.state.data.post_id}>
          <p className="one-selected-date flex"
            // type="date"           
          >
          {this.date}
          </p>
          <div className="one-selected-emotion flex" type="input">
            <FontAwesomeIcon icon={this.state.emotions[this.state.data.strength_of_feeling]} className="icon" />
          </div>
        </div>
        <textarea className="one-selected-textarea" value={this.state.data.paragraph} readOnly>
          {/* {this.state.data.paragraph} */}
        </textarea>      
        <div className="one-selected-btnContainer flex">
          <Button type="dashed" onClick={this.showModal} onChange={this.onChange} className="btn btn-delete">삭제</Button>
            <Modal visible={this.state.visible} okType='primary' onOk={this.rmhandleOk} onCancel={this.rmhandleCancel} okText="예" cancelText="아니요">
              <p>정말 삭제하시겠습니까?</p>
            </Modal>
          <Button type="primary" className="btn btn-submit" onClick={this.btnToList} >
            목록으로
          </Button>           
        </div>
      </div>
    )
  }
}
export default Review         
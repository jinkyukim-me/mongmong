import React, { Component } from 'react';
import { Input, Button, Modal } from 'antd';
import LiveClock from './LiveClock';
import Emotion from './Emotion';
import { withRouter } from 'react-router';
import axios from 'axios';

const { TextArea } = Input;
const config = require('../../../config');

class Write extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      visible: false,
      paragraph: "",
      affectivity: "",
    }
    this.paragraphChanged = this.paragraphChanged.bind(this)
    this.selectedEmotion = this.selectedEmotion.bind(this)
  }  
  
  showModal = () => {
    this.setState({
      visible: true,
    });
  };


  handleOk = e => { 
    console.log(this.state)

    axios.post(config.serverUrl + "/api/post_input", {
        paragraph: this.state.paragraph,
        strength_of_feeling: this.state.affectivity,
    }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`,
    }})      
    .then((response) => {       
      axios.post(config.serverUrl + "/api/summary", {
        paragraph: this.state.paragraph,
        strength_of_feeling: Number(this.state.affectivity),
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`,
      }})      
      .then((response) => {       
        this.setState({
          visible: false,
          paragraph: "",
          affectivity: "",     
        })
        const year = '2019'
        const month = '12'
        this.props.history.push('/posts/' + year + '/' + month)       
      })
      .catch((error) => {
        console.error(error)
        alert("에러 발생: " + error.message)
      })
    })
    .catch((error) => {
      console.error(error)
      alert("에러 발생: " + error.message)
    })
  }

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  paragraphChanged(event) {
    this.setState({
      paragraph: event.target.value,
    })
  }

  selectedEmotion(e) {
    this.setState({
      affectivity: e.target.value
    })
  }

  render() {
    const randomTxt = () => {
      const texts = ['기분이 어떠세요?', '오늘은 어땠나요?', '하고 싶은 이야기를 들려주세요.', '오늘은 무슨 일이 있었나요?', '당신의 이야기가 궁금해요.', '마음 속에 어떤 이야기가 있나요?', '소중한 글 잘 보관해 드릴께요.'];
      const num = Math.floor(Math.random() * 7);
      
      return texts[num];
    }
    return (
      <div className="one-post-write">
        <div className="one-liveClock-container">
          <LiveClock />
        </div> 
          <TextArea className="one-textarea" 
            placeholder={randomTxt()}
            value={this.state.paragraph}
            onChange={this.paragraphChanged}  />
        <div className="one-post-btn-container flex">
          <Emotion clickHandler={this.selectedEmotion}/>
          <Button type="primary" onClick={this.showModal} className="btn btn-submit">저장</Button>
          <Modal visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} okText="예" cancelText="아니요">
{/*  리뷰 페이지로 이동 */}
              저장하시겠습니까?
          </Modal>       
        </div>
      </div>
    )
  }
}
export default withRouter(Write) 
// //AI서버와 테스트용

// import React, { Component } from 'react';
// import { Input, Button, Modal } from 'antd';
// import LiveClock from './LiveClock';
// import Emotion from './Emotion';
// import { withRouter } from 'react-router';
// import axios from 'axios';

// const { TextArea } = Input;
// const config = require('../../../config');

// class Write extends Component {
//   constructor(props) {
//     super(props) 

//     this.state = {
//       visible: false,
//       paragraph: "",
//       affectivity: "",
//       keyword: "",
//       onesentence: "",
//     }
//     this.paragraphChanged = this.paragraphChanged.bind(this)
//     this.selectedEmotion = this.selectedEmotion.bind(this)
//   }  
  
//   showModal = () => {
//     this.setState({
//       visible: true,
//     });
//   };

//   handleOk = e => { 
//     axios.post(config.aiServer + "/summary", {
//       // paragraph: this.state.paragraph,
//       // affectivity: this.state.affectivity,
//       text: [this.state.paragraph],
//       emotion: Number(this.state.affectivity),
//     })
//     .then((response) => {       
//       console.log(response) 
//       this.setState({
//         visible: true,
//         // paragraph: "",
//         // affectivity: "",
//         keyword: response.data.keyword,
//         onesentence: response.data.onesentence,       
//       })
//       // this.props.history.push('/posts')       
//     })
//     .catch((error) => {
//       alert("에러 발생: " + error.message)
//       console.error(error)
//     })
//   }

//   handleCancel = e => {
//     console.log(e);
//     this.setState({
//       visible: false,
//     });
//   };

//   paragraphChanged(event) {
//     this.setState({
//       paragraph: event.target.value,
//     })
//   }

//   selectedEmotion(e) {
//     this.setState({
//       affectivity: e.target.value
//     })
//   }

//   render() {

//     return (
//       <div className="one-post-write">
//         <div className="one-liveClock-container">
//           <LiveClock />
//         </div> 
//         <TextArea className="one-textarea" 
//           placeholder="...그래서 오늘은 어땠어?"
//           value={this.state.paragraph}
//           onChange={this.paragraphChanged}  />
//         <div className="one-post-btn-container flex">
//           <Emotion clickHandler={this.selectedEmotion}/>
//           <Button type="primary" onClick={this.handleOk} className="btn btn-submit">저장</Button>
//           <Modal title="글이 완성되었습니다." visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} >
// {/*  리뷰 페이지로 이동 */}
//             {"키워드: " + this.state.keyword + "    \n" +
//              "한줄: " + this.state.onesentence}
//           </Modal>       
//         </div>
//       </div>
//     )
//   }
// }
// export default withRouter(Write) 



// server랑 연결 원본
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
    axios.post(config.serverUrl + "/post_input",
      {
        headers: {token: localStorage.token}
      } , 
      {
        paragraph: this.state.paragraph,
        strength_of_feeling: this.state.affectivity,
      })
     .then((response) => {       
      console.log(this.state)  
      alert("당신의 소중한 하루가 저장되었습니다.")  
      this.setState({
        visible: false,
        paragraph: "",
        affectivity: "",     
      })
      this.props.history.push('/posts')       
    })
    .catch((error) => {
      alert("에러 발생: " + error.message)
      console.error(error)
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

    return (
      <div className="one-post-write">
        <div className="one-liveClock-container">
          <LiveClock />
        </div> 
        <TextArea className="one-textarea" 
          placeholder="...그래서 오늘은 어땠어?"
          value={this.state.paragraph}
          onChange={this.paragraphChanged}  />
        <div className="one-post-btn-container flex">
          <Emotion clickHandler={this.selectedEmotion}/>
          <Button type="primary" onClick={this.showModal} className="btn btn-submit">저장</Button>
          <Modal title="글이 완성되었습니다." visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} >
{/*  리뷰 페이지로 이동 */}
              저장하시겠습니까?
          </Modal>       
        </div>
      </div>
    )
  }
}
export default withRouter(Write) 
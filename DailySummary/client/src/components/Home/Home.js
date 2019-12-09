import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
// import axios from 'axios';
// const { Header, Content } = Layout;


const randomTxt = () => {
  const texts = ['안녕하세요.', '당신의 하루가 궁금해요.', '오늘은 어떤 날이었나요?', '당신의 이야기를 들려주세요.', '오늘은 기분이 어때요?', '어떻게 지내세요?', '뭐든지 들어드릴게요.'];
  const num = Math.floor(Math.random() * 7);
  
  return texts[num];
}

// const randomImg = () => {
//   const num = Math.floor(Math.random() * 3 + 1);
  
//   return num;
// }

class Home extends Component {
  render() {
    return (
      <>  
        <div className="container one-welcome flex flex-center">
          <div className="txt">{randomTxt()}</div>
          {/* <img src={`images/${randomImg()}.jpg`} alt="" className="img position-center" /> */}
          <Link to="/login" className="btn-wrap">
            <Button shape="circle" icon="right-circle" className="btn btn-shortcut" />
          </Link>
        </div>
      </>
    )
  }
}
export default Home;
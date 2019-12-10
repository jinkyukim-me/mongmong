import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import axios from 'axios';

const config = require('../../config');


class Unsubscribe extends Component {

  unsubBtnClick() { 
    axios.get(config.serverUrl + "/api/register_remove", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`,
    }})
    .then((response) => {
      console.log(response.data.message)
      localStorage.removeItem("token");
      alert("다시 또 만날 수 있길 바랍니다. 안녕히 가세요.")
      this.props.history.push('/')
    })
    .catch((error) => {
      alert("잠시만요!" + error.message)
      console.error(error)
    })
  }
  render() {
    return (
      <>
        <div className="one-unsubscribe flex flex-center">
          <div className="container">
            <p className="txt">
              <span className="line-break">몽글을 떠나실 건가요?</span>
              <span className="line-break">지금까지 작성하셨던 글은 모두 삭제됩니다.</span>
              <span className="line-break">추억이 사라진다니 아쉽네요.</span>
              <span className="line-break">앞으로도 행복하세요!</span>
            </p>
            <div className="btn-wrap">
              <Button type="primary" className="btn btn-cancel">
                <Link to="/setting">취소</Link>
              </Button>
              <Button className="btn btn-submit" onClick={this.unsubBtnClick}>
                회원탈퇴                
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Unsubscribe;
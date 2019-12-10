import React, { Component } from 'react'
import axios from 'axios';
import { Layout, Form, Icon, Input, Button } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { LoginContext } from '../../contexts/login';

const config = require('../../config');

class NormalLoginForm extends Component {

  state = {    
    isLogined: localStorage.getItem('token'===!"undefined") ? true : false,
  }
  
//   shouldComponentUpdate(nextProps, nextState){
//     console.log("shouldComponentUpdate: " + JSON.stringify(nextProps) + " " + JSON.stringify(nextState));
//     return true;
// }

  login = (email, password) => {
    axios.post(config.serverUrl + '/api/login', {
      user_email: email,
      user_password: password,
    }).then(res => {
      console.log(res.data)
      console.log(this.state.isLogined)
      localStorage.setItem("token", res.data.token);
      this.setState({
        isLogined: true
      })
      this.props.setIsLogined(true);
      this.props.history.push("/post/write");   
    }).catch((error) => {
      if (error.response) {
        alert(error.response.status + ": " + 
              error.response.data.message);
      } else {
        alert(error);
      }
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(values)
      if (!err) {
        const { mail, password } = values
        this.login(mail, password)
      }   
    });
  };

  

  render() {
  const { getFieldDecorator } = this.props.form
    return (
      <>
      <Layout className="one-login flex flex-center">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item className="one-input one-input-email">
              {getFieldDecorator('mail', {
                rules: [{ required: true, message: '이메일 주소를 입력해주세요!' }],
              })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="이메일" />,
              )}
            </Form.Item>
            <Form.Item className="one-input one-input-pw">
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '비밀번호를 입력해주세요.!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="비밀번호" />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" block>
                로그인
              </Button>
              <div className="shortcut flex">
                <Link to="/signup">회원가입</Link>
              </div>
            </Form.Item>
          </Form>
        </Layout>      
      </>  
    )
  }
}

const WrappedNormalLoginForm = withRouter(Form.create({ name: 'normal_login' })(NormalLoginForm));

const LoginContainer = () => (
    <LoginContext.Consumer>
    {
      ({setIsLogined}) => 
      <WrappedNormalLoginForm setIsLogined={setIsLogined} />
    }
    </LoginContext.Consumer>
);

export default withRouter(LoginContainer);
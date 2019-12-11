import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { Form, Input, Checkbox, Button, } from 'antd';
import axios from 'axios';
const config = require('../../config');
class SignUpForm extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  handleSubmit = e => {
    console.log(e.target);
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      axios.post(config.serverUrl + '/api/register', {
        user_email: values.email,
        user_password: values.password,
        user_confirm_password: values.confirm,
        check: values.agreement,
      })
      .then((response) => {
        alert(`${values.email} 님의 회원가입이 완료되었습니다.`);
        this.props.history.push('/login');
      })
      .catch((error) => {
        // alert(error.response.status + ": " + 
        //       error.response.data.message);
      });        
    });
  };
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };
  // handleWebsiteChange = value => {
  //   let autoCompleteResult;
  //   if (!value) {
  //     autoCompleteResult = [];
  //   } else {
  //     autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
  //   }
  //   this.setState({ autoCompleteResult });
  // };
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit} className="one-signup flex flex-center">
        <Form.Item label="이메일">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: '잘못된 형식의 이메일입니다.',
              },
              {
                required: true,
                message: '이메일을 입력해주세요.',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="비밀번호" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '비밀번호를 입력해주세요.',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="비밀번호 확인" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: '비밀번호가 다릅니다. 다시 확인해주세요.',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout} className="one-checkbox-wrap">
          {getFieldDecorator('agreement', {
            rules: [
              {
                required: true,
                message: '개인정보 제공에 동의해주세요.',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
            valuePropName: 'checked',
          })(
            <Checkbox>
              개인정보 제공에 동의합니다.
            </Checkbox>,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout} className="btn-wrap">
          <Button type="primary" htmlType="submit" className="btn btn-signup">
            가입
          </Button>
          <div className="shortcut flex">
                <Link to="/login">로그인</Link>
          </div>
        </Form.Item>
      </Form>
    );
  }
}
const WrappedSignUpForm = Form.create({ name: 'register' })(SignUpForm);
export default withRouter(WrappedSignUpForm);
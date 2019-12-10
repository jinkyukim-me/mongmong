import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input,  Button  } from 'antd';
import axios from 'axios';

const config = require('../config');

class Settings extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  resetBtnClicked () {
    axios.post(config.serverUrl + '/api/password_reset', 
    {
      user_password: this.state.password,
    },
    {
      headers: {token: localStorage.token},
    }).then(res => {      
      console.log(res.result)
      this.props.history.push("/posts");
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
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
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

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };

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
      <Form {...formItemLayout} onSubmit={this.handleSubmit} className="one-settings flex flex-center">
        <Form.Item label="Password" className="one-input-pw" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '새로운 비밀번호를 입력해 주세요.',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" className="one-input-confirm-pw" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: '다시 한 번 입력해 주세요.',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout} className="btn-wrap flex">
          <Button type="primary" htmlType="submit" className="btn btn-submit" onClick="this.resetBtnClicked">
            변경
          </Button>
          <Button className="btn btn-unsubscribe">
            <Link to="/unsubscribe">
              회원 탈퇴
            </Link>       
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedSettingsForm = Form.create({ name: 'register' })(Settings);

export default WrappedSettingsForm;
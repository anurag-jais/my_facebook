import React, { Component } from 'react';
import * as actionCreators from '../Store/actions/actions';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
} from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment';

class ResetPassword extends Component {

    state = {
        confirmDirty: false,
        isredirecttoHome: false,
      
    };

    


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
               
                values.useremail = this.props.location.state.registeredemail;
                console.log('Received values of form: ', values);
                axios.post('http://localhost:3007/api/login/updatepassword',values)
                    .then(response => {
                        console.log("response data");
                        console.log("======>", response.data);
                        if (response.data === "Password Updated") {
                            this.setState({
                                isredirecttoHome: true
                            });
                        }
                        else{
                            console.log("password not updated!");
                           
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        });
    };



    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('userpassword')) {
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

    render() {
        
        const { Option } = Select;
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
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>,
        );
        return (
            <div >
                <div>
                    {this.state.isredirect === true ? <Redirect to = '/home' /> : null}
                </div>
                <div className="registration_form_container">
                <Form {...formItemLayout} onSubmit={this.handleSubmit} className="registration-form">
                    <Form.Item label="New Password"
                       
                        hasFeedback>
                        {getFieldDecorator('userpassword', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                {
                                    validator: this.validateToNextPassword,
                                },
                                {
                                    min: 8,
                                    message: 'password should at least 8 characters long',
                                }
                            ],
                        })(<Input.Password  />)}
                    </Form.Item>
                    <Form.Item label="Confirm New Password" hasFeedback>
                        {getFieldDecorator('confirm', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                {
                                    validator: this.compareToFirstPassword,
                                },
                            ],
                        })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <a href="/login"><Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        </a>
                    </Form.Item>
                </Form>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {

    };
};
const mapDispatchToProps = dispatch => {
    return {
        registration: (values) => dispatch(actionCreators.registration(values))
        //   login: (values)=> dispatch(actionCreators.login(values))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ResetPassword)); 

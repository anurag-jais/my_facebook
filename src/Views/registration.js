import React, { Component } from 'react';
import * as actionCreators from '../Store/actions/actions';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './registration.css';
import { Layout } from 'antd';
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

class Registration extends Component {

    state = {
        confirmDirty: false,
        isredirect: false,
        isUserNameInvalid: false,
        isUserEmailAlreadyExist: false,
        errUserNameMsg: null,
        validateUserNameStatus: 'success',
        validateEmailStatus: null,
        errEmailMsg: null,
        isPasswordLengthInvalid: false,
        validatePasswordStatus: 'success',
        errPaswordMsg: null,
        registeremail: null
    };


    emailChangeHandler = (e) =>{
        this.setState({
            isUserEmailAlreadyExist: false,
            errMsg: null
        });
    }
    userNameChangeHandler = (e) => {
        //alert("i'm running");
        console.log(e.target.value);
        if (e.target.value.length > 11) {
            console.log("i'm running");
            this.setState({
                isUserNameInvalid: true,
                validateUserNameStatus: 'error',
                errUserNameMsg: 'Username not more than 11 Characters'
            });
            //console.log("username can't be more than 11 characters");
        }
        else {
            axios.get('http://localhost:3007/api/registration/' + e.target.value)
                .then(response => {
                    console.log("input change");
                    console.log(response.data);
                    if (response.data === "Username Already Exist") {
                        this.setState({
                            isUserNameInvalid: true,
                            validateUserNameStatus: 'error',
                            errUserNameMsg: 'Username Already Exist!!!'
                        });
                    }
                    else {
                        this.setState({
                            isUserNameInvalid: false,
                            validateUserNameStatus: 'success',
                            errUserNameMsg: null
                        });
                    }
                })
                .catch(err => {
                    console.log("err/////////>>>>>>>", err);
                });
        }
    };


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                axios.post('http://localhost:3007/api/registration', values)
                    .then(response => {
                        console.log("response data");
                        console.log("======>", response.data);
                        if (response.data === "User Already Exist") {
                            this.setState({
                                isUserEmailAlreadyExist: true,
                                validateEmailStatus: 'error',
                                errEmailMsg: 'Email Already Exist!!!',
                                registeremail: null
                            });

                        }
                        else {
                            this.setState({
                                isUserEmailAlreadyExist: false,
                                validateEmailStatus: 'success',
                                errEmailMsg: null,
                                isredirect: true,
                                registeremail: values.useremail
                            });
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
        const { Header, Footer, Sider, Content } = Layout;

        const dateFormat = 'YYYY/MM/DD';
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
                    {this.state.isredirect === true ? <Redirect to={{
                        pathname: '/verifyregister',
                        state: { registeremail: this.state.registeremail }
                    }} /> : null}
                </div>

                <Layout>
                    <Header className="header">
                        <h2>Create Your Account</h2>
                    </Header>
                    <Content>
                        <div className="registration_form_container">
                            <Form {...formItemLayout} onSubmit={this.handleSubmit} className="registration-form">
                                <Form.Item
                                    label={
                                        <span>
                                            FirstName&nbsp;
                                <Tooltip title="What is your first name?">
                                                <Icon type="question-circle-o" />
                                            </Tooltip>
                                        </span>
                                    }
                                >
                                    {getFieldDecorator('firstname', {
                                        rules: [{ required: true, message: 'Please input your firstname!', whitespace: true }],
                                    })(<Input />)}
                                </Form.Item>
                                <Form.Item
                                    label={
                                        <span>
                                            LastName&nbsp;
                                <Tooltip title="What is your Last name?">
                                                <Icon type="question-circle-o" />
                                            </Tooltip>
                                        </span>
                                    }
                                >
                                    {getFieldDecorator('lastname', {
                                        rules: [{ message: 'Please input your lastname!', whitespace: true }],
                                    })(<Input />)}
                                </Form.Item>

                                {this.state.isUserEmailAlreadyExist === true ? <div className="errMsg">{this.state.errEmailMsg}</div> : null}
                                <Form.Item label={
                                    <span>Email&nbsp;
                                    </span>
                                }
                                >    
                                    {getFieldDecorator('useremail', {
                                        rules: [
                                            {
                                                type: 'email',
                                                message: 'The input is not valid E-mail!',
                                            },
                                            {
                                                required: true,
                                                message: 'Please input your E-mail!',
                                            }
                                        ],
                                    })(<Input onChange={this.emailChangeHandler}/>)}

                                </Form.Item>
                                {this.state.isUserNameInvalid === true ? <div class="errMsg">{this.state.errUserNameMsg}</div> : null}
                                <Form.Item
                                    label={
                                        <span>
                                            Username&nbsp;
                                <Tooltip title="What do you want others to call you?">
                                                <Icon type="question-circle-o" />
                                            </Tooltip>
                                        </span>
                                    }

                                >

                                    {getFieldDecorator('username', {
                                        rules: [{ required: true, message: 'Please input your username!', whitespace: true }],

                                    })(<Input onChange={this.userNameChangeHandler}


                                    />)}
                                </Form.Item>
                                <Form.Item label="Password"
                                    
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
                                    })(<Input.Password />)}
                                </Form.Item>
                                <Form.Item label="Confirm Password" hasFeedback>
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
                                <Form.Item
                                    label={
                                        <span>
                                            Date Of Birth:&nbsp;
                                <Tooltip title="Your Birthday">
                                                <Icon type="question-circle-o" />
                                            </Tooltip>
                                        </span>
                                    }
                                >
                                    {getFieldDecorator('userdob', {
                                        rules: [{ required: true, message: 'Please input your date of birth!' }],
                                    })(<DatePicker format={dateFormat} />)}
                                </Form.Item>


                                <Form.Item {...tailFormItemLayout}>
                                    <a href="/login"><Button type="primary" htmlType="submit">
                                        Register
                                    </Button>
                                    </a>&nbsp;Already a User!
                                    <a href="/login">
                                        LogIn
                                    </a>
                                </Form.Item>

                            </Form>
                        </div>
                    </Content>

                </Layout>



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


export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Registration)); 

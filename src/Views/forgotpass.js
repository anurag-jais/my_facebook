import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import * as actionCreators from '../Store/actions/actions';
//import './LogIn.css';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './forgotpass.css';

class ForgotPassword extends Component {
    state = {
        isRedirect: false,
        isRedirectToVerifySignup: false,
        inCompleteRegisterEmail: null,
        registeredEmail: null,
        showotpfield: false,
        isOtpInvalid: false,
        isEmailNotFound: false,
        errMsg: null,
        emailDisable: false
    }

    emailChangeHandler = (e)=>{
        this.setState({
            isEmailNotFound: false,
            errMsg: null
        });
    }
    otpChangeHandler = (e)=>{
        this.setState({
            isOtpInvalid: false,
            errMsg: null
        });
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("/\/\/\/\//>>>>",values.userotp);
                if(values.userotp){
                    axios.get('http://localhost:3007/api/login/verify/'+values.useremail+'/'+values.userotp)
                    .then(response => {
                        console.log(response.data);
                        console.log('here');
                        if(response.data === "Email Identification Done"){
                            this.setState({
                                isRedirect: true,
                                registeredEmail: values.useremail    
                            });
                        }
                        else if(response.data === "Incomplete Registration"){
                            this.setState({
                                isRedirectToVerifySignup: true,
                                inCompleteRegisterEmail: values.useremail,
                                errMsg: 'Complete your verification for Registration'
                            });
                        }
                        else if(response.data === 'Recover Otp Not Match'){
                            this.setState({
                                isOtpInvalid: true,
                                errMsg: 'Invalid Otp'
                            });
                        }
                    });
                }
                else{
                    axios.get('http://localhost:3007/api/login/identify/'+values.useremail)
                    .then(response => {
                        console.log(response.data);
                        if(response.data === 'Email Not Found'){
                            this.setState({
                                isEmailNotFound: true,
                                errMsg: 'Invalid Email'
                            });
                        }
                        else if(response.data === "Email Searched"){
                            this.setState({
                                showotpfield: true,
                                emailDisable: true   
                            });
                        }
                        else if(response.data === "Incomplete Registration"){
                            this.setState({
                                isRedirectToVerifySignup: true,
                                inCompleteRegisterEmail: values.useremail,
                                suggestionMsg: 'Complete your verification for Registration'
                            });
                        }
                    });
                }
                console.log('Received values of form: ', values);
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                {this.state.isRedirectToVerifySignup === true? <Redirect to={{
                        pathname: '/verifyregister',
                        state: { registeremail: this.state.inCompleteRegisterEmail }
                    }} />:null}
                {this.state.isRedirect === true ? <Redirect to={{
                        pathname: '/resetpassword',
                        state: { registeredemail: this.state.registeredEmail }
                    }} />  : null} 
                <div className="forgotpass-form-container">
                    <br></br>
                {this.state.isEmailNotFound === true || this.state.isOtpInvalid === true ? <div className="errMsg">{this.state.errMsg}</div>:<h3>Please Find Your Account: </h3> }
                <Form onSubmit={this.handleSubmit} className="forgotpass-form">
                    <Form.Item>
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
                        })(<Input
                            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="email"
                                placeholder="Email"
                                onChange = {this.emailChangeHandler}
                                disabled = {this.state.emailDisable}
                        />)}
                    </Form.Item>
                    {this.state.showotpfield === true ? 
                    <Form.Item>
                        
                        {getFieldDecorator('userotp', {
                            rules: [{ required: true, message: 'Please enter the otp!' }],
                        })(
                            <Input 
                                prefix={<Icon type="text" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="OTP"
                                onChange={this.otpChangeHandler}
                            />,
                        )}
                    </Form.Item>:null}

                    {this.state.showotpfield === false?<Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Search
                        </Button>
                    </Form.Item>:
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Submit
                        </Button>
                    </Form.Item> }
                    
                </Form>
                </div>               
                
            </div>
        )
    }
}



export default (Form.create()(ForgotPassword));
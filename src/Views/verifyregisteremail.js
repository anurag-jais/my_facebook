import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import * as actionCreators from '../Store/actions/actions';
import './verifyregistration.css';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class VerifyRegisterEmail extends Component {
    state={
        isOtpVerified: false,
        errMsg: null,
        isredirect : false,
        suggestionMsg: null
    }

    otpChangeHandler = (e)=>{
        this.setState({
            isOtpVerified: true,
            errMsg: null
        });
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                console.log("register email----->>>>>>>",this.props.location.state.registeremail);
                axios.get('http://localhost:3007/api/registration/verify/'+values.userotp+'/'+this.props.location.state.registeremail)
                    .then(response => {
                        if(response.data === "Email Verified"){
                            this.setState({
                                isOtpVerified: true,
                                isredirect: true
                            });
                        }
                        else{
                            this.setState({
                                isOtpVerified: false,
                                errMsg: 'Enter Correct Otp'
                            })
                        }

                    })
                    .catch(err=>{
                        console.log(err);
                    });

            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div >
                <div>
                    {this.state.isredirect === true ?  <Redirect to= '/home'/> :null}
                </div>
                
                <div className = "verifyregister-form-container">
                <h3>Complete Your Registration</h3>
                
                <hr></hr>
                {this.state.isOtpVerified === false ? <div className="errMsg">{this.state.errMsg}</div>: <h4>Registration Details already send to your Mail</h4>}
                
                <Form onSubmit={this.handleSubmit} className="verifyregister-form">
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
                    </Form.Item>
                    
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Email Verification
                        </Button>
                        
                    </Form.Item>
                </Form>

                </div>
                
            </div>
        )
    }
}


// const mapStateToProps = state => {
//     return {
//     };
// };
// const mapDispatchToProps = dispatch => {
//     return {
//         login: (values) => dispatch(actionCreators.login(values))
//     };
// };


//export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(LogIn));

export default (Form.create())(VerifyRegisterEmail);




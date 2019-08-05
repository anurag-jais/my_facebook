import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import * as actionCreators from '../Store/actions/actions';
//import './LogIn.css';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router-dom';





class Recover extends Component {
    state={
        isOtpVerified: false,
        errMsg: null,
        isredirect : false,
        suggestionMsg: null
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                console.log("register email----->>>>>>>",this.props.location.state.registeremail);
                axios.get('http://localhost:3007/api/login/recover/'+values.userotp+'/'+this.props.location.state.registeredEmail)
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
                                errMsg: 'enter correct otp'
                            })
                        }
                        //console.log("otpverification;;;;;;;;;>>>>>>>",response.data);

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
                {/* <div>
                    {this.state.isredirect === true ?  this.renderRedirect :null}
                </div> */}

                <Form onSubmit={this.handleSubmit} className="login-form">
                    
                    
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Submit
                        </Button>
                        
                    </Form.Item>
                </Form>
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

export default (Form.create())(Recover);

//ReactDOM.render(<App />, mountNode);
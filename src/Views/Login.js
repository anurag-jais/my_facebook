import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import * as actionCreators from "../Store/actions/actions";
import "./LogIn.css";
import { connect } from "react-redux";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Layout } from "antd";

class LogIn extends Component {
  state = {
    loginvalues: {},
    invalidPassword: false,
    unRegisteredEmail: false,
    isRedirectSignup: false,
    isredirect: false,
    errMsg: null,
    userId: null
  };

  emailChangeHandler = e => {
    this.setState({
      unRegisteredEmail: false,
      errMsg: null
    });
  };
  passwordChangeHandler = e => {
    this.setState({
      invalidPassword: false,
      errMsg: null
    });
  };

  // setAutoLogout = milliseconds =>{
  //     setTimeout(()=>{
  //         this.logoutHandler();
  //     },milliseconds);
  // }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        axios.post("http://localhost:3007/api/login", values).then(response => {
          console.log("response is comming.......... ", response);
          console.log("response data...........>>>>", response.data);
          if (response.data.message === "Password Match") {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.userId);
            const remainMilliseconds = 60 * 60 * 1000;
            const expiryDate = new Date(
              new Date().getTime() + remainMilliseconds
            );
            //localStorage.setItem('expiryDate',expiryDate.toISOString);
            // this.setAutoLogout(remainMilliseconds);
            this.setState({
              isredirect: true,
              userId: response.data.userId
            });
            console.log("redirect to new page");
          } else if (response.data === "Invalid Password") {
            this.setState({
              invalidPassword: true,
              errMsg: "Invalid Credentials"
            });
          } else if (response.data === "Redirect to SignUp Page") {
            this.setState({
              isRedirectSignup: true
            });
          } else if (response.data === "Such email is not registered yet") {
            this.setState({
              unRegisteredEmail: true,
              errMsg: "Such Email Not Registered Yet"
            });
          }
        });
      }
    });
  };
  render() {
    const { Header, Footer, Sider, Content } = Layout;

    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div>
          {this.state.isredirect === true ? (
            <Redirect
              to={{
                pathname: "/home",
                state: { userId: this.state.userId }
              }}
            />
          ) : null}
        </div>
        <div>
          {this.state.isRedirectSignup === true ? (
            <Redirect to="/verifyregister" />
          ) : null}
        </div>
        <Layout>
          <Header className="head">
            <h1>
              <Icon type="facebook" />
              &nbsp;LogIn into Your Account
            </h1>
          </Header>
          <Content>
            <div className="login-form-container">
              <h2>LogIn Portal</h2>
              <hr />
              <br />
              {this.state.invalidPassword === true ||
              this.state.unRegisteredEmail === true ? (
                <div className="errMsg">{this.state.errMsg}</div>
              ) : (
                <h3>Enter Your Credentials:</h3>
              )}
              <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                  {getFieldDecorator("useremail", {
                    rules: [
                      {
                        type: "email",
                        message: "The input is not valid E-mail!"
                      },
                      {
                        required: true,
                        message: "Please input your E-mail!"
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="mail"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="email"
                      placeholder="Email"
                      onChange={this.emailChangeHandler}
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("password", {
                    rules: [
                      { required: true, message: "Please input your Password!" }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="password"
                      placeholder="Password"
                      onChange={this.passwordChangeHandler}
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("remember", {
                    valuePropName: "checked",
                    initialValue: true
                  })(<Checkbox>Remember me</Checkbox>)}
                  <a className="login-form-forgot" href="/forgotpass">
                    Forgot password
                  </a>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Log in
                  </Button>
                  Or <a href="/register">register now!</a>
                </Form.Item>
              </Form>
            </div>
          </Content>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    login: values => dispatch(actionCreators.login(values))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(LogIn));

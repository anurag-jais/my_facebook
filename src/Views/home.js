import React, { Component } from "react";

import * as actionCreators from "../Store/actions/actions";
import "./LogIn.css";
import { connect } from "react-redux";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "./home.css";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import { Button, Modal, Form, Input, Radio } from "antd";
import Post from "../Views/Post";
import "./Post.css";
import { Upload, message } from "antd";

class Home extends Component {
  //constructor(props){
  state = {
    posts: [],
    isAuth: false,
    isredirectbacktologin: false,
    token: null,
    islogout: false,
    visible: false,

    isPostsArrayUpdate: false
  };

  componentDidMount() {
    //alert('Im running');
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3007/api/home/verifytoken", {
        headers: {
          Authorization: "bearer " + token
        }
      })
      .then(tokenverified => {
        console.log("Here.....>>>>>>>>>>>>>>>>>>>>>>>");
        //alert('token verified');
        console.log("response;;;;=====>>>", tokenverified);
        if (tokenverified) {
          this.setState({
            isAuth: true
          });
        } else {
          this.setState({
            isredirectbacktologin: true
          });
        }
      })
      .catch(err => {
        console.log("err", err.response);
        if (err.response.status === 401) {
          this.setState({
            isredirectbacktologin: true
          });
        }
      });

    axios
      .get("http://localhost:3007/api/home/posts")
      .then(response => {
        if (response) {
          console.log(response.data);
          const posts = response.data.reverse();
          this.setState({
            posts: posts
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidUpdate() {
    //alert("i m running");
    if (this.state.isPostsArrayUpdate) {
      console.log("Here.....>>>>>>>>>>>>>>>>>>>>>>>");
      axios
        .get("http://localhost:3007/api/home/posts")
        .then(response => {
          if (response) {
            console.log(response.data);

            const posts = response.data.reverse();
            this.setState({
              posts: posts,
              isPostsArrayUpdate: false
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    //const { form } = this.formRef.props;
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Received values of form: ", values);
      values.userId = this.props.location.state.userId;
      this.props.form.resetFields();
      axios
        .post("http://localhost:3007/api/home/createpost", values)
        .then(response => {
          if (response) {
            console.log("After post");
            console.log(response.data);

            this.setState({
              visible: false,
              isPostsArrayUpdate: true
            });
          } else {
            console.log("response not comming");
          }
        })
        .catch(err => {
          console.log("err>>>>>>>", err);
        });
    });
  };

  createPost = () => {
    this.setState({
      visible: true
    });
  };

  logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    this.setState({
      islogout: true,
      token: null
    });
  };

  render() {
    //const post = this.state.posts.map()

    const posts = this.state.posts.map(post => {
      return (
        <Post
          postid={post.postid}
          id={post.id}
          Title={post.Title}
          Content={post.Content}
          imageUrl={post.imageUrl}
          likes={post.likes}
          posttimestamp={post.posttimestamp}
          creator={post.creator}
        />
      );
    });
    const { SubMenu } = Menu;
    const { Header, Content, Sider } = Layout;
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const props = {
      action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
      headers: {
        authorization: "authorization-text"
      },
      onChange(info) {
        console.log(
          "info;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;",
          info
        );
        if (info.file.status !== "uploading") {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === "done") {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      }
    };

    return (
      <div>
        {this.state.isredirectbacktologin === true ||
        this.state.islogout === true ? (
          <Redirect to="/login" />
        ) : null}
        {this.state.isAuth === true ? (
          <Layout>
            <Header className="header">
              <div className="logo" />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["2"]}
                style={{ lineHeight: "64px" }}
              >
                <Menu.Item key="1">nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
                <Menu.Item key="4">
                  <Button onClick={this.logoutHandler}>Logout</Button>
                </Menu.Item>
                <Menu.Item key="5">
                  <Button>Change Password</Button>
                </Menu.Item>
              </Menu>
            </Header>
            <Layout>
              <Sider width={200} style={{ background: "#fff" }}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={["sub1"]}
                  style={{ height: "100%", borderRight: 0 }}
                >
                  <SubMenu
                    key="sub1"
                    title={
                      <span>
                        <Icon type="user" />
                        subnav 1
                      </span>
                    }
                  >
                    <Menu.Item key="1">option1</Menu.Item>
                    <Menu.Item key="2">option2</Menu.Item>
                    <Menu.Item key="3">option3</Menu.Item>
                    <Menu.Item key="4">option4</Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub2"
                    title={
                      <span>
                        <Icon type="laptop" />
                        subnav 2
                      </span>
                    }
                  >
                    <Menu.Item key="5">option5</Menu.Item>
                    <Menu.Item key="6">option6</Menu.Item>
                    <Menu.Item key="7">option7</Menu.Item>
                    <Menu.Item key="8">option8</Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub3"
                    title={
                      <span>
                        <Icon type="notification" />
                        subnav 3
                      </span>
                    }
                  >
                    <Menu.Item key="9">option9</Menu.Item>
                    <Menu.Item key="10">option10</Menu.Item>
                    <Menu.Item key="11">option11</Menu.Item>
                    <Menu.Item key="12">option12</Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>
              <Layout style={{ padding: "0 24px 24px" }}>
                <Breadcrumb style={{ margin: "16px 0" }}>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <Button onClick={this.createPost}> Create Post</Button>
                  </Breadcrumb.Item>
                </Breadcrumb>
                <Content
                  style={{
                    background: "#fff",
                    padding: 24,
                    margin: 0,
                    minHeight: 280
                  }}
                >
                  {posts}
                  <Modal
                    visible={this.state.visible}
                    title="Create Post"
                    okText="Create"
                    onCancel={this.handleCancel}
                    onOk={this.handleCreate}
                  >
                    <Form layout="vertical">
                      <Form.Item label="Title">
                        {getFieldDecorator("title", {
                          rules: [
                            {
                              required: true,
                              message: "Please input the title of collection!"
                            }
                          ]
                        })(<Input />)}
                      </Form.Item>

                      <Form.Item label="Image">
                        {getFieldDecorator("file", {
                          // initialValue:
                          //   this.props.dataset && this.props.dataset.filename
                          //     ? this.props.dataset.filename
                          //     : [],
                          // valuePropName: "fileList",
                          // getValuefromEvent: this.normFile,
                          rules: [
                            // {
                            //   required: true,
                            //   message: "Please input the title of collection!"
                            // }
                          ]
                        })(
                          <Upload name="file" {...props}>
                            <Button>
                              <Icon type="upload" /> Click to Upload
                            </Button>
                          </Upload>
                          //<Input type="file" name="file" />
                        )}
                      </Form.Item>
                      <Form.Item label="Content">
                        {getFieldDecorator("content")(
                          <Input type="textarea" />
                        )}
                      </Form.Item>
                      <Form.Item className="collection-create-form_last-form-item">
                        {getFieldDecorator("modifier", {
                          initialValue: "public"
                        })(
                          <Radio.Group>
                            <Radio value="public">Public</Radio>
                            <Radio value="private">Private</Radio>
                          </Radio.Group>
                        )}
                      </Form.Item>
                    </Form>
                  </Modal>
                </Content>
              </Layout>
            </Layout>
          </Layout>
        ) : null}

        {/* {this.state.isAuth === true ? <h1>WELCOME HOME</h1> : <Redirect to='/login' ></Redirect>} */}

        <div />
      </div>
    );
  }
}

export default Form.create()(Home);

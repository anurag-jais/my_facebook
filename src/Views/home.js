import React, { Component } from 'react';

import * as actionCreators from '../Store/actions/actions';
import './LogIn.css';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './home.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Button, Modal, Form, Input, Radio } from 'antd';

class Home extends Component {
    //constructor(props){
    state = {
        isAuth: false,
        isredirectbacktologin: false,
        token: null,
        islogout: false,
        visible: false
    }


    componentDidMount() {
        //alert('Im running');
        const token = localStorage.getItem('token');
        axios.get('http://localhost:3007/api/home/verifytoken', {
            headers: {
                "Authorization": 'bearer ' + token
            }
        }).then(tokenverified => {
            //alert('token verified');
            console.log("response;;;;=====>>>", tokenverified);
            if (tokenverified) {
                this.setState({
                    isAuth: true
                })
            }
            else {
                this.setState({
                    isredirectbacktologin: true
                });
            }
        }).catch(err => {
            console.log('err', err.response);
            if (err.response.status === 401) {
                this.setState({
                    isredirectbacktologin: true
                });
            }

        });

    }

    // showModal = () => {
    //     this.setState({ visible: true });
    //   };
    
      handleCancel = () => {
        this.setState({ visible: false });
      };

    handleCreate = () => {
        alert('i m running');
        //const { form } = this.formRef.props;
        this.props.form.validateFields((err, values) => {
          if (err) {
              console.log(err);
            return;
          }
          console.log('Received values of form: ', values);
          axios.post('http://localhost:3007/api/home/createpost', values)
          .then(response=>{
              if(response){
                  console.log(response.data);
              }
          })
          .catch(err=>{
              console.log("err>>>>>>>",err);
          });
          this.props.form.resetFields();
          this.setState({ visible: false });
        });
      };

    createPost = () => {
        this.setState({
            visible: true
        });
    }
    

    logoutHandler = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        this.setState({
            islogout: true,
            token: null
        });
    }

    render() {
        const { SubMenu } = Menu;
        const { Header, Content, Sider } = Layout;
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (


            <div>
                {this.state.isredirectbacktologin === true || this.state.islogout === true ? <Redirect to='/login' /> : null}
                {this.state.isAuth === true ?
                    <Layout>
                        <Header className="header">
                            <div className="logo" />
                            <Menu
                                theme="dark"
                                mode="horizontal"
                                defaultSelectedKeys={['2']}
                                style={{ lineHeight: '64px' }}
                            >
                                <Menu.Item key="1">nav 1</Menu.Item>
                                <Menu.Item key="2">nav 2</Menu.Item>
                                <Menu.Item key="3">nav 3</Menu.Item>
                                <Menu.Item key='4'><Button onClick={this.logoutHandler}>Logout</Button></Menu.Item>
                                <Menu.Item key='5'><Button>Change Password</Button></Menu.Item>
                            </Menu>
                        </Header>
                        <Layout>
                            <Sider width={200} style={{ background: '#fff' }}>
                                <Menu
                                    mode="inline"
                                    defaultSelectedKeys={['1']}
                                    defaultOpenKeys={['sub1']}
                                    style={{ height: '100%', borderRight: 0 }}
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
                            <Layout style={{ padding: '0 24px 24px' }}>
                                <Breadcrumb style={{ margin: '16px 0' }}>
                                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                                    {/* <Breadcrumb.Item>List</Breadcrumb.Item>
                               <Breadcrumb.Item>App</Breadcrumb.Item> */}
                                </Breadcrumb>
                                <Content
                                    style={{
                                        background: '#fff',
                                        padding: 24,
                                        margin: 0,
                                        minHeight: 280,
                                    }}
                                >
                                    <Button onClick={this.createPost}> Create Post</Button>


                                    <Modal
                                         visible={this.state.visible}
                                         title="Create Post"
                                         okText="Create"
                                         onCancel={this.handleCancel}
                                         onOk={this.handleCreate}
                                        
                                    >
                                        <Form layout="vertical">
                                            <Form.Item label="Title">
                                                {getFieldDecorator('title', {
                                                    rules: [{ required: true, message: 'Please input the title of collection!' }],
                                                })(<Input />)}
                                            </Form.Item>
                                            <Form.Item label="Content">
                                                {getFieldDecorator('content')(<Input type="textarea" />)}
                                            </Form.Item>
                                            <Form.Item className="collection-create-form_last-form-item">
                                                {getFieldDecorator('modifier', {
                                                    initialValue: 'public',
                                                })(
                                                    <Radio.Group>
                                                        <Radio value="public">Public</Radio>
                                                        <Radio value="private">Private</Radio>
                                                    </Radio.Group>,
                                                )}
                                            </Form.Item>
                                        </Form>
                                    </Modal>
                                    
                                </Content>
                            </Layout>
                        </Layout>
                    </Layout>

                    : null}

                {/* {this.state.isAuth === true ? <h1>WELCOME HOME</h1> : <Redirect to='/login' ></Redirect>} */}

                <div>

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


export default Form.create()(Home);




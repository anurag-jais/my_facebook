import React, { Component } from 'react';
//import { connect } from 'react-redux';
import {Button} from 'antd';
import './App.css';
import { Layout } from 'antd';
import { Icon } from 'antd';


class App extends Component {
  state={
    isRegisterClicked : false 
  }

  
  render() {
    const { Header, Footer, Sider, Content } = Layout;

    return (
      <div className="App">
        <div>
        <Layout>
      <Header className="head">
      
        <h1><Icon type="facebook" />&nbsp;facebook</h1>
       
      </Header>
      <Content className = 'content'> 
      <div className="icons">
      <Icon type="user" />Create an Account  <a href="/register">Register </a><br></br>
      <Icon type="user" />Already a User!!!  <a href="/login">LogIN</a>
      </div>
     
      </Content>
       
    </Layout>


        
        </div>
      </div>

    );
  }
}

export default App
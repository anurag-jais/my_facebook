import React, { Component } from 'react';
//import { connect } from 'react-redux';
import {Button} from 'antd';
import './App.css';

class App extends Component {
  state={
    isRegisterClicked : false 
  }

  
  render() {
    return (
      <div className="App">
        <div>
        <a href="/register"><Button> Register </Button></a>
        <a href="/login"><Button>LogIN</Button></a>
        </div>
      </div>

    );
  }
}

export default App
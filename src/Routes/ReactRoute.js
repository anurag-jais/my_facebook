import React from 'react'
import { Provider } from 'react-redux'
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from '../App'
import Registration from '../Views/registration';
import LogIn from '../Views/Login';
import VerifyRegisterEmail from '../Views/verifyregisteremail';
import ForgotPassword from '../Views/forgotpass';
import Recover from '../Views/Recover';
import Home from '../Views/Home';
import ResetPassword from '../Views/ResetPassword';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route path="/my_facebook" component={App} />
      <Route path="/register" component = {Registration}/>
      <Route path='/verifyregister' render={props => <VerifyRegisterEmail {...props} />}/>
      <Route path="/login" component= {LogIn} />
      <Route path="/forgotpass" component={ForgotPassword}/>
      <Route path="/recover" render={props => <Recover {...props} />}/>
      <Route path='/resetpassword' render={props => <ResetPassword {...props} />} />
      <Route path="/home" component={Home}/>
    </Router>
  </Provider>
)


// const mapStateToProps = state => {
//     return {
      
//     };
//   };
//   const mapDispatchToProps = dispatch => {
//     return {
//        // registration : (values)=> dispatch ({ type: 'REGISTRATION_DETAILS',values} )
//     };
//   };

export default Root
//export default connect(mapStateToProps, mapDispatchToProps)(Root);
import React, { Component } from 'react';

import * as actionCreators from '../Store/actions/actions';
import './LogIn.css';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Home extends Component {
    state = {
        isAuth: false
    }

    componentDidMount(){
        const token = localStorage.getItem('token');
        axios.get('http://localhost:3007/api/home/verifytoken',{
            headers:{
                "Authorization": 'bearer '+token
            }
        }).then(tokenverified =>{
            console.log("response;;;;=====>>>",tokenverified);
            this.setState({
                isAuth: true
            });

        }).catch(err=>{
            console.log(err);
        });
        
    }
    
    render() {
        
        return (
            <div >
                {this.state.isAuth === true ? <h1>WELCOME HOME</h1> : <p>Error</p>}
                
                <div>
                   
                </div>
                
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
        login: (values) => dispatch(actionCreators.login(values))
    };
};


export default Home;




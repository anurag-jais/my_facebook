import * as actionTypes from './actionTypes';

export const registration = (values)=>{
    return{
        type: actionTypes.REGISTRATION,
        payload: values
    };
};


export const login = (values)=>{
    return{
        type: actionTypes.LOGIN,
        payload: values
    };
};


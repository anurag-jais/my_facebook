import * as actionTypes from './actions/actionTypes';

const initialState = {
    showform: false
}

const reducer = (state=initialState,action) => {
    switch(action.type){
        case actionTypes.REGISTRATION:
            return{
                
            }
        console.log("HEY THERE");
        console.log(action.payload);
        case actionTypes.LOGIN:
        console.log("HEY THERE");
        console.log(action.payload);

    }
    
};

export default reducer;
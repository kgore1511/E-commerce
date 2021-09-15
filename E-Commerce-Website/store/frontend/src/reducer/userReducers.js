import {USER_SIGNIN_REQUEST,USER_SIGNIN_SUCCESS,USER_SIGNIN_FAIL,USER_REGISTER_REQUEST,USER_REGISTER_SUCCESS,USER_REGISTER_FAIL} from '../constants/userConstants';
function userSigninReducer(state={},action){
    switch (action.type){
        case USER_SIGNIN_REQUEST:
            return {loading:true};
        case USER_SIGNIN_SUCCESS:
            return {loading:false,userInfo: action.payload};
        case USER_SIGNIN_FAIL:
            console.log(action.payload);
            return {loading:false,error:action.payload};
        default: return state;
    }
}

function userRegisterReducer(state={},action){
    switch (action.type){
        case USER_REGISTER_REQUEST:
            return {loading:true};
        case USER_REGISTER_SUCCESS:
            return {loading:false,userInfo: action.payload};
        case USER_REGISTER_FAIL:
            console.log(action.payload);
            return {loading:false,error:action.payload};
        default: return state;
    }
}

function userOrderReducer(state={},action){
    switch (action.type){
        case 'USER_ORDER_REQUEST':
            alert('1')
            return {loading:true};
        case 'USER_ORDER_SUCCESS':
            alert('2')
            return {loading:false,orders: action.payload};
        case 'USER_ORDER_FAIL':
            alert('3')
            console.log(action.payload);
            return {loading:false,error:action.payload};
        default: return state;
    }
}

export {userSigninReducer,userRegisterReducer,userOrderReducer};
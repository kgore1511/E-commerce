import {PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAIL,PRODUCT_SAVE_REQUEST,PRODUCT_SAVE_SUCCESS,PRODUCT_SAVE_FAIL,PRODUCT_DELETE_REQUEST,PRODUCT_DELETE_SUCCESS,PRODUCT_DELETE_FAIL} from '../constants/productConstants'
import {PRODUCT_DETAIL_REQUEST,PRODUCT_DETAIL_SUCCESS,PRODUCT_DETAIL_FAIL} from '../constants/detailConstants';
function productListReducer(state ={products:[]},action){
    switch (action.type){
        case PRODUCT_LIST_REQUEST:
            console.log("request chala")
            return {loading:true,products:[]};
        case PRODUCT_LIST_SUCCESS:
            console.log("honey")
            console.log(action.payload);
            return {loading:false,products:action.payload};
        case PRODUCT_LIST_FAIL: 
            return {loading:false,error:action.payload}
        default:
            return state;
    }
}

function productDetailReducer(state ={products:{}},action){
    switch (action.type){
        case PRODUCT_DETAIL_REQUEST:
            console.log("request chala")
            return {loading:true};
        case PRODUCT_DETAIL_SUCCESS:
            console.log("honey")
            console.log(action.payload);
            return {loading:false,products:action.payload};
        case PRODUCT_DETAIL_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state;
    }
}

function productDeleteReducer(state ={products:{}},action){
    switch (action.type){
        case PRODUCT_DELETE_REQUEST:
            console.log("request chala")
            return {loading:true};
        case PRODUCT_DELETE_SUCCESS:
            console.log("honey")
            console.log(action.payload);
            return {loading:false,products:action.payload,success:true};
        case PRODUCT_DELETE_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state;
    }
}



function productSaveReducer(state ={products:{}},action){
    switch (action.type){
        case PRODUCT_SAVE_REQUEST:
            console.log("request chala  waa waa")
            return {loading:true};
        case PRODUCT_SAVE_SUCCESS:
            console.log("honey")
            console.log(action.payload);
            return {loading:false,success:true,products:action.payload};
        case PRODUCT_SAVE_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state;
    }
}


export {productListReducer,productDetailReducer,productSaveReducer,productDeleteReducer}
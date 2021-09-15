import {createStore,combineReducers, applyMiddleware,Dispatch, compose} from 'redux';
import thunk from 'redux-thunk';
import Cookie from "js-cookie";
import {cartReducer} from './reducer/cartReducer';
import { productListReducer,productDetailReducer,productSaveReducer, productDeleteReducer } from './reducer/productReducers';
import { userRegisterReducer, userSigninReducer,userOrderReducer} from './reducer/userReducers';
const userInfo=Cookie.getJSON('userInfo') || null;
const cartItems=Cookie.getJSON("cartItems") || [];
const initialState={cart:{cartItems},userSignin:{userInfo} };
const reducer=combineReducers({
    productList:productListReducer,
    productDetails:productDetailReducer,
    cart:cartReducer,
    userSignin:userSigninReducer,
    userRegister:userRegisterReducer,
    productSave:productSaveReducer,
    productDelete:productDeleteReducer,
    userOrders:userOrderReducer
})
const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE||compose;
    var store=createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)));
    export default store;
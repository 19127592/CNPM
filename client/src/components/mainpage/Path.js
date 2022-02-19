import React, {useContext} from 'react'
import {Switch,Route} from 'react-router-dom'
import { GlobalState } from "../../GlobalState";
//Products
import HomePage from './HomePage/HomePage'
import ProductDetail from './ProductDetail/ProductDetail'

//Authentication
import Login from './Account/Authentication/Login'
import Register from './Account/Authentication/Register'

//User Information
import User from './Account/User'

//Password Change
import ForgotPass from './Account/PasswordChange/Forgot'
import ChangePass from './Account/PasswordChange/Change'

//Shopping
import Cart from './Cart/Cart'
import Checkout from './Cart/Checkout'

//Order
import Purchased from './Account/Order/Purchased/Purchased'
import Pending from './Account/Order/Pending/Pending'

//Admin
import ModifyProduct from './Admin/HandleProduct/ModifyProduct'

//Other
import NotFound from './Other/NotFound/NotFound';
export default function Path() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged

    return (
        <Switch>
            <Route path='/' exact component={HomePage}/>
            <Route path='/products/:id' exact component={ProductDetail}/>


            <Route path='/account/login' exact component={Login}/>
            <Route path='/account/register' exact component={Register}/>


            <Route path='/account' exact component={User}/>


            <Route path='/account/forgot-password' exact component={ForgotPass}/> //Cannot Login
            <Route path='/account/change-password' exact component={ChangePass}/> //Can Login


            <Route path='/cart' exact component={Cart}/>
            <Route path='/checkout' exact component={Checkout}/>


            <Route path='/account/order/history' exact component={Purchased}/>
            <Route path='/account/order/pending' exact component={Pending}/>


            <Route path='/admin/modify-product' exact component={ModifyProduct}/>
            
            <Route path="*" exact component={NotFound} />
        </Switch>
    )
}
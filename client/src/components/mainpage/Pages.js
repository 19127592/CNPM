import React, {useContext} from 'react'
import {Switch,Route} from 'react-router-dom'
import Products from './products/Products'
import ProductDetail from './productDetail/ProductDetail'
import { GlobalState } from '../../GlobalState'
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'
import NotFound from './other/404/404'
import Payment from './payment/payment'
import UserManagement from './DataManagment/UserManagement'
import ProductManagement from './DataManagment/ProductManagement'
import EditProduct from './DataManagment/EditProduct'
import CreateProduct from './DataManagment/CreateProduct'

export default function Pages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    /* 5:0:0 */
    return (
        
        <Switch>
            <Route path='/' exact component={Products}/>
            <Route path='/detail/:id' exact component={ProductDetail}/>
            <Route path='/edit/:id' exact component={CreateProduct}/>
            <Route path='/login' exact component={Login}/>
            <Route path='/register' exact component={Register}/>
            
            <Route path='/cart' exact component={Cart}/>
            <Route path='/cart/payment' exact component={Payment}/>
            <Route path='/user-management' exact component={UserManagement}/>
            <Route path='/product-management' exact component={ProductManagement}/>
            <Route path='/product-management/create-product' exact component={CreateProduct}/>
            <Route path='*' exact component={NotFound}/>
        </Switch>
    )
}

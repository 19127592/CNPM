import React, {useContext} from 'react'
import {Switch,Route} from 'react-router-dom'
import Products from './products/Products'
import ProductDetail from './productDetail/ProductDetail'
import { GlobalState } from '../../GlobalState'
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'
import NotFound from './other/404/404'
export default function Pages() {

    return (
        <Switch>
            <Route path='/' exact component={Products}/>
            <Route path='/detail/:id' exact component={ProductDetail}/>
            <Route path='/login' exact component={Login}/>
            <Route path='/register' exact component={Register}/>
            <Route path='/cart' exact component={Cart}/>

            <Route path='*' exact component={NotFound}/>
        </Switch>
    )
}

import React,{useState,useContext} from 'react'
import {GlobalState} from '../../GlobalState'
import Menu from './menu.svg'
import Close from './close.svg'
import Cart from './cart.svg'
import { Link } from 'react-router-dom'
export default function Header() {
    const state = useContext(GlobalState)
    const [Logged,isLogged] = state.userAPI.isLogged
    const [Admin,isAdmin] = state.userAPI.isAdmin
    const [Seller,isSeller] = state.userAPI.isSeller

    const sellerControl = () =>{
        return(
            <>
                <li><Link to='/create_product'>Create product</Link></li>
                <li><Link to='/category'>Category</Link></li>
            </>
        )
    }

    const adminControl = () =>{
        return(
            <>
                <li><Link to='/create_product'>Create product</Link></li>
                <li><Link to='/category'>Category</Link></li>
            </>
        )
    }

    const loggedControl = () =>{
        return(
            <>
                <li><Link to='/history'>History</Link></li>
                <li><Link to='/'>Log out</Link></li>
            </>
        )
    }
    console.log(state)
    return (
        //FE (Thu)
        <header>
            <div className='menu'>
                <img src={Menu} alt="" width="30"/>
            </div>
            <div className='logo'>
                <h1>
                    <Link to="/">{isAdmin?'Admin':'rookieSE'}rookieSE</Link>
                </h1>
            </div>
            <ul>
                <li><Link to='/'>Products</Link></li>
                <li><Link to='/login'>Login & Register</Link></li>
                <li>
                    <img src={Close} alt='' width="30" className='menu'/>
                </li>
            </ul>
            <div className='cart-icon'>
                <span>0</span>
                <Link to='/cart'>
                    <img src={Cart} alt="" width="30"/>
                </Link>
            </div>
        </header>
    )
}

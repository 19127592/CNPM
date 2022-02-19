import React,{useContext,useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import ProductItem from './ProductBoxUI/ProductItem'

export default function Homepage() {
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const [search, setSearch] = state.productsAPI.search
    const [users] = state.userAPI.users
    console.log(users)
    return (
        <>
        // Laptop
        <div className='products'>
            {
                products.map(product => {
                    if (product.category == 'laptop'){
                        return <ProductItem key={product._id} product={product}/>
                    }
                    
                })
            }
        </div>
        // PC
        <div className='products'>
            {
                products.map(product => {
                    if (product.category == 'pc'){
                        return <ProductItem key={product._id} product={product}/>
                    }
                    
                })
            }
        </div>
        // Monitor
        <div className='products'>
            {
                products.map(product => {
                    if (product.category == 'monitor'){
                        return <ProductItem key={product._id} product={product}/>
                    }
                    
                })
            }
        </div>
        // Keyboard
        <div className='products'>
            {
                products.map(product => {
                    if (product.category == 'keyboard'){
                        return <ProductItem key={product._id} product={product}/>
                    }
                    
                })
            }
        </div>
        // Headphone
        <div className='products'>
            {
                products.map(product => {
                    if (product.category == 'headphone'){
                        return <ProductItem key={product._id} product={product}/>
                    }
                })
            }
        </div>
        // Mouse
        <div className='products'>
            {
                products.map(product => {
                    if (product.category == 'mouse'){
                        return <ProductItem key={product._id} product={product}/>
                    }
                    
                })
            }
        </div>
        </>
    )
}
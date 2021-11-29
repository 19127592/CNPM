import React,{useContext,useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import ProductItem from '../productItem/ProductItem'
import Loading from '../other/loading/Loading'
import Filters from './Filter'
import Pages from './Pagination'
export default function Products() {
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const [isSeller] = state.userAPI.isSeller
    const [search, setSearch] = state.productsAPI.search
    
    return (
        <>
        <Filters/>
        <div className='products'>
            {
                products.map(product => {
                    return <ProductItem key={product._id} product={product}
                    isSeller={isSeller}/>
                })
            }
        </div>
        {products.length === 0 && <Loading/>}
        <Pages/>
        </>
    )
}
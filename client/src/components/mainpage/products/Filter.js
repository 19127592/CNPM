import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'

export default function Filters() {
    const state = useContext(GlobalState)
    

    const [category, setCategory] = state.productsAPI.category
    const [sort, setSort] = state.productsAPI.sort
    const [search, setSearch] = state.productsAPI.search
    

    const handleCategory = e => {
        var value = ''
        if (e.target.value === ''){
            value = ''
        }else value = "category="+ e.target.value
        
        setCategory(value)
    }

    return (
        <div className="filter_menu">
            <div className="row">
                <span>Filters: </span>
                <select name="category" onChange={handleCategory} >
                    <option value=''>All Products</option>
                    <option value='laptop'>Laptop</option>
                    <option value='mobile phone'>Mobile Phone</option>
                    <option value='other'>Other</option>
                </select>
            </div>

            

            <div className="row sort">
                <span>Sort By: </span>
                <select value={sort} onChange={e => setSort(e.target.value)} >
                    <option value=''>Newest</option>
                    <option value='sort=oldest'>Oldest</option>
                    <option value='sort=-sold'>Best sales</option>
                    <option value='sort=-price'>Price: Hight-Low</option>
                    <option value='sort=price'>Price: Low-Hight</option>
                </select>
            </div>
        </div>
    )
}

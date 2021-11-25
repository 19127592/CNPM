import React,{useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import trash_can from './iconmonstr-trash-can-1.svg'
import { useParams, Link } from "react-router-dom";
import edit_icon from './Edit_icon.svg'
import plus_icon from './plus-flat.svg'

export default function ProductManagment() {
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    return (
        <div>
          <div className='product-mod'>
            <Link to="/user-management">
              <button class="button-3" role="button">User Management</button>
            </Link>
            
            <div class="icon facebook">
            <div class="tooltip">
              Add Product
            </div>
            <Link to='/product-management/create-product'>
              <span><i><img src={plus_icon} alt="" className='plus-icon'/></i></span>
            </Link>
            
            </div>
          </div>
          
           <table className="customers">
          <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Description</th>
            <th>Price($)</th>
            <th><img src={edit_icon} alt="" className='trash-can'/></th>
            <th><img src={trash_can} alt="" className='trash-can'/></th>
          </tr>
          {products.map((product) => {
            return (
                <tr className='product-edit'>
                <td>
                  <Link to={'/detail/'+product._id}>
                    <img src={product.images.url} alt="" className='img-item'/>
                  </Link>
                </td>
                <td className='title'>
                  <Link to={'/detail/'+product._id}>
                    {product.title}
                  </Link>
                </td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td className='remove-pro'>
                  <Link to={'/edit/'+product._id}>
                    <img src={edit_icon} alt="" className='trash-can'/>
                  </Link>
                  </td>
                <td className='check-box'>
                  <input type='checkbox'></input>
                </td>
              </tr>
            )})};
            </table>
        </div>
    )
}

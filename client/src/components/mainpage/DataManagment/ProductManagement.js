import React,{useContext,useEffect,useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import trash_can from './iconmonstr-trash-can-1.svg'
import { useParams, Link } from "react-router-dom";
import edit_icon from './Edit_icon.svg'
import plus_icon from './plus-flat.svg'
import axios from 'axios'
export default function ProductManagment() {
    
    const state = useContext(GlobalState)
    const [token] = state.token
    const [products,setProducts] = state.productsAPI.products
    const [infor,setInfor] = state.userAPI.infor
    const [isAdmin] = state.userAPI.isAdmin

    const getName = () => {
      if(isAdmin){
        return "RookieSE"
      }else return infor.name
    }
    const name = getName()
    console.log(name)
    const getProducts = () =>{
      var name = ""
      if(isAdmin){
        name = "RookieSE"
      }else name = infor.name
      products.forEach((item,index) => {
        if(item.seller === name){
          products.splice(index,1)
        }
      })
      
      setProducts([...products])
    }
    
    
    const removeProduct = async(product_id) => {
      if(window.confirm("Are you sure to remove this product from your shop?")){
        products.forEach((item,index) => {
          if(item._id === product_id){
            products.splice(index,1)
          }
        })
        await axios.delete(`/api/products/${product_id}`,{
          headers: {Authorization: token}
        })
        setProducts([...products])
      }

    }
    const deleteDb = async(product_id) =>{
      await axios.delete(`/api/products/${product_id}`,{
        headers: {Authorization: token}
      })
    }
    const removeAllProduct = () => {
      if(window.confirm("Are you sure to remove all of your products?")){
        products.forEach((item,index) => {
          if(item.seller === name){
            products.splice(index,1)
            deleteDb(item._id)
          }
      })
        
        setProducts([...products])
      }
      
    }
    useEffect(() => {
      
    },[products])
    return (
        <div>
          <div className='product-mod'>
            {
              isAdmin?
              <Link to="/user-management">
              <button class="button-3" role="button">User Management</button>
              </Link>:
              <div>
                </div>
            }
            
            
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
            <th onClick={() => removeAllProduct()}><img src={trash_can} alt="" className='trash-can'/></th>
          </tr>
          {products.map((product) => {
            if(product.seller === name){
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
                  <td onClick={() => removeProduct(product._id)}><img src={trash_can} alt="" className='trash-can'/></td>
              </tr>
            )
            }
            })}
            </table>
        </div>
    )
}

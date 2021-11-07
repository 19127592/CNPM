import React,{useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import { useParams, Link } from 'react-router-dom'
import Counter from "react-native-counters";
function Cart() {
    const state = useContext(GlobalState)
    const [cart] = state.userAPI.cart
    
    if (cart.length === 0)
        return <h2 style={{textAlign:"center",fontSize:"3rem"}}>Cart Empty</h2>
    
    return (
        <>
        <table className="customers">
          <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
            {
                cart.map(product =>{
                    return(
                        <tr>
                          <td><img src={product.images.url} alt=''/></td><td>{product.title}</td>
                          <td>{product.price}</td>
                          <td>{product.quantity}</td>
                          <td>{product.price*product.quantity}</td>
                        </tr>
                    )
                })
            }
            </table>
        </>
    )
}
export default Cart
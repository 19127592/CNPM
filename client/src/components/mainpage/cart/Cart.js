import React,{useContext, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import { useParams, Link } from 'react-router-dom'
import ReactDOM from 'react-dom'
import $ from 'jquery'

function Cart() {
    
    function incrementValue(e) {
    
        var fieldName = $(e.target).data('field');
        
        var parent = $(e.target).closest('div');
        var currentVal = parseInt(parent.find('input[name=' + fieldName + ']').val(), 10);
        console.log(parent.find('input[name=' + fieldName + ']'))
        if (!isNaN(currentVal)) {
          parent.find('input[name=' + fieldName + ']').val(currentVal + 1);
        } else {
          parent.find('input[name=' + fieldName + ']').val(0);
        }
      }
      
      function decrementValue(e) {
        e.preventDefault();
        var fieldName = $(e.target).data('field');
        var parent = $(e.target).closest('div');
        var currentVal = parseInt(parent.find('input[name=' + fieldName + ']').val(), 10);
      
        if (!isNaN(currentVal) && currentVal > 0) {
          parent.find('input[name=' + fieldName + ']').val(currentVal - 1);
        } else {
          parent.find('input[name=' + fieldName + ']').val(0);
        }
      }
      
      $('#button-plus').click(function(e) {
        console.log("Working")
        incrementValue(e);
      });
      
      $('.button-minus').click(function(e) {
        console.log("Working")
        decrementValue(e);
      });
    const state = useContext(GlobalState)
    const [cart] = state.userAPI.cart
    const [total,setTotal] = useState(0)

    if (cart.length === 0)
        return <h2 style={{textAlign:"center",fontSize:"3rem"}}>Cart Empty</h2>
        
    const quantityControl = (qty) =>{
        return(
            <>
                <div class="input-group">
                <input type="button" value="-" class="button-minus" data-field="quantity"/>
                <input type="number" step="1" max="" value="1" name="quantity" class="quantity-field"/>
                <input type="button" value="+" class="button-plus" data-field="quantity"/>
                </div>
            </>
        )
    }
    return (
        <>
        <table className="customers">
          <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th id='total'>Total</th>
          </tr>
            {
                cart.map(product =>{
                    return(
                        <tr>
                          <td><img src={product.images.url} alt=''/></td><td>{product.title}</td>
                          <td>{product.price}</td>
                            <td>
                                <div class="input-group">
                                <input type="button" value="-" class="button-minus" data-field="quantity"/>
                                <input type="number" step="1" max="" value="1" name="quantity" class="quantity-field"/>
                                <input type="button" value="+" class="button-plus" data-field="quantity"/>
                                </div>
                            </td>

                          <td>${total}</td>
                        </tr>
                    )
                })
            }
            </table>
            <div className='payment'>
              <Link to='/'>
                <input type="submit" value="Continue to checkout" class="btn"/>
              </Link>
            </div>
        </>
    )
}
export default Cart
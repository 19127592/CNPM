import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import { useParams, Link } from "react-router-dom";
import ReactDOM from "react-dom";
import trash_can from './iconmonstr-trash-can-1.svg'
import axios from 'axios'

function Cart() {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [token] = state.token
  const [total, setTotal] = useState(0);
  
  useEffect(() => {
    const calcTotal = () => {
      const total = cart.reduce((prev,item) => {
          return prev + (item.price * item.quantity)
      },0)
      setTotal(total)
    }
    calcTotal()
  }, [cart])

  const addToCart = async () => {
    await axios.patch('/user/addcart',{cart},{
      headers: {Authorization: token}
    })
  }

  const increment = (product_id) => {
    cart.forEach(item => {
      if (item._id === product_id) {
        item.quantity += 1
      }
    });
    setCart([...cart])
    addToCart()
  }

  const decrement = (product_id) => {
    cart.forEach(item => {
      if (item._id === product_id) {
        if(item.quantity > 1) item.quantity -= 1
        
      }
    });
    setCart([...cart])
    addToCart()
  }

  const removeItem = (product_id) => {
    if(window.confirm("Are you sure to remove this item from your cart?")){
      cart.forEach((item,index) => {
        if(item._id === product_id){
          cart.splice(index,1)
        }
      })
      setCart([...cart])
      addToCart()
    }
  }

  const removeCart = () => {
    if(window.confirm("Are you sure to remove your cart?")){
      cart.splice(0,cart.length)
      setCart([...cart])
      addToCart()
    }
  }

  if (cart.length === 0)
    return (
      <h2 style={{ textAlign: "center", fontSize: "3rem" }}>Cart Empty</h2>
    );
  return (
    <>
    <div>
      <table className="customers">
          <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th id="total">Total</th>
            <th onClick={() => removeCart()}><img src={trash_can} alt="" className='trash-can'/></th>
          </tr>
          {cart.map((product) => {
            return (
              <tr>
                <td>
                  <img src={product.images.url} alt="" className='img-item'/>
                </td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>
                  <div class="input-group">
                    <input
                      type="button"
                      value="-"
                      class="button-minus"
                      data-field="quantity"
                      onClick={() => decrement(product._id)}
                    />
                    <input
                      type="number"
                      step="1"
                      max=""
                      value={product.quantity}
                      name="quantity"
                      class="quantity-field"
                    />
                    <input
                      type="button"
                      value="+"
                      class="button-plus"
                      data-field="quantity"
                      onClick={() => increment(product._id)}
                    />
                  </div>
                </td>

                <td>${product.quantity*product.price}</td>
                <td onClick={() => removeItem(product._id)}><img src={trash_can} alt="" className='trash-can'/></td>
              </tr>
            );
          })}
      </table>
        <p className='total-price'>Total price: ${total}</p>
        <Link to="/cart/payment">
          <input type="submit" value="Continue to checkout" class="checkout" />
        </Link>
    </div>
    </>
  );
}
export default Cart;

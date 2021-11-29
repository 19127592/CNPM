import React,{useContext,useState,useEffect} from 'react'
import { GlobalState } from "../../../GlobalState";
import { useParams, Link } from 'react-router-dom'

export default function HistoryID() {
    const state = useContext(GlobalState);
    const params = useParams()
    const [orders,setOrders] =state.userAPI.orders
    const [history,setHistory] = useState([])
    const [total,setTotal] = useState(0);
    useEffect(() => {
        if(params.id){
            orders.forEach(order => {
                if(order._id === params.id) {
                setHistory(order.user_information.cart)
                setTotal(order.total)
            }})
        }
    },[params.id,orders])
    console.log(history)
    return (
        <div>
            <table className="customers">
          <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th id="total">Total</th>
          </tr>
          {history.map((product) => {
            return (
              <tr>
                <td>
                  <img src={product.images.url} alt="" className='img-item'/>
                </td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>${product.quantity*product.price}</td>
                
              </tr>
            );
          })}
      </table>
      <p className='total-price'>Total price: ${total}</p>
        </div>
    )
}

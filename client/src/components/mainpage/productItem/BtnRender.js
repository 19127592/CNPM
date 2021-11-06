import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
function BtnRender({product}) {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    return (
        <div className='row-btn'>
                <Link id="btn-buy" to="#!">
                    Buy
                </Link>
                <Link id="btn-view" to={'/detail/'+product._id}>
                    View
                </Link>
        </div>
)
}
export default BtnRender
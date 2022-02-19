import { useParams, Link } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import {GlobalState} from '../../../GlobalState'
export default function Cart() {
    const state = useContext(GlobalState);
    const [cart, setCart] = state.userAPI.cart;
    const [token] = state.token
    const [total, setTotal] = useState(0);
    console.log(cart)

    return (
        <div>
            Cart Components
        </div>
    )
}
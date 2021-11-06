import axios from 'axios'
import React,{useState, useEffect} from 'react'

export default function UserAPI(token) {
    const [Logged, isLogged] = useState(false)
    const [Admin,isAdmin] = useState(false)
    const [Seller,isSeller] = useState(false)
    const [cart,setCart] = useState([])
    useEffect(()=> {
        console.log("Working")
        if(token){
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/infor',{
                        headers: {Authorization: token}
                    })
                    isLogged(true)
                    if(res.data.role === 1) isAdmin(true)
                    if(res.data.role === 2) isSeller(true)
                    console.log(res)
                } catch (err) {
                    alert(err.response.data.msg)
                }
            }
            getUser()
        }
    },[token])

    const addCart = async(product) => {
        if(!isLogged) return alert('Please login to continue')

        const check = cart.every(item =>{
            return item._id !== product._id
        })
        if(check){
            setCart([...cart,{...product, quantity:1}])
        }
    }

    return {
        isLogged: [Logged,isLogged],
        isAdmin: [Admin, isAdmin],
        isSeller: [Seller,isSeller]
    }
}
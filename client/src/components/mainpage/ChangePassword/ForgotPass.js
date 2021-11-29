import React,{useContext,useState,useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import { Link } from "react-router-dom";
import axios from 'axios'
import {useHistory, useParams} from 'react-router-dom'
export default function ChangePassword() {
    const crypto = require('crypto')
    const history = useHistory()
    const state = useContext(GlobalState)
    const [token] = state.token
    const [infor,setInfor] = state.userAPI.infor
    const [users,setUsers] = state.userAPI.users
    const [check,setCheck] = useState(false)
    const [confirm,setConfirm] = useState([])
    const [pass,setPass] = useState('')

    useEffect(() => {
        
        getUsers()
    }, [])

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setConfirm({...confirm,[name]:value})
        if(name === "new-password"){
            setPass(value)
        }
    }
    const getUsers = async () => {
        const res = await axios.get('/user/users')
        setUsers(res.data.users)
    }
    const handleSubmit_Confirm = e =>{
        e.preventDefault()
        users.forEach((user) => {
            if(user.name === confirm.name && user.email === confirm.email){
                setCheck(true)
                setInfor(user)
            }
        })
    }
    const handleSubmit_Change = async e =>{
        e.preventDefault()
        
        if(check){
            if ((/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{6,14}$/.test(pass))) {
                var hashLogin = crypto.createHash('md5').update(pass).digest('hex');
                infor.password = hashLogin
            }else{
                alert("Minimum 6 and maximum 14 characters, at least one uppercase letter, one lowercase letter, one number and one special character")
                return
            }
            var hashLogin = crypto.createHash('md5').update(pass).digest('hex');
            infor.password = hashLogin
            try {
                await axios.put('/user/account/edit', {infor})
                window.alert("Update account successfully")
                history.push("/login")
            } catch (err) {
                alert(err.response.data.msg)
            }
        }
    }
    
    return (
        <div>
            <div className='old-pass'>
                <form onSubmit={handleSubmit_Confirm}>
                    <div>
                    Email
                    <input type="text" name="email" onChange={handleChangeInput}/>
                    </div>
                    <div>
                    Name
                    <input type="text" name="name" onChange={handleChangeInput}/>
                    </div>
                        <button type="submit">Confirm</button>
                </form>
            </div>
            {
                check?
                <div className='new-pass'>
                    <form onSubmit={handleSubmit_Change}>
                    New Password
                        <input type="text" name="new-password" onChange={handleChangeInput}/>

                        <button type="submit">Confirm</button>
                    </form>
                </div>:""
            }
        </div>
    )
}

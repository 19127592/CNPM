import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
export default function Login() {
    
    const [user,setUser] = useState("")
    const [password,setPassword] = useState("")

    const setUserPassword = e => {
        const {name,value} = e.target;
        setUser({...user,[name]:value})
    }
    const login = async e => {
        e.preventDefault()
        try{
            await axios.post('/user/login',{...user})
            localStorage.setItem('firstTime_Login',true)
            window.location.href = "/";
        } catch(err){
            alert(err.response.data.msg)
        }
    }
    return (
        //FE (Thu)
        <div className='login-page'>
            <form onSubmit={login}>
                <input type="email" name="email" required
                 placeholder='Email address' value={user.email} onChange={setUserPassword} />
                <input type="password" name="password" required autoComplete='on'
                 placeholder='Password' value={user.password} onChange={setUserPassword}/>
                <div className='row'>
                    <button type='submit'>Login</button>
                    <Link to="/register">Register</Link>
                </div>
            </form>
        </div>
    )
}

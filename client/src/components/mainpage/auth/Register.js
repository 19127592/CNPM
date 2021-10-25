import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
export default function Register() {

    const [name,setName] = useState("")
    const [user,setUser] = useState("")
    const [password,setPassword] = useState("")

    const setUserPassword = e => {
        const {name,value} = e.target;
        setUser({...user,[name]:value})
    }
    const register = async e => {
        e.preventDefault()
        try{
            await axios.post('/user/register',{...user})
            localStorage.setItem('firstTime_Login',true)
            window.location.href = "/";
        } catch(err){
            alert(err.response.data.msg)
        }
    }
    return (
        <div className='login-page'>
            <form onSubmit={register}>
            <input type="name" name="name" required
                 placeholder='Your Name' value={user.name} onChange={setUserPassword} />

                <input type="email" name="email" required
                 placeholder='Email address' value={user.email} onChange={setUserPassword} />

                <input type="password" name="password" required autoComplete='on'
                 placeholder='Password' value={user.password} onChange={setUserPassword}/>

                <div className='row'>
                    <button type='submit'>Register</button>
                    <Link to="/register">Login</Link>
                </div>
            </form>
        </div>
    )
}

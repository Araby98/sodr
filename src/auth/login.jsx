import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const navigate=useNavigate()
    useEffect(() => {
            const jwtToken = localStorage.getItem('jwtToken');
            if (jwtToken) {
              // User is already logged in, redirect to the products page
              navigate('/products');
            }
          }, []); 

    const handleLogin= async(e)=>{
        e.preventDefault();
        try {
            const response= await axios.post("http://127.0.0.1:8000/api/login",{email,password});
            if (response.data && response.data.token) {
                // Store the token in local storage
                localStorage.setItem('jwtToken', response.data.token);
                setEmail("");
                setPassword("");
                navigate("/products");
            }
        } catch (error) {
            if (error.response && error.response.status === 401 && error.response.data.message === 'Token has expired') {
                // Token has expired, redirect to the login page
                localStorage.removeItem('jwtToken'); // Remove the expired token
                navigate('/login');
              } else {
                console.log('errordd:', error);
              }
        }
    }
  return (
    <div className='container'>
         <div class="card text-start">
            <center><h1>Login Form</h1></center>
           <div class="card-body" >
            <form onSubmit={handleLogin}>
                <div class="mb-3">
                <label  class="form-label">Email</label>
                <input type="email" class="form-control"  onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div class="mb-3">
                    <label  class="form-label">Password</label>
                    <input type="password" class="form-control" onChange={(e)=>{setPassword(e.target.value)}} />
                </div>
               <div style={{display:'flex',justifyContent:"space-between"}}>
                    <Link to={"/register"} className="btn btn-primary"> Register Here</Link>
                    <button type="submit" className="btn btn-primary"> Login</button>
               </div>
                
            </form>
           </div>
         </div>
    </div>
  )
}

export default Login
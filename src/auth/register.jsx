import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
    const [name,setName]=useState()
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const [passConfirm,setPassConfirm]=useState()
    const navigate=useNavigate()
   

    const handleRegister= async(e)=>{
        e.preventDefault();
        try {
            const response= await axios.post("http://127.0.0.1:8000/api/register",{name,email,password,password_confirmation:passConfirm});
                setEmail("");
                setPassword("");
                navigate("/login");
        } catch (error) {
                console.log('errordd:', error);
              }
        }

    
  return (
    <div className='container'>
    <div className="card text-start">
        <center><h1>Register Form</h1></center>
      <div className="card-body">
       <form onSubmit={handleRegister}>
           <div className="mb-3">
            <label  className="form-label">Name</label>
            <input type="text" className="form-control"  onChange={(e)=>{setName(e.target.value)}}/>
           </div>
           <div className="mb-3">
            <label  className="form-label">Email</label>
            <input type="email" className="form-control"  onChange={(e)=>{setEmail(e.target.value)}}/>
           </div>
           <div className="mb-3">
               <label  className="form-label">Password</label>
               <input type="password" className="form-control" onChange={(e)=>{setPassword(e.target.value)}} />
           </div>
           <div className="mb-3">
               <label  className="form-label">Password</label>
               <input type="password" className="form-control" onChange={(e)=>{setPassConfirm(e.target.value)}} />
           </div>
          <div style={{display:'flex',justifyContent:"space-between"}}>
                <Link to={"/login"} className="btn btn-primary"> Back to Login</Link>
                <button type="submit" className="btn btn-primary"> Register</button>
          </div>
           
       </form>
      </div>
    </div>
</div>
  );
}
export default Register
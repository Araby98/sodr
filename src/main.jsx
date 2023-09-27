import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./main.css"
function Main() {
    const navigate=useNavigate()
    const handleLogout = () => {
        // Clear the JWT token from local storage
        localStorage.removeItem('jwtToken');
        // Redirect the user to the login page
        navigate("/login");
    };
   
  
   
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div style={{display:"flex", justifyContent:"space-between", cursor: "pointer", backgroundColor: "yellow" ,}}>
      <ul className="navbar-nav" >
        <li className="nav-item-active" >
          <a className="btn btn-secondary" onClick={handleLogout} >Logout</a>
          
        </li>
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Main
import './nav.css';
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import React,{useState} from 'react';
import { useEffect } from 'react';
import Product from "./pages/product.js";


export default function Navbar() {
     const [LoggedIn, setLoggedIn] = useState(false);

useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    // handle logout logic
   
    Cookies.remove('token');
    
    setLoggedIn(false);
  };


    return( 
      //<div className='home'>
        
        <nav className="navbar">
          <div className="navbar-logo">
            <img alt='' src="https://cdn.shopify.com/s/files/1/0564/7420/6346/files/Logo_3_1200x1200.png?v=1661945594"></img>
          
          </div>
          <div className='list'> 
          <ul className="navbar-links">
            <li>
              <Link to="/api/addproduct">Product</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
          </div>
          <div className="navbar-buttons">
            {LoggedIn ? (
              <>
               <Link to="/api/Cart">
                
                <img src={require('./images/cart.jpg')} alt="Logo" className="logo" />
             
             </Link> 
              <button className="nav12-item dropdown">
              <img src={require('./images/drop.png')} alt="Logo" className="logo" />            

                                            {/* <i className="fa fa-caret-down"></i> */}
                                            <div className="dropdown-content">
                                                <Link to="/api/profile">Profile</Link>
                                                <Link to="/">
                                                <p onClick={handleLogout}>logout</p>
                                               </Link>  
                                            </div>
                                        </button>
                                      
                                         {/* <Link to="/"> 
                  <button className="navbar-button" onClick={handleLogout}>
                     Logout  */}
                 {/* <img src={require('./images/logout4.jpg')} alt="Logo" className="logo1" />             */}

                {/* </button>
                </Link> */}
               
                
               
              </>
            ) : (
              <>
                <Link to="/api/login">
               {/* <button className="navbar-button"> */}
                  {/* Login */}
                 <img src={require('./images/login.jpg')} alt="Logo" className="logo" /> 
                {/* </button>
                   */}
                 </Link>
                {/* <Link to="/api/Cart">
                <button className="navbar-button">
                   <img src={require('./images/cart.jpg')} alt="Logo" className="logo" />
                </button>
                </Link>  */}
              </>
            )}
          </div>
        </nav>
      
    )
            }

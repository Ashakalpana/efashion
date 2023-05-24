import React,{startTransition, useState } from "react";
import axios from'axios';
import "../styles/page.css";
import { Navigate } from "react-router-dom";
const host = process.env.REACT_APP_SERVER_URL;

export const Login=(props)=>{
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [create,setCreate]=useState(false);
    
    // user submit the form that's were the function handle
    const handleSubmit=async(e)=>{
        // fun we passed to handlesubmit is the event so calling 
        e.preventDefault();
       
        try{
            const response=await axios.post(`${host}api/Login`,{
                email,
                password,
                
            });
            setCreate(true);
            
            console.log(response)
            //token should be recived in response
            // set the token as a cookie
            document.cookie=`token=${response.data.ticket};path=/;SameSite=lax`;
            // redirect to the dashboard page
            // window.location.href='/dashboard';
            console.log("login successful")
            // alert("login successfull")
            setTimeout(() => {
                window.location.href= "/";
            }, 1000);
            
           
                }catch(errors){
            console.log(errors);
            // alert("credentials didnt match")
        }
    };
        
        

    
    return (
        <div className="auth-form-container">
            <h2>LOGIN</h2>
    <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type ="email" placeholder= "example@gmail.com" id="email"name="email" required/><br/>
        <label htmlFor="password">Password</label>
        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" required/><br/>
        <button type="submit">Log In</button>
    </form>
    
    <a className="link-btn" href="./entry" >Don't have an Account?Register here</a>
        { create && <p>logged in Successfully!!!</p>}
    </div>
    )
        
}
import React,{useState}from "react";
import Axios from'axios';
import "../styles/page.css";
const host = process.env.REACT_APP_SERVER_URL;
export const Register=(props)=>{
    const [email, setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[phone,setPhone]=useState('');
    const[FirstName,setFirstName]=useState('');
    const[LastName,setLastName]=useState('');
    const [create,setCreate]=useState(false);
    const handleSubmit=async(e)=>{
        e.preventDefault();
        // console.log(email);
        try{
            const response= await Axios.post(`${host}api/entry`,{
                FirstName,
                LastName,
                email,
                phone,
                password,
            });
            setCreate(true);
            console.log(response.data);
            setTimeout(() => {
                window.location.href= "/api/login";
            }, 1000);
            // alert("registerd successfull")
            // should be recive a success message
            // redirect to the login page
            // window.location.href='/login';
            // console.log("login successful")
        }
        catch(errors){
            console.log(errors);
            // alert("user already registerd")

        }
    }
        
    
    return (
    <div className="auth-form-container">
        <h2>REGISTER</h2>
    <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor >FirstName</label>
        <input value={FirstName} onChange={(e)=>setFirstName(e.target.value)} name="FirstName" id="FirstName" placeholder="First Name"/>
        <label htmlFor >LastName</label>
        <input value={LastName} onChange={(e)=>setLastName(e.target.value)} name="LastName" id="LastName" placeholder="Last Name"/>
        <label htmlFor="email">Email</label>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type ="email" placeholder= "Example@gmail.com" id="email"name="email"/>
        <label htmlFor="phone">Mobile No.</label>
        <input value={phone} onChange={(e)=>setPhone(e.target.value)} type ="phone" placeholder= "0000000000" id="phone"name="phone"/>
        <label htmlFor="password">Password</label>
        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="Password" placeholder="********" id="password" name="password"/>
        <button type="submit">Register</button>
    </form>

    <a className="link-btn" href="./login" >Already have an Account?login here</a>
    { create && <p>registration in Successfully!!!</p>}
    </div>
    
    )
}

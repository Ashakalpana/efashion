import React,{useState}from "react";
import Axios from'axios';
import Cookies from "js-cookie";
// import "../styles/page.css";
import '../styles/profile.css'
import { Link } from 'react-router-dom';
const host = process.env.REACT_APP_SERVER_URL;
function Address(){
    const [Houseno, setHouseno]=useState('');
    const[city,setCity]=useState('');
    const[state,setState]=useState('');
    const[country,setCountry]=useState('');
    const[PinCode,setPinCode]=useState('');
    const[success,setSuccess]=useState(false);
    const [unsuccess,setUnsuccess]=useState(false);
    const token=Cookies.get('token')
    const handleSubmit=async(e)=>{
        e.preventDefault();
        // console.log(email);
        try{
            const response= await Axios.post(`${host}api/addaddress`,{
              Houseno,
                city,
                state,
                country,
                PinCode,
        },
        {
           headers:{auth:token}
        }
     
            );
            
            console.log(response)
            if (response!==400){
                setSuccess(true);
                setUnsuccess(false);
                setTimeout(()=>{
                    window.location.href='/api/profile';//replace '/home' with your home page url
                },2000)
            }
            
            
        }
        catch(errors){
             console.log('xyz');
            setSuccess(false)
            setUnsuccess(true)
           
        }
    }
        
    
    return (
        <div className="auth-form-container">
          <h1>Address</h1>
        <form className="address-form"  onSubmit={handleSubmit}>
          {/* <h2>Update Your Address</h2> */}
  
          <div>
            <label htmlFor="Houseno">Houseno</label> {/* Fix label htmlFor attribute */}
            <input
              type="number"
              id="Houseno"
              value={Houseno}
              placeholder="Houseno"
              onChange={(e) => setHouseno(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              value={city}
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              value={state}
              placeholder="State"
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="PinCode">PinCode</label>
            <input
              type="number" // Change type to "text" to allow alphanumeric codes
              id="PinCode"
              placeholder="PinCode"
              value={PinCode}
              onChange={(e) => setPinCode(e.target.value)}
              required
            />
          </div>
          <button type="submit" >Update</button>
          {success && <b>Address updated successfully.</b>}
          {unsuccess && <b>Failed to update address.</b>}
        </form>
      </div>
    );
}
export default Address;
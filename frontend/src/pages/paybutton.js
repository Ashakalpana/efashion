import React, { useEffect, useState } from 'react';

import axios from "axios";
import Cookies from "js-cookie";
const host = process.env.REACT_APP_SERVER_URL;
const Paybutton=({state,addressList})=>{
    const token =Cookies.get('token')
    const[id,setId]=useState('')
    useEffect(() => {//Hook allows you to perform side effects in your components.
        const fetchData = async () => {
          try {
            const response = await axios.get(`${host}api/profile`, {
              headers: { auth: token },
          
            });
        //   const data= await response.json();
        //   console.log("ia am",data)
        //   console.log(data._id)
          setId(response.data._id);
        //   console.log(data._id)
         } catch (error) {
           
            console.log(error.message);
          }
        };
        fetchData();
      }, []);
      
    const handlecheckout=()=>{

axios.post(`${host}api/checkout`,{
    state,id,addressList
}).then((res)=>{
    if(res.data.url){
        window.location.href=res.data.url
    }
})
.catch((err)=>console.log(err.message))

    };
    return(
     
        <button onClick={ ()=>handlecheckout()}>checkout</button>
        
        
    );
};
export default Paybutton;

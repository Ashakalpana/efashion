import React from "react";
 import '../styles/success.css';
// const history = useHistory();

const checkout1=() =>{

    const handleorder=()=>{

       window.location.href="/getorders"
       localStorage.removeItem('cart')
    }
    const handleShopping=()=>{
      window.location.href="/api/addproduct"
      localStorage.removeItem('cart')
    }
    
  
    return (
       <div className='success'>
         <h1 className='payment'>payment successfull</h1>
           <p>Thank you for your order!</p>
           <button className='details1' onClick={handleorder}>Details </button>
           <button className='continue' onClick={handleShopping}>Continue Shopping</button>
         
          
       </div>
   
    )
   }
   export default checkout1;





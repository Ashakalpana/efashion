
const Cancelpage=() =>{
    const handlecancel=()=>{
       window.location.href="/api/Cart"
    }
    return (
        <div className='cancel'>
         <p>Sorry, </p>
            <p>Unfortunately your payment for this order has failed.</p>
            <button className='details1' onClick={handlecancel}>Try again  </button>
           
          
           
        </div>
)}
export default Cancelpage;
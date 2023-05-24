import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import '../styles/product.css';
import axios from'axios';
const host = process.env.REACT_APP_SERVER_URL;

const Product = () => {
  
  const [userProduct, setUserProduct] = useState([]);
  const [type, setType] = useState(false);
  
   
  
  const [rate, setRate] = useState('');
  const [showmessage,setShowMessage] = useState('');
  
  const[userid,setUserid]=useState({})
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchUserProduct = async () => {
        try {
            const response = await axios.get(`${host}api/getproduct`);
            console.log(response.data);
            if (response.    status === 200) {
              setUserProduct(response.data);
            }
          } catch (error) {
            console.log('error in response');
          }
        };
        fetchUserProduct();
      }, []);
     
    
      const handleFilter = (event) => {
        setType(event.target.value);
      };
    
    
      const handleCart = (event, product) => {
        event.preventDefault(); // prevent default form submission behavior
    

      console.log("hii")
        if (!token) {
          setShowMessage(true);
          console.log("hii i am in if block")
          setTimeout(() => {
            setShowMessage(false);
            window.location.href="/api/login"
          }, 3000);
        } else {
          setShowMessage(true);
          console.log("hii i am in else block")
          setTimeout(() => {
            setShowMessage(false);
          }, 1000);
      
         
          

       // Get existing cart from local storage
      const cartJson = localStorage.getItem('cart');
      const cart = cartJson ? JSON.parse(cartJson) : [];
   
      
          // Append new product to cart
          const newProduct = {...product,quantity:1,userid};
      const newCart = [...cart, newProduct];
      
          // Convert cart array to JSON string
          const newCartJson = JSON.stringify(newCart);  
      
          // Set new cart JSON string to local storage
         localStorage.setItem('cart', newCartJson);
        

        }
      };
      
    
      const handleRate = (event) => {
        setRate(Number(event.target.value));
      };
    
      const filteredproducts = userProduct.filter((data) => {
        return (!type || data.category === type) && (!rate || data.price <= rate);
      });
    


    // const  filteredproducts = type ? userProduct.filter((data)=>data.catagory===type) : userProduct;



  return (
    <div className='btn6'>
   <div className='btn'>
   <div className='dropdown'>
    <button>Filter:</button>
          <select onChange={handleRate}>
            <option value=''>All</option>
            <option value='300'>Less than Rs. 300</option>
            <option value='500'>Less than Rs. 500</option>
            <option value='1000'>Less than Rs. 1000</option>
            <option value='1500'>above Rs. 1500</option>
          </select> 
        </div>
    <button value="" onClick={handleFilter}> All</button>
  <button value='mens' onClick={handleFilter}>mens</button>
  <button value='kids' onClick={handleFilter}>kids</button>
  <button value='womens' onClick={handleFilter}>womens</button>
  </div>
  {showmessage &&  (token ? (
        <div className='notification'>Product added to cart</div>
      ) : (
        <div className='notification'>Please login...</div>
        ))}
    <div className= "shopping-cards"> 
      { filteredproducts.map((data,index)=> (// create a new array from calling a function for every array element 
        <form className='product' key={index}>
          <img src={data.image}></img>
          <p className="product_no">{data.product_no}</p>
          <p className='Description'> {data.Description}</p>
          <p className='price'>{data.price}</p>
          <p className='catagory'>{data.catagory}</p>
          <button onClick={(event)=>handleCart(event,data)}>ADD TO CART</button>
        </form>
      ))}
    </div>
    </div>
  );
}


export default Product;



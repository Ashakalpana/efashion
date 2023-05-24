
import React, { useEffect, useState } from 'react';
import "../styles/cart.css"
import Cookies from 'js-cookie';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Paybutton from '../pages/paybutton';
const host = process.env.REACT_APP_SERVER_URL;
const Cart = () => {
  const [state, setState] = useState([]);
  const [addressList, setAddressList] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [emailid, setEmailid] = useState('');
  const token = Cookies.get('token');
  const[userdata,setUserData]=useState({})
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${host}api/profile`, {
          headers: { auth: token },
        });

        if (response.status === 200) {
          setUserData(response.data);
          console.log(response.data);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          Cookies.remove('token');
          alert('Requested time out. Please log in again');
          window.location.href = '/login';
        }
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          alert("Please log in once again");
          window.location.href = "api/login";
        } else {
          const cartJson = localStorage.getItem('cart');
          const cart = JSON.parse(cartJson);
          if(!cart){
          console.log('no product added')
          }else{
          setState(cart);
          }
        }
      } catch (error) {
        console.log('Error in response');
      }
    };
    fetchData();
  }, [token,emailid]);

  useEffect(() => {
    let total = 0;
    let count = 0;
    if (state) {
      state.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;
      });
    }
    setCartTotal(total);
    setCartCount(count);
  }, [state]);

  const handleRemove = (index) => {
    const updatedCart = [...state];
    updatedCart.splice(index, 1);
    setState(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  useEffect(() => {
    const fetchuserid= async () => {
      try {
        const response = await axios.get(`${host}api/get_address`, {
          headers: { auth: token },
        });

        if (response.status === 200) {
          setAddressList(response.data);
          setEmailid(response.data.email);
          
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          Cookies.remove('token');
          alert('Requested time out. Please log in again');
          window.location.href = '/login';
        }
        console.log(error);
      }
    };

    fetchuserid();
  }, []);
  const handleClearCart = () => {
    setState([]);
    setCartCount(0);
    setCartTotal(0);
    localStorage.removeItem('cart');
  }

  const handleQuantityChange = (index, value) => {
    const updatedCart = [...state];
    updatedCart[index].quantity += value;

    if (updatedCart[index].quantity < 1) {
      updatedCart[index].quantity = 1;
    }

    setState(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }
  

  const handleChangeaddress = (event)=>{
    setSelectedAddress(event.target.value)
    console.log("i am selected ",selectedAddress)
  }

  return (
    <div className="cart-container">
      <div className="cart">
        <h2>My Cart</h2>
        {state && state.length === 0 ? (
          <div>
          <p>Your cart is empty</p>
          
          </div>
        ) : (
          <>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {state?.map((data, index) => (
                  <tr key={index}>
                    <td>{data.Description}</td>
                    <td>
                      <img src={data.image} alt={data.description} />
                    </td>
                    <td>{data.price}/-</td>
                    <td>
                      <div className="quantity">
                        <button className="quantity-btn" onClick={() => handleQuantityChange(index, -1)}>-</button>
                        <p>{data.quantity}</p>
                        <button className="quantity-btn" onClick={() => handleQuantityChange(index, 1)}>+</button>
                      </div>
                    </td>
                    <td>{data.price * data.quantity}/-</td>
                    <td>
                      <button className="remove-btn" onClick={() => handleRemove(index)}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="order-summary">
              <div className="card">
                <h5 className="text-center">Order Summary</h5>
                <hr />
                <div className="subtotal">
                  <h4>No of items: </h4>
                  <h4>{cartCount}</h4>
                </div>
                <div className="subtotal">
                  <h4>Subtotal: </h4>
                  <h4>{cartTotal}/-</h4>
                </div>
                <div className="delivery-charges">
                  <h4>Delivery Charges:</h4>
                  <h4 className="free-shipping">FREE</h4>
                </div>
                <div className="total">
                  <h4>Total:</h4>
                  <h4>{cartTotal}/-</h4>
                </div>
                <hr />
                <div className="fixed-top-right8">

                  <option value="">Select Address</option>
                  <select
                    className='address-dropdown'
                    onChange={handleChangeaddress}
                  >      
                      <option value="">select address</option>
                      {/* {addressList && addressList.length > 0 ? ( */}
                       {addressList && Array.isArray(addressList) && addressList.length > 0 ? ( 
                      // {addressList && addressList.length > 0 ? (
                        addressList.map((address) => (
                          <option key={address._id} value={JSON.stringify(address)}>
                            {address.Houseno}, {address.city}, {address.state}, {address.country},{"..."}
                          </option>
                        ))
                      ) : (
                        <option>No addresses found</option>
                      )}

                    </select>
                    
                      <div>

                        <Paybutton state={state} addressList={selectedAddress} />
                        <button onClick={handleClearCart} className="clear">
                          Clear Cart

                        </button>
                       
                                              </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default Cart;



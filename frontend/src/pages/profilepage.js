import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/profile.css';
import Address from './address';
const host = process.env.REACT_APP_SERVER_URL;

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [addressList, setAddressList] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [success, setSuccess] = useState(false);
  const [Houseno, setHouseno] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [PinCode, setPinCode] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [addAddress, setAddAddress] = useState(false);
  const [unsuccess, setUnsuccess] = useState(false);
  const [addform, setADDForm] = useState(true);
  const token = Cookies.get('token');

  // Fetch user data
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

  // Fetch address data
  useEffect(() => {
    const fetchAddressData = async () => {
      try {
        const result = await axios.get(`${host}api/get_address`, {
          headers: { auth: token },
        });

        if (result.status === 200) {
          setAddressList(result.data);
          if (result.data.length > 0) {
            setSuccess(result.data.length > 0);
          }

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

    fetchAddressData();
  }, [addressList]);

  
  const handleDeleteAddress = async (event, addressId) => {
    event.preventDefault();
    try {
      const response = await axios.delete(
        `${host}api/deleteaddress/${addressId}`
      );

      if (response.status === 200) {
        setAddressList(addressList.filter((address) => address._id !== addressId));
      }

    } catch (error) {
      console.log(error);
    }
  };

  const handleEditAddress = (address) => {
    setSelectedAddressId(address._id);
    setHouseno(address.Houseno);
    setCity(address.city);
    setState(address.state);
    setCountry(address.country);
    setPinCode(address.PinCode);
    setFormOpen(true);
    setADDForm(false);
  };

  const handleAddAddress = () => {
    setSelectedAddressId('');
    setHouseno('');
    setCity('');
    setState('');
    setCountry('');
    setPinCode('');
    setFormOpen(true);
    setADDForm(true);
  };

  const handleUpdateAddress = async (event, addressId) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `${host}api/editaddress/${addressId}`,
        {
          Houseno,
          city,
          state,
          country,
          PinCode,
        },
      );

      if (response.status === 200) {
        const updatedAddress = {
          _id: addressId,
          Houseno,
          city,
          state,
          country,
          PinCode,
        };

        setAddressList(
          addressList.map((address) =>
            address._id === addressId ? updatedAddress : address
          )
        );
        setAddAddress(true);
        setUnsuccess(false);
        setTimeout(() => {
          setFormOpen(false);
          setAddAddress(false);
        }, 2000);
      }

    } catch (error) {
      console.log(error);
      setUnsuccess(true);
      setTimeout(() => {
        setUnsuccess(false);;
      }, 2000);;
    }
  };

  const handleCancel = () => {
    setFormOpen(false);
  };

  return (
    <div className='homediv'>
      <div className='container-tag'>
        <h1 className='head'> My Profile</h1>
        <div className='info'>
          <p>Name: {userData && `${userData.FirstName.toUpperCase()} ${userData.LastName.toUpperCase()}`}</p>
          <p>Email: {userData && userData.email}</p>
          <p>Phone: {userData && userData.phone}</p>
        </div>
        <div className='address'>
          <h2>Address</h2>
          <div className='address-tags'>
            <table>
              <thead>
                <tr>
                  <th>Houseno</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Country</th>
                  <th>PinCode</th>
                  <th>Remove</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
              
                 { addressList.length > 0 ? (
                    addressList.map((address, index) => (
                      <tr key={index}>
                        <td>{address.Houseno}</td>
                        <td>{address.city}</td>
                        <td>{address.state}</td>
                        <td>{address.country}</td>
                        <td>{address.PinCode}</td>
                        <td className='remove'>
                          <button className='rem' onClick={(event) => handleDeleteAddress(event, address._id)}>
                            Remove
                          </button>
                        </td>
                        <td>
                          <button onClick={() => handleEditAddress(address)}>
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7"><b>Address not found or added</b></td>
                    </tr>
                  )
                  }
              </tbody>
            </table>
          </div>

          <div className='address-button'>
            <button onClick={handleAddAddress}>ADD ADDRESS</button>
          </div>
        </div>
        <div className='formaddress'>
          {formOpen && (
            <div className='form-tag'>
              {addform ? (
                 < Address />
              ) : (
                <form className='formprofile' onSubmit={(event) => handleUpdateAddress(event, selectedAddressId)}>
                  <h3 className='head2'>UPDATE ADDRESS</h3>
                  <label>
                    Houseno:
                    <input
                      type='number'
                      value={Houseno}
                      onChange={(e) => setHouseno(e.target.value)}
                    />
                  </label>
                  <label>
                    city:
                    <input
                      type='text'
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </label>
                  <label>
                    state:
                    <input
                      type='text'
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </label>
                  <label>
                    country:
                    <input
                      type='text'
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </label>
                  <label>
                    PinCode:
                    <input
                      type='number'
                      value={PinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                    />
                  </label>
                  <div className='form-buttons'>
                    <button type='submit'>Update</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </div>
                  <div className='msg-div'>
                    {addAddress && <p className='success'>Address updated successfully!</p>}
                    {unsuccess && <p className='error'>Failed to update address.</p>}</div>
                </form>
              )}

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
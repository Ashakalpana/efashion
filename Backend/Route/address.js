import express from "express";
import{allverifytoken} from "../middleware/middleware.js";
import {Address} from "../model/address.js"
import { usermodel } from "../model/schema.js";

export const router = express.Router()
router.get('/get_address', allverifytoken, async (req, res) => {//allverifytoken used to verify the validity of the jwt sent in the request headder
    try {
      const userAddresses = await usermodel.find({ user_id: req.id });
      const recieve = await Address.find({ user_id: req.id });
      if (!userAddresses) {
        return res.status(404).json({ message: 'User addresses not found' });
      }
      res.status(200).send( recieve );
     
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });


  router.post('/addaddress', allverifytoken, async (req, res) => {
    try {
      // Check if all required fields are present
       const { Houseno, city, state, country, PinCode } = req.body;
      if (!Houseno  || !city || !state || !country || !PinCode) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      const existingAddress = await Address.findOne({
        // user_id: req.id,
        Houseno: req.body.Houseno,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        PinCode: req.body.PinCode
      });
      const userAddress = await Address.create ({
        user_id: req.id,
        Houseno: Houseno,
        city: city,
        state: state,
        country: country,
        PinCode: PinCode,
      });
  

      
      if (existingAddress) {
        return res.status(400).json({ message: 'Address already exists' });
      }
      res.status(201).json(userAddress); //201 create
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
router.delete("/deleteaddress/:addressId",  async (req, res) => {
  try {
    const addressId = req.params.addressId;
    // Check if the address exists
    const address = await  Address.findOne({ _id: addressId });
    if (!address) {
      return res.status(404).json({ status: 'error', message: 'Address not found' });
    }
    // Delete the address
    await  Address.deleteOne({ _id: addressId });

    res.status(200).json({ status: 'success', message: 'Address deleted successfully' });
  }catch (error) {
    console.log(error);
    return res.status(500).send({ errors: "Internal server error" });
  }
});


router.put("/editaddress/:addressId",  async (req, res) => {
  try {
  
    const addressId = req.params.addressId;
    const { Houseno, city, state, country, PinCode } = req.body;

    // Check if the address exists
    const address = await  Address.findOne({ _id: addressId });
    if (!address) {
      return res.status(404).json({ status: 'error', message: 'Address not found' });
    }

    // Update the address
    await Address.updateOne(
      { _id: addressId },
      { $set: { Houseno, city, state, country, PinCode } }
    );

    res.status(200).json({ status: 'success', message: 'Address updated successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ errors: "Internal server error" });
  }
});
  });

//     //delete address 
//     router.delete('/deleteaddress/:addressid', allverifytoken, async (req, res) => {
//       try {
//         const deletedAddress = await Address.findOneAndDelete(
//           { _id: req.params.addressid,user_id: req.id } // Find the address to delete by ID and user ID
//         );
    
//         if (!deletedAddress) {
//           return res.status(404).json({ message: 'Address not found' });
//         }
    
//         res.status(200).json({ message: 'Address deleted successfully' }); //ok
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//       }
//     });
//   });
//   //edit address
//   router.put('/editaddress/:addressid', allverifytoken, async (req, res) => {
//     try {
//       // Check if all required fields are present
//       const { Houseno, city, state, country, PinCode } = req.body;
//       if (!Houseno  || !city || !state || !country || !PinCode) {
//         return res.status(400).json({ message: 'All fields are required' });
//       }
  
//       const updatedAddress = await Address.findOneAndUpdate(
//         { _id: req.params.addressid, user_id: req.id }, // Find the address to update by ID and user ID
//         {
//           Houseno: Houseno,
//           city: city,
//           state: state,
//           country: country,
//           PinCode: PinCode,
//         },
//         { new: true } // Return the updated address
//       );
  
//       if (!updatedAddress) {
//         return res.status(404).json({ message: 'Address not found' });
//       }
  
//       res.status(200).json({ address: updatedAddress });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server Error' });
//     }
//   });

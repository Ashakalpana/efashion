import express from "express";

import {ordermodel} from "../model/orderschema.js";
import  {allverifytoken}  from "../middleware/middleware.js";
export const orderrouter=express.Router() ;
orderrouter.get('/getorders', allverifytoken,
async (req, res) => {
  try{
    const neworder= await ordermodel.find({userId:req.id})
    res.send(neworder)
    console.log(neworder)
  }
  catch(error) {
    console.log(error);
  }
})

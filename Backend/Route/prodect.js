import express from "express";

import {productmodel} from "../model/productschema.js";
export const productRouter=express.Router()
productRouter.post("/addproduct", 
    async (req, res) => {
try{


        const userentry = await productmodel.create({
          product_no: req.body.product_no,
          image: req.body.image,
          Description: req.body.Description,
          price: req.body.price,
          catagory:req.body.catagory,
        });
        res.send(userentry)
      
           
      }
      catch(error){
        console.log(error);
      }
    })
//get products
productRouter.get('/getproduct',
async (req, res) => {
  try{
    const userentry= await productmodel.find({})
    res.send(userentry)
  }
  catch(error) {
    console.log(error);
  }
})
import express from "express"; 

import {usermodel} from "../model/schema.js";
import {  body, validationResult } from "express-validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export const register=express.Router()
// random string
const  JWT_RANDOM_STR="cricket"

// used for creation of user entry for database
register.post('/entry',
body("FirstName",'enter propername').isLength({min:2}),
body("LastName",'enter propername').isLength({min:1}),
body("email",'enter valid email').isEmail(),
body("phone",'enter correct phone number').isLength({min:10,max:10}),
body("password",'enter proper password').isLength({min:5}),
async(req,res)=>
{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});}

    const emailExist= await usermodel.findOne({email:req.body.email})
    if(emailExist){
return res.status(401).json({status:"errors" , message:"user already exist.please login"});
    }
// Store hash in your password DB.
    const secpasswd = await bcrypt.hash(req.body.password,5);
    const userentry= await usermodel.create({
       FirstName:req.body.FirstName,
       LastName:req.body.LastName,
        email:req.body.email,
         phone:req.body.phone,
        password:secpasswd
    })  

    console.log(userentry)
    // unique data
    let data={
        id:userentry._id
    }
    let token = jwt.sign(data,JWT_RANDOM_STR);
    res.send("successfully login")
})


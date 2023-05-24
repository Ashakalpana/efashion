import express from "express";
import{allverifytoken} from "../middleware/middleware.js";
import { usermodel } from "../model/schema.js";
// import { body, validationResult } from "express-validator";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
export const profile = express.Router()
profile.get("/profile",allverifytoken,
async(req,res)=>{
    

    try{
        const user=await usermodel.findOne({_id:req.id},{_id:1,FirstName:1,LastName:1,email:1,phone:1})
        if(!user){
            return
            // res.status(400).send({errors:"authontecation  wrong"})
        }
        res.status(200).send(user)
    }
    catch(errors)
    {
        res.status(400).send({errors:"some intervels server error"})
    }
}
);
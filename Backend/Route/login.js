import express from "express";

import { usermodel } from "../model/schema.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const  JWT_RANDOM_STR="cricket"
export const login = express.Router()
login.post('/Login',
    body("email", 'enter valid email').isEmail(),
    body("password", 'password can not be empty'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() })
        }
    try {
            const userdoc = await usermodel.findOne(
                { email: req.body.email})
                // if (!userdoc)
                // {
                //     return res.status(400).send({errors:"user entry not available"})
                // }

            
            // compering password valid or invalid
          
            const validpassword= await bcrypt.compare(req.body.password,userdoc.password);
            if(!validpassword){
            return res.status(400).send({status :'errors',message:'invalied email or password'});}
            console.log(userdoc)
            console.log(req.body.password)
            if (userdoc) {
                console.log("login success")
                // res.status(200).json("sucessfully logged !!!")
            }
            else{
                console.log("incorrect password")
                res.status(400).json("not credentials!!")
            }
            let data={
                id:userdoc._id
            }
            let token=jwt.sign(data,JWT_RANDOM_STR, {expiresIn:'24h'})
            res.json({ticket:token})

    }catch (error) {
        //   console.log("i am in catch block")
        console.log(error)
       }
}
)

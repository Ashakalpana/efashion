import express from "express";
import connectToMongoDBsserver from "./database.js";
import { register } from "./Route/register.js";
import { login } from "./Route/login.js";
import cors from "cors";
import {profile} from "./Route/profile.js";
import {router} from "./Route/address.js"
 import striperouter from "./Route/stripe.js";
import { productRouter } from "./Route/prodect.js";
import{orderrouter} from"./Route/order.js";
const app = express()
app.use(cors())
const port = 5000
app.use(express.json())
 app.use('/api',register)
app.use('/api',login)
app.use('/api',profile)
app.use('/api',router )
app.use('/api',productRouter)
 app.use('/api',striperouter)
 app.use('/api',orderrouter)
connectToMongoDBsserver()
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
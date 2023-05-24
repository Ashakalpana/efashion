
import express from "express";
import Stripe from "stripe";//library used for interacting with the Stripe API.
import dotenv from "dotenv";//load environment variables from a .env file.
import {ordermodel} from "../model/orderschema.js";
dotenv.config();// .env file into node.js file
const stripe = Stripe(process.env.STRIPE_KEY);//initializes the Stripe library with your Stripe API key
const striperouter = express.Router();// creates an instance of an Express router

striperouter.post('/checkout', async (request, response) => {
 
  console.log("i am id ",request.body.id)
  console.log("i am state ",request.body.state)
  console.log("i am state ",request.body.state)
    const customer=await stripe.customers.create({
    metadata:{
      userid:request.body.id,
      address:JSON.stringify(request.body.addressList),
       orders: JSON.stringify( request.body.state.map((item) => ({
       
          Description: item.Description,
          price:item.price,
          Totalprice:item.Totalprice,
          quantity:item.quantity
        })))
 
    }
    });
  
 

  const line_items = request.body.state.map((item) => {//  creates a new array from calling a function for every array element
    return {
      price_data: {
        currency: "INR",
        product_data: {
          name: item.Description,
          metadata: {
            id: item.id
          }
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity
    };
  });
  
// create a new checkout session. It awaits the response from the Stripe API before proceeding.
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
   
     customer:customer.id,
    line_items,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,
    
  });
  //Sending the response
  response.json({ url: session.url });
});
// createorder
const createorder=async(customer,data)=>{
   const items=JSON.parse(customer.metadata.orders);
   
  // new instance
  const coustmeraddress=JSON.parse(customer.metadata.address)

  const neworder = new ordermodel({
userId:customer.metadata.userid,
customerid:data.customer,
paymentintentid:data.payment_intent,
products:items,
subtotal:data.amount_subtotal,
total:data.amount_total,
  shippingaddress:coustmeraddress,
 payment_status:data.payment_status,
  });
  try{
const savedorder=await neworder.save()
console.log("processed order:",savedorder)

  }catch(error){
  console.log(error)
  }
};


//strip webhooks




//This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret;
  // endpointSecret= "whsec_865059f7cc6fb9dfb794c97951dfa85d81be14eee4825e73a97e40401a7940c3";
striperouter.post('/webhook', 
// The express.raw middleware is used to parse the incoming request body as raw JSON data.
express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let data;
  let eventType;
  if(endpointSecret){
    let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    console.log("webhook varified")
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`)
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  data=event.data.object;
  eventType=event.type;

  }else{
    data=req.body.data.object;
    eventType=req.body.type;
  }


  

  // Handle the event
  if(eventType==="checkout.session.completed"){
    stripe.customers
    .retrieve(data.customer)
    .then((customer)=>{
    
    createorder(customer,data)
    console.log(customer)
    })
    .catch((error)=>console.log(error.message));

    

  }
  
  // Return a 200 response to acknowledge receipt of the event
  res.send().end();
});


export default striperouter;

import mongoose from "mongoose";
const{Schema}=mongoose;
const orderschema = new Schema({
userId:{
    type:String,
    required:true
},
customerid:{
    type:String,
},
paymentintentid:{type:String,required:true},
    
products:[
    {
        id:{type:String},
        Description:{type:String},
        price:{type:String},
        quantity:{typr:String},
        
            
    },
],
subtotal:{type:Number,required:true},
total:{type:Number,required:true},
shippingaddress:{type:Object},
delivery_status:{type:String,default:"pending"},
 payment_status:{type:String,required:true}

},
{timestamps:true});
export  const ordermodel = mongoose.model('order',orderschema)

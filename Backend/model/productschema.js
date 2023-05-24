import mongoose from "mongoose";
const{Schema}=mongoose;

const UserSchema = new Schema({
    product_no:{
        type:Number,
        requried:true
    },
    image:{
        type:String,
        requried:true
    },
    Description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    catagory:{
        type:String,
        required:true
    },

  });
export  const productmodel = mongoose.model('product',UserSchema)
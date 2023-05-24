import mongoose from "mongoose";
const{Schema}=mongoose;

const UserSchema = new Schema({
    FirstName:{
        type:String,
        requried:true
    },
    LastName:{
        type:String,
        requried:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:new Date()
    }

  });
export  const usermodel = mongoose.model('users',UserSchema)
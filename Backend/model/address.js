import mongoose, {model} from "mongoose";
const {Schema} = mongoose;

const AddressSchema = new Schema({
    user_id: {type: String, requires: true},
    Houseno: {type: Number, required:true},
    // street: {type:String, required:true},
    city: {type:String, required:true},
    state: {type:String, required:true},
    country: {type:String, required:true},
    PinCode: {type: Number, required:true}
})

export  const Address = mongoose.model('address',AddressSchema)

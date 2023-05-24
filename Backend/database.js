import mongoose from "mongoose";
const mongoDBurl='mongodb://127.0.0.1:27017/efashion';
  const connectToMongoDBsserver=async()=>
{
     try{
    const result=await mongoose.connect(mongoDBurl)
    console.log(" connected to mongodb")
}
catch(error)
{
    console.log(error)
}

}
export default connectToMongoDBsserver
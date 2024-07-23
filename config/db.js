import mongoose from "mongoose";

const connectDb=async()=>{
   try {
      const conn= await mongoose.connect(process.env.MONGO_URL);
      console.log("MONGO DB connected sucessfully:");
   } catch (error) {
      console.log(`Error while connecting mongodb ${error.message}`)
   }
}

export default connectDb;
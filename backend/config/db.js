import mongoose from "mongoose";

export const  connectDB = async () =>{

    await mongoose.connect('mongodb+srv://tusharsrivastava:rUdgXQEdGogY72by@cluster0.rkmo8ir.mongodb.net/food-del').then(()=>console.log("DB Connected"));
   
}


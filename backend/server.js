import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";



//app config
const app= express()
const port= process.env.PORT || 4000;

//middleware 
app.use(express.json())  //whenever we get the reques from fe to backe that req will passed through this json
app.use(cors())     // using this we can access any be from fe

//db connection
connectDB();                 //importing from db .js and connect db with express

//api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))     //making public such that by accessing link/images anyone can access upload folder
app.use("/api/user" ,userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)



app.get("/",(req,res)=>{
    res.send("API WORKING")
})  //we can req the data from the server/url

app.listen(port,()=>{                             //to run the express server
   console.log(`Server started on http://localhost:${port}`)
})
//mongodb+srv://tusharsrivastava:rUdgXQEdGogY72by@cluster0.rkmo8ir.mongodb.net/?

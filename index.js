import express from "express";
import adminRoutes from "./Routes/admin"
import userRoutes from "./Routes/user"
import mongoose from "mongoose";
const app = express();
const port = 3000;

app.use('admin',adminRoutes);
app.use('user',userRoutes);

try{
    mongoose.connect(process.env.CONNECTION_STRING);
    app.listen(`The server is running on http://localhost:${port}`)
}catch(e){
    console.log(e);
}
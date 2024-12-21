import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from './routes/auth/userRoutes.js'
import contactRoutes from './routes/comman/ContactUserRoutes.js'
import productRoutes from './routes/admin/productRoutes.js'


const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 4900;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
                .then(()=>{
                    console.log("DB Connected Succesfully...");
                    app.listen(PORT,()=>{
                        console.log(`Server is running on port number: ${PORT}`);
                    });
                })
                .catch((error)=>{
                    console.log(error);
                })

app.use("/api",userRoutes);
app.use("/api/contact",contactRoutes);
app.use("/api/product",productRoutes);

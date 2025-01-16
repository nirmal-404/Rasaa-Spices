import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/auth/auth-routes.js'
import contactRoutes from './routes/comman/ContactUserRoutes.js'
import adminProductRoutes from './routes/admin/products-routes.js'
import shopProductRoutes from './routes/shop/products-routes.js'
import cartProductsRoutes from './routes/shop/cart-routes.js'
import wishlistProductsRoutes from './routes/shop/wishlist-routes.js'



const app = express();
dotenv.config();

const PORT = process.env.PORT || 4900;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("DB Connected Succesfully...");
        app.listen(PORT, () => {
            console.log(`Server is running on port number: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    })

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "DELETE", "PUT"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma",
        ],
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/shop/products", shopProductRoutes);
app.use("/api/shop/cart", cartProductsRoutes);
app.use("/api/shop/wishlist", wishlistProductsRoutes);

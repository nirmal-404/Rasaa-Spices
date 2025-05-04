import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/auth/auth-routes.js'

import adminProductRoutes from './routes/admin/products-routes.js'
import adminOrderRoutes from "./routes/admin/order-routes.js"
import adminContactRoutes from "./routes/admin/contactus-routes.js"

import shopProductRoutes from './routes/shop/products-routes.js'
import shopCartRoutes from './routes/shop/cart-routes.js'
import wishlistProductsRoutes from './routes/shop/wishlist-routes.js'
import shopAddressRoutes from './routes/shop/address-routes.js'
import shopOrderRoutes from "./routes/shop/order-routes.js"
import shopSearchRoutes from "./routes/shop/search-routes.js"
import shopReviewRoutes from "./routes/shop/review-routes.js"
import shopContactRoutes from "./routes/shop/contactus-routes.js"

import heroImgRoutes from './routes/common/hero-image-routes.js'


import paymentRoutes from './routes/payment/payment-routes.js'


import testRoutes from './routes/test-routes.js'

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
        origin: ['https://rasaa-frontend.loca.lt', process.env.CLIENT_BASE_URL],
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
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth", authRoutes);


app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
app.use("/api/admin/contact", adminContactRoutes);

app.use("/api/shop/products", shopProductRoutes);
app.use("/api/shop/address", shopAddressRoutes);
app.use("/api/shop/cart", shopCartRoutes);
app.use("/api/shop/wishlist", wishlistProductsRoutes);
app.use("/api/shop/order", shopOrderRoutes);
app.use("/api/shop/search", shopSearchRoutes);
app.use("/api/shop/review", shopReviewRoutes);
app.use("/api/shop/contact", shopContactRoutes);


app.use("/api/common/hero", heroImgRoutes);


app.use("/api/payment", paymentRoutes);







app.use("/api/test", testRoutes);


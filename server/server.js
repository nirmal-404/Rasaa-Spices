require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));


const app = express();
const PORT = process.env.PORT;
const mong= process.env.MONGO_URI;
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

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));

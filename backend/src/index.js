// const express = require("express") for type = commonjs
import express from "express";        // for type = module
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import {connectDB} from "./lib/db.js"
import authRoutes from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";

dotenv.config();
const app = express();  // to initialize a instance of express

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());  // to parse the cookie

app.use("/api/auth", authRoutes)  // to be able to use this route
app.use("/api/message", messageRoute)

app.listen(PORT, () => {
  console.log("Server is running on PORT: " + PORT);
  connectDB();
});
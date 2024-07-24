import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import path from "path";

dotenv.config();

connectDb();

const app = express();
const __dirname = path.resolve();

//middlewares:
app.use(cors());
app.use(express.json());

//all routes:

//routes related with user authentication and autherrization:
app.use("/api/v1/auth", authRoutes);
//related to category:
app.use("/api/v1/category", categoryRoutes);
//related to products:
app.use("/api/v1/product", productRoutes);

//static files:
app.use(express.static(path.join(__dirname, "./client/build")));

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const PORT = process.env.PORT || 8080;
//start the server:
app.listen(PORT, () => {
  console.log(`server started.... on port: ${PORT}`);
});

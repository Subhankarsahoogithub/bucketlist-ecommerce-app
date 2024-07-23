import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";

dotenv.config();

connectDb();

const app = express();

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

app.get("/", (req, res) => {
  res.json({ message: "hello" });
});

const PORT = process.env.PORT || 8080;
//start the server:
app.listen(PORT, () => {
  console.log(`server started.... on port: ${PORT}`);
});
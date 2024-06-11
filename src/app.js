import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//routes

import userRouter from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import ordeRoutes from "./routes/order.routes.js";

// routes declerationOrd

app.use("/api/v1/users", userRouter);
app.use("/api/v1/order", ordeRoutes);
app.use("/api/v1/product", productRoutes);
app.get("/", (req, res) => {
  return res.send("hello world");
});
export { app };

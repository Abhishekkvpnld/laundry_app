import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import dbConnection from "./utils/dbConnection.js";
import userAuth from "./routes/userRoute.js";

dotenv.config();

const app = express(); 

app.use(express.json());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server auth running....");
});

app.use("/auth", userAuth);

const PORT = process.env.PORT || 4000;
dbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
});

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import dbConnection from "./utils/dbConnection";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server running....");
});

const PORT = process.env.PORT || 4006;
dbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
});
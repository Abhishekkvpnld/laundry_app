import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server running....");
});

const port = process.env.PORT || 4001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import dbConnection from "./utils/dbConnection.js";
import paymentRoute from "./routes/paymentRoute.js";

dotenv.config();

const app = express();


app.use((req, res, next) => {
  if (req.originalUrl === "/webhook") {
    next();
  } else {
    express.json()(req, res, next);
  }
});

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/", paymentRoute);

app.get("/", (req, res) => {
  res.send("Server running....");
});

const PORT = process.env.PORT || 4005;
dbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
});

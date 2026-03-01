import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import { contactRoutes } from "./routes/contactRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";
import { config } from "dotenv";
config({ path: ".env" });

// ----------------------------------------------------------------------------------------------------------

const app = express();

// enable CORS for local dev (frontend runs on a different port)
app.use(cors());

app.use(bodyParser.json());

// simple request logger for debugging
app.use((req, res, next) => {

  console.log(`${req.method} ${req.url}`);
  
  if (req.method === "POST" || req.method === "PUT") {
    console.log("Body:", req.body);}
  
  next();
});

// ----------------------------------------------------------------------------------------------------------
// Mongo connect

mongoose
  .connect(process.env.MONGO_URL, { dbName: "contactAPI" })
  .then(() => {
    console.log("Mongodb is connected....");
  })
  .catch((err) => {
    console.log(err);
  });

// ----------------------------------------------------------------------------------------------------------
// Api

app.use("/api/contact", contactRoutes);
app.use("/api/user", userRoutes);

// ----------------------------------------------------------------------------------------------------------
// Server

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

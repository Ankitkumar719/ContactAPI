import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { contactRoutes } from "./routes/contactRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";
import { config } from "dotenv";
config({ path: ".env" });

// ----------------------------------------------------------------------------------------------------------

const app = express();

app.use(bodyParser.json());

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

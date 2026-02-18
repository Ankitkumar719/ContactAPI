import mongoose from "mongoose";

// ----------------------------------------------------------------------------------------------------------

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  bloodgroup: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId },
  createdAt: { type: Date, default: Date.now() },
});

// ----------------------------------------------------------------------------------------------------------

export const Contact = mongoose.model("contact", contactSchema);

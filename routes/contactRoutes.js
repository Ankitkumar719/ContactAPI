import express from "express";
import { isAuthenticate } from "../middlewares/Auth.js";
import { getContacts, save, getContactById, updateContactById, deleteContactById, } from "./../controller/contactController.js";

// ----------------------------------------------------------------------------------------------------------

const router = express.Router();

// ----------------------------------------------------------------------------------------------------------

router.post("/save", isAuthenticate, save);
router.get("/getAllContacts", getContacts);
router.get("/:id", getContactById);
router.put("/:id", updateContactById);
router.delete("/:id", deleteContactById);

// ----------------------------------------------------------------------------------------------------------

export const contactRoutes = router;

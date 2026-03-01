import express from "express";
import { Contact } from "../model/Contact.js";

// ----------------------------------------------------------------------------------------------------------
// API - /api/contact/save

export const save = async (req, res) => {
  try {
    console.log("contactController.save body:", req.body);
    const { name, email, mobile, bloodgroup } = req.body; // take data from body

    if (!name || !email || !mobile || !bloodgroup) {
      return res.status(400).json({ message: "All Field Required", status: false }); // validation
    }

    let checkData = await Contact.findOne({ email }); // check email in db

    if (!checkData) {
      let contact = await Contact.create({ name, email, mobile, bloodgroup });
      return res.json({ message: "Contact Save Successfully", contact, status: true });
    } else {
      return res.status(409).json({ message: "Contact Already Exists", status: false });
    }
  } catch (err) {
    console.error("Error in save():", err);
    return res.status(500).json({ message: "Server error", status: false, error: err.message });
  }
};

// ----------------------------------------------------------------------------------------------------------
// API - /api/contact/getAllContact

export const getContacts = async (req, res) => {

  let contact = await Contact.find(); // find contact in db

  if (!contact) {
    res.json({ message: "Not Contact Available", status: false });

  } else {
    res.json({ message: "All Contact Fetch", contact, status: true });
  }
};

// ----------------------------------------------------------------------------------------------------------
//API - /api/contact/getContactById

export const getContactById = async (req, res) => {

  let id = req.params.id; // get by id

  let contact = await Contact.findById({ _id: id });

  if (!contact) {

    res.json({ message: "No data found", status: false });

  } else {

    res.json({ message: "Data Fetch Successfully", contact, status: true });

  }
};

// ----------------------------------------------------------------------------------------------------------
// API - /api/contact/update/id

export const updateContactById = async (req, res) => {

  let id = req.params.id; // get by id

  let { name, email, mobile, bloodgroup } = req.body; // take data from body

  let updateContact = await Contact.findByIdAndUpdate(id, { name, email, mobile, bloodgroup, }, { new: true },);

  if (updateContact) {

    res.json({ message: "Update contact successfully", status: true });

  } else {

    res.json({ message: "New Contact Inserted", status: true });

  }
};

// ----------------------------------------------------------------------------------------------------------
// API - /api/contact/delete/id

export const deleteContactById = async (req, res) => {

  let id = req.params.id; // get by id

  let deleteContact = await Contact.findByIdAndDelete(id);

  if (deleteContact) {

    res.json({ message: "Delete contact successfully", status: true });

  } else {

    res.json({ message: "Contact not deleted", status: false });

  }
};

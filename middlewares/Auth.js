import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../model/User.js";

export const isAuthenticate = async (req, res, next) => {

  const token = req.header("Auth");

  if (!token) {

    res.json({ message: "Not Authorized, Please login first", status: false });

  } else {

    const decoded = jwt.verify(token, "$/@ABCD");

    let userid = decoded.userId;

    let finduser = await User.findOne({ _id: userid });

    if (!finduser) {

      res.json({ message: "User not Found", status: false });

    }
    
    req.userdata = finduser;

    next();
  }
};

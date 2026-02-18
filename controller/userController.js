import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "./../model/User.js";
import jwt from "jsonwebtoken";

// ----------------------------------------------------------------------------------------------------------
// API - /api/user/signup

export const signup = async (req, res) => {

  const { name, email, password } = req.body; // take data from body

  let checkuser = await User.findOne({ email }); // find email in db

  if (!checkuser) {

    let hashPassword = await bcrypt.hash(password, 10); // convert password in to hash

    let user = await User.create({ name, email, password: hashPassword, }); // create new user

    res.json({
      message: "User Registration Successful",
      status: true,
      user: user,
    });

  } else {

    res.json({
      message: "User already exists",
      status: false,
    });

  }
};

// ----------------------------------------------------------------------------------------------------------
// API - /api/user/login

export const login = async (req, res) => {
  
  const { email, password } = req.body; // take data from body

  let checkuser = await User.findOne({ email }); // find email in db

  if (!checkuser) {

    res.json({
      message: "User not found",
      status: false,
    });

  } else {

    let validUser = await bcrypt.compare(password, checkuser.password); // check password

    if (validUser) {

      let token = await jwt.sign({ userId: checkuser._id }, process.env.SECRET_KEY, { expiresIn: "1d", },); // generate token

      res.json({
        message: "Login Successfully",
        status: true,
        token,
      });

    } else {

      res.json({
        message: "Password is wrong",
        status: false,
      });

    }
  }
};

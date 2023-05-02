import express from "express";
import passport from "passport";
//
import { UserModel } from "../../database/user/index.mjs";
const Router = express.Router();

/**
 * Route    /signup
 * Des       create new authorised user
 * Params    none
 * Access    Public
 * Method    POST
 */
//
Router.post("/signup", async (req, res) => {
  try {
    const { email, password, fullName } = req.body.credentials;
    // await ValidateSignUp(req.body.credentials);
    // await UserModel.findByEmailAndPhone(email, password, fullName);
    const user = await UserModel.findOne({ email });
    if (user) throw new Error("User Already Exists");
    const newUser = await UserModel.create({ email, password, fullName });
    const token = await newUser.generateJWT();
    return res.status(200).json({ token, status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route    /signin
 * Des       Login to existing Account
 * Params    none
 * Access    Public
 * Method    POST
 */

Router.post("/signin", async (req, res) => {
  try {
    // await ValidateSignIn(req.body.credentials);
    const user = await UserModel.findByEmailAndPassword(req.body.credentials);
    const token = await user.generateJWT();
    res.status(200).json({ token, status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;

// Getting Error ===> "error": "Cannot destructure property 'email' of 'undefined' as it is undefined."

import express from "express";
import mongoose from "mongoose";
//
const Router = express.Router();
import { OrganisationModel } from "../../database/allModal.mjs";

/**
 * Route    /:_id
 * Des      Get individual organisation details based on the id
 * Params   _id
 * Access   Public
 * Method   GET
 */

Router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const org = await OrganisationModel.findById(_id);
    if (!org) return res.status(404).json({ error: "No Organisation found" });
    return res.status(200).json({ org });
  } catch (e) {
    return res.status(500).json({ error: e.mesage });
  }
});

/**
 * Route /create
 * Des   Create organization
 * Params None
 * Access Public
 * Method POST
 */

Router.post("/create", async (req, res) => {
  try {
    const name = req.body.credentials.name;
    const org = await OrganisationModel.findOne({ name });
    if (org)
      return res
        .status(500)
        .send({ status: "failed", error: "Organisation already exist" });
    var newOrg = await OrganisationModel.create(req.body.credentials);
    res.status(200).json({ status: "success", newOrg });
  } catch (e) {
    res.status(500).json({ status: "failed", error: e.message });
  }
});

export default Router;

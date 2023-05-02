import mongoose from "mongoose";
//
const OrganisationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    bio: { type: String, required: true },
    websiteUrl: { type: String, required: true },
    adminList: [
      {
        ref: "users",
        type: mongoose.Types.ObjectId,
      },
    ],
    labelList: [{ type: String, required: true }], // HOD, Staff, Student,Principal
    categoryList: [{ type: String, required: true }], // Aided, SF
    departments: [{ type: String, required: true }], // Maths,Tamil,English,...
    members: [
      {
        user: {
          ref: "users",
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        label: {
          type: String,
          required: true,
          enum: ["HOD", "Staff", "Student", "Principal"],
        },
        department: {
          type: String,
          required: true,
        },
        stream: {
          type: String,
          required: function () {
            return this.label === "Student";
          },
          enum: [
            "BA",
            "BBA",
            "BCA",
            "BCOM",
            "MA",
            "MBA",
            "MCA",
            "MCOM",
            "BSC",
            "MSC",
          ],
        },
        category: {
          type: String,
          required: true,
          enum: ["AIDED,SF"],
        },
        year: {
          type: String,
          required: function () {
            return this.label === "Student" || this.label === "Staff";
          },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const OrganisationModel = mongoose.model(
  "organisations",
  OrganisationSchema
);

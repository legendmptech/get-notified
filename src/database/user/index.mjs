import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//
const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    bio: { type: String },
    organisations: [
      {
        ref: "organisations",
        type: mongoose.Schema.Types.ObjectId,
        
      },
    ],
  },
  { timestamps: true }
);

//generating jwt tokens

UserSchema.methods.generateJWT = function () {
  return jwt.sign({ user: this._id.toString() }, process.env.SECRET_KEY);
};

UserSchema.statics.findByEmailAndPhone = async ({ email, phoneNumber }) => {
  const checkUserByEmail = await UserModel.findOne({ email });
  const checkUserByPhone = await UserModel.findOne({ phoneNumber });
  console.log(checkUserByEmail || checkUserByPhone);
  if (checkUserByEmail) {
    throw new Error("User Already Exists ...!");
  }
  return false;
};

UserSchema.statics.findByEmailAndPassword = async ({ email, password }) => {
  const user = await UserModel.findOne({ email });
  console.log(user);
  if (!user) throw new Error("User does not exist !!! ");

  // Comparing Stored & Encrypted Password and (Encrypting user filled password)
  const doesPasswordMatch = await bcrypt.compare(password, user.password);

  if (!doesPasswordMatch) throw new Error("Invalid Credentials !!!");
  return user;
};

UserSchema.pre("save", function (next) {
  const user = this;
  console.log(user);

  bcrypt.genSalt(8, function (error, salt) {
    //error(1)
    if (error) return next(error);

    bcrypt.hash(user.password, salt, function (error, hash) {
      // error (1)
      if (error) return next(error);

      user.password = hash;
      return next();
    });
  });
});

export const UserModel = mongoose.model("users", UserSchema);

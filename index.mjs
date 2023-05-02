import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./database/connection.mjs";
//
import passport from "passport";
import session from "express-session";

//apis
import Auth from "./api/auth/index.mjs";
import User from "./api/user/index.mjs";
import Org from "./api/organisation/index.mjs";

dotenv.config();
const app = express();

var PORT = 5000;

app.use(express.json());
app.use(session({ secret: "GetNotified" }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/user", User);
app.use("/auth", Auth);
app.use("/org", Org);

app.listen(PORT, () => {
  ConnectDB()
    .then(() => console.log(`server is running on ${PORT}`))
    .catch((e) => console.log(`server error occurred \n ${e}`));
});

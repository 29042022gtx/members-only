process.stdout.write("\x1b[2J\x1b[3J\x1b[H");
require("dotenv").config();
const path = require("node:path");
const express = require("express");
const passport = require("passport");
const indexRouter = require("./routes/indexRouter");
const sessionConfig = require("./config/sessionConfig");
require("./config/passport");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(sessionConfig);
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

app.listen(3000, () =>
  console.log("Serving: \x1b[35mhttp://localhost:3000\x1b[0m")
);

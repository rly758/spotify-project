const express = require("express");
const session = require("cookie-session");
const helmet = require("helmet");
const hpp = require("hpp");
const csurf = require("csurf");
const dotenv = require("dotenv");
const path = require("path");

// import config
dotenv.config({ path: path.resolve(__dirname, ".env.local") }); //local .env for development
//dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();

app.use(helmet());
app.use(hpp());

app.use(
  session({
    name: "session",
    secret: process.env.COOKIE_SECRET,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), //24 hours in milliseconds
  })
);

app.use(csurf());

const authRoutes = require("./routes/auth.js");

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;

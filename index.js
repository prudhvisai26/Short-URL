const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectMongoDB } = require("./connect");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8001;

//Connecting to DB
connectMongoDB("mongodb://localhost:27017/short-url");

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

//Engine Setting
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//Urls
// app.use("/url", urlRoute);
app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use("/", staticRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});

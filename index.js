const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectMongoDB } = require("./connect");
const { restirctToLoggedinUserOnly, checkAUth } = require("./middlewares/auth");

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

//Engine Setting
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//Urls
// app.use("/url", urlRoute);
app.use("/url", restirctToLoggedinUserOnly, urlRoute);
app.use("/", checkAUth, staticRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});

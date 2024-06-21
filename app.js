const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const errorMiddleware = require("./middleware/error");

const app = express();

//config
if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({path: "backend/config/config.env"});
}
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//Route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);


// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../frontend/public")));

// The catch-all handler: for any request that doesn't match any API routes,
// send back the index.html file from the build folder
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/public/index.html"));
});

//middleware for errors
app.use(errorMiddleware);

module.exports = app;
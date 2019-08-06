const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan"); //sirve para trabajar los middleware
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const cors = require("cors");
const dotenv = require("dotenv"); //loads environment variables from a .env file into process.
const dns = require("dns");
const isReachable = require('is-reachable');
const https = require("https");
dotenv.config();

//db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("DB Connected"));

mongoose.connection.on("error", err => {
  console.log(`DB connection error: ${err.message}`);
});

//bring in routes
const inventoryRoutes = require("./routes/inventory");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

// middleware sirve para las autenticaciones o para algunas validaciones
app.use(morgan("dev")); //nos dice que método se esta usando en la consola cada vez que refrescamos la página
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use("/", inventoryRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: "Unauthorized!" });
  }
});

//PRIMERA OPCION
// function testPort(port, host) {
//   https.get({
//     host: host, 
//     port: port 
//   }, function(res) {
//     console.log("success", res); 
//   }).on("error", function(e) {
//     console.log("failure", e);
//   });
// }

// let test = testPort(8081,"localhost")

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`A Node Js API is listening on port: ${port}`);
  
  // function reFresh(){ SEGUNDA OPCION
  // dns.resolve("www.google.com", function(err) {
  //   if (err) {
  //     console.log("No connection");
  //   } else {
  //     console.log("Connected");
  //   }
  // });
  // }

  //PRIMERA OPCION
  // testPort(8081,"localhost")

});

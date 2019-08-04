const express = require ('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan'); //sirve para trabajar los middleware
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const dotenv = require('dotenv'); //loads environment variables from a .env file into process.env
dotenv.config();

//db
mongoose
    .connect(
        process.env.MONGO_URI,  
        { useNewUrlParser: true,  useCreateIndex: true }
    )
.then(() => console.log('DB Connected'));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`);
});

//bring in routes
const inventoryRoutes = require('./routes/inventory');


// middleware sirve para las autenticaciones o para algunas validaciones
app.use(morgan('dev')); //nos dice que método se esta usando en la consola cada vez que refrescamos la página
app.use(bodyParser.json());
app.use(expressValidator());
app.use("/", inventoryRoutes);


const port =  process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`A Node Js API is listening on port: ${port}`);
});
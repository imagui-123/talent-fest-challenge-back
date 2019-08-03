const express = require ('express');
const app = express();

//bring in routes
const { getInventories } = require('./routes/inventory');

app.get('/', getInventories);

const port =  8080;
app.listen(port, () => {
    console.log(`A Node Js API is listening on port: ${port}`);
});
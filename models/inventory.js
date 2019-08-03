const mongoose = require ('mongoose');

const inventorySchema = new mongoose.Schema({
   product: {
       type:String,
       required: 'product is required',
       minlength: 4,
       maxlength: 25
   },
   quantity:{
       type: Number,
       required: 'quantity is required'
   }
});

module.exports = mongoose.model('Inventory', inventorySchema);
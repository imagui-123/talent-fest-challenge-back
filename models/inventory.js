const mongoose = require ('mongoose');

const inventorySchema = new mongoose.Schema({
   product: {
       type:String,
       required: true
   },
   quality:{
        type: String
   },
   quantity: {
       type: Number,
       required: true,
       minlength: 1,
       maxlength: 10
   },
   status: {
       type: String
    
   },
   Notes: {
       type: String
   }
});

module.exports = mongoose.model('Inventory', inventorySchema);
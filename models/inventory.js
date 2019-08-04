const mongoose = require ('mongoose');
const {ObjectId} = mongoose.Schema;

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
   notesBy: {
    type: ObjectId,
    ref: "User"
   },
   created: {
    type: Date,
    default: Date.now
   }

});

module.exports = mongoose.model('Inventory', inventorySchema);
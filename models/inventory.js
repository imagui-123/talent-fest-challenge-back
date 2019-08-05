const mongoose = require ('mongoose');
const {ObjectId} = mongoose.Schema;

const inventorySchema = new mongoose.Schema({
   items: {
       type:Object,
       trim: true,
       required: true
   },
   quality:{
        type: String
   },
   quantity: {
       type: Number,
       
       minlength: 1,
       maxlength: 10
   },
   status: {
       type: String
   },
   notes:{
    type:ObjectId,
    ref:"User"
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
const express = require('express');
const {getInventories, createInventory} = require('../controllers/inventory');
const { requireSignin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const {createInventoryValidator} = require('../validator');

const router = express.Router();

router.get("/", getInventories);
router.post("/inventory/:userId", 
requireSignin,  
createInventory,  
createInventoryValidator);

//any route containing :userId, our app will first execute userById()
router.param('userId', userById);

module.exports = router;


 
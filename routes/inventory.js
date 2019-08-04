const express = require('express');
const {getInventories, createInventory} = require('../controllers/inventory');
const {createInventoryValidator} = require('../validator');

const router = express.Router();

router.get("/", getInventories);
router.post("/inventory", createInventoryValidator, createInventory);

module.exports = router;


 
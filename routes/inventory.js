const express = require('express');
const {getInventories, createInventory} = require('../controllers/inventory');
const validator = require('../validator');

const router = express.Router();

router.get("/", getInventories);
router.post("/inventory", validator.createInventoryValidator, createInventory);

module.exports = router;


 
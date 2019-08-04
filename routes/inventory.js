const express = require('express');
const inventoryController = require('../controllers/inventory');
const validator = require('../validator');

const router = express.Router();

router.get("/", inventoryController.getInventories);
router.post("/inventory", validator.createInventoryValidator, inventoryController.createInventory);

module.exports = router;


 
const express = require('express');
const {
    getInventories, 
    createInventory, 
    inventoriesByUser,
    inventoryById,
    isInventory,
    updateInventory,
    deleteInventory,
    singleInventory
} = require('../controllers/inventory');
const { requireSignin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const {createInventoryValidator} = require('../validator');

const router = express.Router();

router.get('/inventories', getInventories);
router.post('/inventory/:userId', requireSignin, createInventory, createInventoryValidator);
router.get('/inventories/:userId', requireSignin, inventoriesByUser);

router.get('/inventory/:inventoryId', singleInventory);
router.put('/inventory/:inventoryId', requireSignin, isInventory, updateInventory);
router.delete('/inventory/:inventoryId', requireSignin, isInventory, deleteInventory);

//any route containing :userId, our app will first execute userById()
router.param('userId', userById);

//any route containing :inventoryId, our app will first execute inventoryById()
router.param('inventoryId', inventoryById);

module.exports = router;


 
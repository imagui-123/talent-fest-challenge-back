const Inventory = require('../models/inventory');

exports.getInventories = (req, res) => {
    const inventories = Inventory.find()
    .populate("notesBy", "_id name lastname location")
    .select("_id product quality quantity status ")
    .then(inventories => {
        res.json(inventories);
    })
    .catch(err => console.log(err));
};

exports.createInventory = (req, res, next) => {
    let inventory = new Inventory(req.body)

    req.profile.hased_password = undefined;
    req.profile.salt = undefined;
    inventory.notesBy = req.profile;
    // console.log('PROFILE', req.profile);

    inventory.save((err, result) => {
        if(err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(result);
    });

    // const inventory = new Inventory(req.body);    
    // inventory.save().then(result => {
    //     res.status(200).json({
    //         inventory: result
    //     });
    // });
};
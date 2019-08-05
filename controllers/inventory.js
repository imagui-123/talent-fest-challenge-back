const Inventory = require('../models/inventory');

exports.inventoryById = (req, res, next, id) => {
    Inventory.findById(id)
      .populate("notesBy", "_id name")
    //   .select("_id product quantity quality status")
      .exec((err, inventory) => {
        if (err || !inventory) {
          return res.status(400).json({
            error: err
          });
        }
        req.post = inventory;
        next();
      });
  };

exports.getInventories = (req, res) => {
    const inventories = Inventory.find()
    .populate("notesBy", "_id name lastname")
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
};

exports.inventoriesByUser = (req, res) => {
    Inventory.find({ notesBy: req.profile._id })
      .populate("notesBy", "_id name lastname")
    //   .select("_id product quantity quality status created ")
      .sort("_created")
      .exec((err, inventories) => {
        if (err) {
          return res.status(400).json({
            error: err
          });
        }
        res.json(inventories);
      });
  };


exports.isInventory = (req, res, next) => {
    let isInventory = req.post && req.auth && req.post.notesBy._id == req.auth._id;
        
    if (!isInventory) {
      return res.status(403).json({
        error: "User is not authorized"
      });
    }
    next();
  };

exports.updateInventory = (req, res, next) => {
    let inventory = req.post;
    inventory = _.extend(inventory, req.body);
    inventory.updated = Date.now();
    inventory.save(err => {
        if(err) {
            return res.status(400).json ({
                error: err
            })
        }
        res.json(inventory)
    })
}

exports.deleteInventory = (req, res) => {
    let inventory = req.post;
    inventory.remove((err, inventory) => {
      if (err) {
        return res.status(400).json({
          error: err
        });
      }
      res.json({
        message: "Inventory deleted successfully"
      });
    });
  };
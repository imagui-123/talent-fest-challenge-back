exports.createInventoryValidator = (req, res, next) => {
   //product
   req.check('product', 'Write a product name').notEmpty();
   req.check('product', 'Product name must be between 4 to 25 characters').isLength({ 
       min:4, 
       max: 25
   });

   //quantity
   req.check('quantity', 'Write the quantity').notEmpty();
   req.check('quantity', 'Write a number > 1').isLength({ 
       min: 1, 
       max: 10
   });

   //check for errors
   const errors = req.validationErrors();
   // if error show the first one as they happen
   if(errors){
       const firstError = errors.map(error => error.msg) [0]; 
       return res.status(400).json({error: firstError});  
   }
   //proceed to next middleware
   next();
};


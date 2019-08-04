exports.createInventoryValidator = (req, res, next) => {
   //product
   req.check('Product', 'Write a title').notEmpty();
   req.check('Product', 'must be between 4 to 25 characters').isLength({ 
       min:4, 
       max: 25
   });

   //quantity
   req.check('quantity', 'Write a number').notEmpty();
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


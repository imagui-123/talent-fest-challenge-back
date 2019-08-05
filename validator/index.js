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

exports.userSignupValidator = (req, res, next) =>{
    // name is not null and between 4-10 characters
    req.check("name", "Name is required").notEmpty();
    // req.check("lastname", "Last Name is required").notEmpty();

    //email is not null, valid and normalized
    req.check("email", "Email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
        min:4,
        max: 2000
    })
 
    // check for password
    req.check("password", "Password is required").notEmpty();
    req.check("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number")
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

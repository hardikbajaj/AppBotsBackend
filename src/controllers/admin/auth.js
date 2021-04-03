const Admin= require('../../modals/admin');
const bcrypt =require('bcrypt');
const jwt= require('jsonwebtoken');



// Generate Token
const generateJwtToken = (_id, role ) => {
    return jwt.sign({ _id , role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  };

var signUpAction = function(req,res){
Admin.findOne({ email: req.body.email }).exec(async (error, admin) => {
    if(error) res.status(400).json({error});
    if (admin)
      return res.status(400).failure(
       "Admin already registered"
      );

    const { firstName, lastName, email, password } = req.body;
    const hash_password = await bcrypt.hash(password, 10);
    const _admin = new Admin({
      firstName,
      lastName,
      email,
      hash_password,
    //  username: shortid.generate(),
    });

    _admin.save((error, admin) => {
      if (error) {
        return res.status(400).failure(
          error,
        );
      }

      if (admin) {
        const token = generateJwtToken(admin._id, admin.role);
        const { _id, firstName, lastName, email,  fullName } = admin;
        return res.status(201).success({
          token,
          admin: { _id, firstName, lastName, email,  fullName },
        },'Admin SignUp Successfull!');
      }
    });
  });
}

var signInAction = function (req,res) {
    Admin.findOne({ email: req.body.email }).exec(async (error, admin) => {
        if (error) return res.status(400).failure({ error });
        if (admin) {
          const isPassword = await admin.authenticate(req.body.password);
          if (isPassword) {
            const token = generateJwtToken(admin._id, admin.role);
            const { _id, firstName, lastName, email, fullName } = admin;
            res.status(200).success({
              token,
              admin: { _id, firstName, lastName, email, fullName },
            },"Admin Login Successful!");
          } else {
            return res.status(400).failure(
             "Wrong Password!"
            );
          }
        } else {
          return res.status(400).failure(  "Something went wrong" );
        }
      });
    
}
  module.exports={
      signup: signUpAction,
      signin: signInAction

  };
const User= require('../../modals/user');
const bcrypt =require('bcrypt');
const jwt= require('jsonwebtoken');



// Generate Token
const generateJwtToken = (_id ) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET);
  };

var signUpAction = function(req,res){
User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if(error) res.status(400).json({error});
    if (user)
      return res.status(400).json({
        error: "User Already Registered",
      });

    const { firstName, lastName, email, password } = req.body;
    const hash_password = await bcrypt.hash(password, 10);
    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
    //  username: shortid.generate(),
    });

    _user.save((error, user) => {
      if (error) {
        return res.status(400).json({
          message: error,
        });
      }

      if (user) {
        const token = generateJwtToken(user._id);
        const { _id, firstName, lastName, email, fullName } = user;
        return res.status(201).json({
          token,
          user: { _id, firstName, lastName, email,  fullName },
        });
      }
    });
  });
}

var signInAction = function (req,res) {
    User.findOne({ email: req.body.email }).exec(async (error, user) => {
        if (error) return res.status(400).json({ error });
        if (user) {
          const isPassword = await user.authenticate(req.body.password);
          if (isPassword) {
            const token = generateJwtToken(user._id);
            const { _id, firstName, lastName, email,  fullName } = user;
            res.status(200).json({
              token,
              user: { _id, firstName, lastName, email, fullName },
            });
          } else {
            return res.status(400).json({
              message: "Something went wrong",
            });
          }
        } else {
          return res.status(400).json({ message: "Something went wrong" });
        }
      });
    
}
  module.exports={
      signup: signUpAction,
      signin: signInAction

  };